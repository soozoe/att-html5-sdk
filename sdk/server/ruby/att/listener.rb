require 'rubygems'
require 'sinatra/base'
require 'rack/mime'
require 'json'
require 'base64'
require 'yaml'
require 'crack'
require_relative '../lib/codekit'

##
# This is an example Sinatra application that handles any incoming
# SSL/HTTPS connections that the main server app (app.rb) can't handle.
#
class Html5SdkListener < Sinatra::Base

  include Att::Codekit

  # Sinatra configuration
  enable :sessions
  disable :raise_errors, :show_exceptions
  set :bind, '0.0.0.0'
  set :port, ARGV[0] || 4568
  set :session_secret, 'random line noize634$#&g45gs%hrt#$%RTbw%Ryh46w5yh' # must be the same in app.rb and listener.rb
  
  # @private
  CONFIG_DIR = File.expand_path(File.dirname(__FILE__) + '/../conf')

  # @private
  MEDIA_DIR = File.dirname(__FILE__) + '/../media'

  # @private
  VOTES_TMP_FILE = File.dirname(__FILE__) + '/../votes.json'

  $config = YAML.load_file(File.join(CONFIG_DIR, 'att-api.properties'))

  client_credential = Auth::ClientCred.new($config['apiHost'], $config['appKey'], $config['Secret'])
  $client_token = client_credential.createToken($config['clientModelScope'])
  
  $authCodes = Array.new

  # @method post_att_sms_votelistener
  # @overload post '/att/sms/votelistener'
  #   @param sms [message body] a JSON object describing the SMS message being forwarded.
  #   @return [HTTP status code]
  # An application registered at http://developer.att.com can receive SMS
  # messages that are sent to its shortcode. If the app is configured to
  # forward these messages to this endpoint, the endpoint will process them.
  # Specifically, it will check if the text of the message is 'Football',
  # 'Baseball', or 'Basketball', and keep track of how many of each type
  # of message that it has received.
  #
  # For more details on the JSON message format, please refer to http://developer.att.com/apis/sms/docs
  post '/att/sms/votelistener' do
    request.body.rewind
    data = JSON.parse request.body.read
    if data
      message = data["Message"]
    end

    begin
      file_contents = File.open(VOTES_TMP_FILE, 'r+') { |f| f.read }
    rescue Exception => e
      #if file doesn't exist, create content
      file_contents = '{"success":true,"total":0,"data":[{"sport":"Football","votes":0},{"sport":"Baseball","votes":0},{"sport":"Basketball","votes":0}]}'
    end    
      
    votes = JSON.parse file_contents

    votes["data"].each {|cat| 
        if cat["sport"].casecmp(message) == 0  
            cat["votes"] += 1
            votes["total"] += 1
          end
    } 
    File.open(VOTES_TMP_FILE, 'w') { |f| f.write votes.to_json }
  end

  # @method get_att_callback
  # @overload get '/att/callback'
  #   @param code [querystring parameter] authorization code representing API acknowledgement of the user's consent. This code can be converted to an access token, valid for making API web service calls.
  #   @param scope [querystring parameter] the specific web service APIs that the user authorized.
  #   @param returnUrl [querystring parameter] the URL this method will redirect back to, once it has finished processing the authorization.
  #   @return [Redirect]
  # Once the user has logged in with their credentials, they get redirected to this
  # URL with a 'code' and a 'scope' parameters. This is exchanged for an access token
  # which can be used in any future calls to the AT&T APIs.
  get '/att/callback' do

    code = request.GET["code"]
    scope = request.GET["scope"]
    return_url = request.GET["returnUrl"]

    if return_url.nil?
      return [500, "user authentication completed but I don't have a returnUrl to go back to"]
    end
    
    if code.nil?
      error = request.GET["error"]
      if error.nil?
        error = "no code and no error message returned from the user authentication"
      else
        error_description = request.GET["error_description"]
        error = "#{error} - #{error_description}" unless error_description.nil?
      end
      return_url = return_url + (return_url.include?('?') ? '&' : '?') + "error=" + CGI.escape(error)
      return redirect to(return_url)
    end

    # work around an issue where the AT&T login page redirects to this endpoint,
    # then quickly does an identical redirect before the login page has 
    # unloaded. This results in two identical calls to this endpoint. The
    # second call fails attempting to convert the code to a token, because the
    # first call already did that. Detect a superfluous second call with the
    # same code, and don't bother trying to acquire its token.
    if $authCodes.include? code
      return redirect to(return_url)
    end

    $authCodes.push code

    # only keep the last 10 codes
    $authCodes.shift if $authCodes.length > 9

    auther = Auth::AuthCode.new($config['apiHost'], $config['appKey'], $config['Secret'])
    begin
      puts "code=#{code}"
      token = auther.createToken(code)
    rescue Auth::OAuthException => e
      return_url = return_url + (return_url.include?('?') ? '&' : '?') + "error=" + CGI.escape(e.message)
      puts "return_url=#{return_url}"
      return redirect to(return_url)
    end

    # note in the user's session the new services they have now authenticated
    unless scope.nil?
      tokenMap = session[:tokenMap] || {} 
      scope.split(",").each do |authorized_service|
        tokenMap[authorized_service] = token
      end
      session['tokenMap'] = tokenMap
    end
    redirect to(return_url)
  end
  
  # 
  # @method post_att_notification_v1_callback
  # @overload get '/att/notification/v1/callback'
  #   @param notifications [JSON request body] Push notifications.
  #   @return [HTTP status code]
  #
  #   Receive push notifications for registered subscriptions.
  #
  #   Refer to the API documentation at http://developer.att.com/apis/webhooks/docs for more details of the parameters and their allowed values.
  #
  post '/att/notification/v1/callback' do
    begin
      body = JSON.parse(request.body.read)
    rescue JSON::ParserError => e
      return json_error(400, "request body was not valid JSON: #{e.message}")
    end

    begin
      file_contents = File.open('notifications.json', 'r+') { |f| f.read }
    rescue Exception => e
      #if file doesn't exist, create content
      file_contents = '{}'
    end    
    stored_notifications = JSON.parse(file_contents)

    subscriptions_from_request = body['messageNotifications']['subscriptionNotifications']
    subscriptions_from_request.each do |subscription|
      subscription_id = subscription['subscriptionId']
      stored_notifications_for_subscription = stored_notifications[subscription_id]
      notifications_from_request = subscription['notificationEvents']
      unless notifications_from_request.kind_of?(Array)
        notifications_from_request = [notifications_from_request]
      end
      if stored_notifications_for_subscription
        stored_notifications_for_subscription.concat(notifications_from_request)
      else
        stored_notifications[subscription_id] = notifications_from_request
      end
    end
    File.open('notifications.json', 'w') { |f| f.write stored_notifications.to_json }
    200
  end

  run! do |server|
    ssl_options = {
     :cert_chain_file => File.join(File.dirname(__FILE__), '../certs/www.example.com.cert'),
     :private_key_file => File.join(File.dirname(__FILE__), '../certs/www.example.com.key'),
     :verify_peer => false
   }
   server.ssl = true
   server.ssl_options = ssl_options

   Thin::Logging::trace = true
  end
end

