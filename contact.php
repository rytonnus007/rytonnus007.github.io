<?php

if(isset($_POST['validform'])){
    $sujet = htmlentities($_POST['sujet']);
    $demande = htmlentities($_POST['demande']);

    if(isset($_POST['demandeur']) and !empty($_POST['demandeur'])) {
        $demandeur = htmlentities($_POST['demandeur']);
    }
    if(isset($_POST['prenom']) and !empty($_POST['prenom'])) {
        $prenom = htmlentities($_POST['prenom']);
    }
    if(isset($_POST['nom']) and !empty($_POST['nom'])) {
        $nom = htmlentities($_POST['nom']);
    }
    if(isset($_POST['tel']) and !empty($_POST['tel'])) {
        $tel = htmlentities($_POST['tel']);
    }
    if(isset($_POST['mail']) and !empty($_POST['mail'])) {
        $mail = htmlentities($_POST['mail']);
    }

    $destinataire = 'cse@aveyron-labo.fr';
    $contenu = '<html><head><title> '.$sujet.' </title></head><body>';
    $contenu .= '<p>Tu as un nouveau message !</p>';
    $contenu .= '<p><strong>De </strong>: '.$prenom.' '.$nom.'</p>';
    $contenu .= '<p><strong>téléphone</strong>: '.$tel.'</p>';
    $contenu .= '<p><strong>Email</strong>: '.$mail.'</p>';
    $contenu .= '<p><strong>Message</strong>: '.$demande.'</p>';
    $contenu .= '</body></html>';

    // Pour envoyer un email HTML, l'en-tête Content-type doit être défini
    $headers = 'MIME-Version: 1.0'."\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";

    mail($destinataire, $sujet, $contenu, $headers); // Fonction principale qui envoi l'email
    header("location:index.html");
}
