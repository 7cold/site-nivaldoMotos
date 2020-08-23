<?php

$token  = $_POST['newToken'];

function sendPushNotification($to = '', $data = '')
{
    $apiKey = 'AAAANaWg6rc:APA91bGN-yad0Ur2d5EMYyF_xdUsia2JAdQzhGHs2mJupX0osOZM2x6H4lg3KCazP16O_2l-HjoxUIFJzaOvUM75mew9jY35HSH7aHHFBgGK9XTkSdgtix2L3EO11Wj7g3-ooy1IFZY8';
    $fields = array('to' => $to, 'registration_tokens' => $data);

    $headers = array('Authorization: key=' . $apiKey, 'Content-Type: application/json');

    $url = 'https://iid.googleapis.com/iid/v1:batchAdd';

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

    $result = curl_exec($ch);
    curl_close($ch);

    return json_decode($result, true);
}

$to = "/topics/allDevices";

$data = $token;


print_r(sendPushNotification($to, [$data]));
