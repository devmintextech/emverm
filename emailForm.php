<?php

$to = $_GET["toEmail"];

$headers = sprintf("From: noreply@impaxlabs.com\r\nReply-To: %s\r\n", $_GET["fromEmail"]);
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=iso-8859-1\r\n";
	$headers .= sprintf("X-Mailer: PHP v %s\r\n", phpversion());
	$headers .= "Content-Transfer-Encoding: 8bit\r\n\r\n"; 

$subject = "EMVERM.COM";
$message = "I thought you might be interested in the <a href='http://www.emverm.com' target='_blank'>EMVERM.COM</a> website. This website has facts about highly contagious pinworm infections, including who gets pinworm, what the signs are, how it is treated, and how to prevent the spread of pinworm in your home.";

$mailSent = mail($to, $subject, $message, $headers);

return $mailSent;

?>
