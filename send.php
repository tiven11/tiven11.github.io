<?php  

// Llamando a los campos
$name = $_POST['name'];
$mail = $_POST['mail'];
$phone = $_POST['phone'];
$message = $_POST['message'];

// Datos para el correo
$from = "inge.steven.zg@gmail.com";
$subject = "message from the UCW web application";

$letter = "De: $name \n";
$letter .= "Correo: $mail \n";
$letter .= "Telefono: $phone \n";
$letter .= "Mensaje: $message";

// Enviando Mensaje
mail($from, $subject, $letter);
header('Location:sendTo.html');

?>