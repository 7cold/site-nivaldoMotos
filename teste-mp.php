<?php
require __DIR__  . '/vendor/autoload.php';

MercadoPago\SDK::setAccessToken("APP_USR-4618697567453611-051814-a3a76e6bab50fbba6131c817383c1f61-38201203");

$mp = new MercadoPago\Payment();

$payment->transaction_amount = 141;
$payment->token = "YOUR_CARD_TOKEN";
$payment->description = "Ergonomic Silk Shirt";
$payment->installments = 1;
$payment->payment_method_id = "visa";
$payment->payer = array(
    "email" => "larue.nienow@email.com"
);

$payment->save();

echo $payment->status;
