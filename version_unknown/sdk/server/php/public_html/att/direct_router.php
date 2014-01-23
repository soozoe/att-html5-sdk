<?php

require_once("../config.php");

if ($_SERVER['REQUEST_METHOD'] === "POST") {

    # Define our PROVIDER constant
    define("PROVIDER", "ServiceProvider");

    # Get raw post data
    $data = json_decode(trim(file_get_contents("php://input")));

    $response = (object) array(
        "type" => "rpc",
        "tid" => $data->tid,
        "action" => $data->action,
        "method" => $data->method
    );

    $method_whitelist = array("oauthUrl", "signPayload");
    $client_credentials = array("sendSms", "smsStatus", "receiveSms", "mmsStatus", "wapPush", "sendMms",  "requestChargeAuth", "subscriptionDetails", "refundTransaction", "transactionStatus", "subscriptionStatus", "getNotification", "acknowledgeNotification", "speechToText");

    # This passes white-listed methods through to the Provider instance
    if ($data->action === PROVIDER && in_array($data->method, $method_whitelist)) {
        $response = (object) array_merge((array) $response, (array) $provider->{"direct_" . $data->method}($data->data[0]));

    } elseif ($data->action === PROVIDER) {

        if (isset($_SESSION['token'])) {
            $token = $_SESSION['token'];
        }

        # If client credentials can be used, set token to this
        if(in_array($data->method, $client_credentials)) {
            $token = $provider->getCurrentClientToken();
        }

        if (! isset($token)) {
            $response->error = "No token set. Unauthorized request";
        } else {
            if (!$data->data) { //some methods like receiveSms have a null value for $data->data;
                $data->data = array();
            }

            # Always push the token to the front of the data array
            array_unshift($data->data, $token);

            # The router makes dynamic function calls with a variable number of arguments
            $response = (object) array_merge((array) $response, (array) call_user_func_array(array($provider, "direct_" . $data->method), $data->data));
        }

    } else {
        $response->error = "Unrecognized method";
    }

    if (isset($response->error)) {
        $response = (object) array_merge((array) $response, array("type" => "exception", "error" => $response->error));
    }

    echo json_encode($response);
}

?>