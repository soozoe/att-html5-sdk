<?php
require_once("config.php");
require_once __DIR__ . '/service_provider/Html5_ServiceProvider_Base_Att.php';
header("Content-Type:application/json");
if (isset($_GET['returnUrl']) && isset($_GET['scope'])) {
  $encoded_scope = $_GET['scope'];
  $encoded_return_url = $_GET['returnUrl'];
  $html5_provider = new Html5_ServiceProvider_Base_Att($config);
  $user_auth_url = $html5_provider->oauthUrl($encoded_scope, $encoded_return_url);
  echo "{\"url\":\"" . $user_auth_url . "\"}";
} else {
	http_response_code(400); // Set response code to 400 - Bad Request in case of all exceptions
    echo "{\"error\": \"scope and returnUrl querystring parameters must be specified\"}";
}
?>