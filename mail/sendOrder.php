<?php 
// Подключение переменных
include 'settings.php';

// Функция для отправки писем с формы "ЗАКАЗАТЬ УСЛУГУ"

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$email = $_POST['email'];
$name = $_POST['name'];
$num = $_POST['num'];
$level = $_POST['level'];
$language = $_POST['language'];
$other = $_POST['other'];

$mail->isSMTP();
$mail->Host = 'smtp.mail.ru';
$mail->SMTPAuth = true;
$mail->Username = $myUsername; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = $myUserpassword; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom($myUsername); // От кого будет уходить письмо?
$mail->addAddress($myAddress); // Кому будет уходить письмо

$mail->isHTML(true);
$mail->Subject = 'Bedtime - заказ';
$mail->Body    = 'Email пользователя - ' .$email. '<br>Имя ребенка - ' .$name. '<br>Возраст ребенка - ' .$num. '<br>Уровень ребенка - ' .$level. '<br>Язык - ' .$language. '<br>Другое - ' .$other;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    return true;
    // header('location: ../../index.html');
}
?>