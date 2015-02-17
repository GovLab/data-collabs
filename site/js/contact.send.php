<?php

	/* Contact Form Setup Begin */

	$send_name      = "Your Name";			// Replace your name
	$send_title     = "Web Site Message";	// Replace email sent title
	$send_address   = "mail@server.com";	// Replace your email address
	$send_password	= "123456";				// Replace your email password
	$send_server	= "mail.server.com";	// Replace your email server address
	
	/* Contact Form Setup End */

	date_default_timezone_set('Etc/UTC');

	require 'inc/phpmailer/PHPMailerAutoload.php';

	$mail = new PHPMailer();							// Create a new PHPMailer instance
	$mail->isSMTP();									// Tell PHPMailer to use SMTP
	$mail->CharSet = "utf-8";							// Set CharSet
	$mail->Host = $send_server;							// Set the hostname of the mail server
	$mail->Port = 587;									// Set the SMTP port number - likely to be 25, 465 or 587
	$mail->SMTPAuth = true;								// Whether to use SMTP authentication
	$mail->Username = $send_address;					// Username to use for SMTP authentication
	$mail->Password = $send_password;					// Password to use for SMTP authentication
	$mail->setFrom( $_POST["email"], $_POST["name"]);	// Set who the message is to be sent from
	$mail->addAddress( $send_address, $send_name );		// Set who the message is to be sent to
	$mail->Subject = $send_title;						// Set the subject line
	
	//Read an HTML message body from an external file, convert referenced images to embedded,
	//convert HTML into a basic plain-text alternative body
	$mail->msgHTML($_POST["message"]."<br /><br />".$_POST["name"]);

	//send the message, check for errors
	if (!$mail->send()) { echo "ERROR"; } else { echo "SUCCESS"; }

?>