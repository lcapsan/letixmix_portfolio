<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cargar la biblioteca PHPMailer
require 'vendor/autoload.php';

// Crear una nueva instancia de PHPMailer
$mail = new PHPMailer(true);

try {
    // Configurar el servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'tu_usuario_smtp';
    $mail->Password = 'tu_contraseña_smtp';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Configurar el correo electrónico
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $nombre = $_POST["nombre"];
        $correo = $_POST["correo"];
        $telf = $_POST["telefono"];
        $asunto = $_POST["asunto"];
        $mensaje = $_POST["mensaje"];
        
        // Dirección de correo a la que se enviará el mensaje
        $destinatario = "letixmix@hotmail.com";
        
        // Construir el cuerpo del correo electrónico
        $cuerpoCorreo = "Nombre: " . $nombre . "\nCorreo: " . $correo . "\nTelefono: " . $telf . "\nAsunto: " . $asunto . "\nMensaje: " . $mensaje;
        
        // Cabeceras adicionales
        //$cabeceras = "From: " . $correo . "\r\n";


        $mail->setFrom($destinatario, '50 ingenieros');
        $mail->addAddress($correo, $nombre);
        $mail->Subject = $asunto;
        $mail->Body = $cuerpoCorreo;
        
        // Enviar el correo
        $mail->send();
        header("Location: exito.html"); // Redirige a la página de éxito
    } catch (Exception $e) {
    header("Location: error.html"); // Redirige a la página de error
}
?>







