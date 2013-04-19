 <?
    //change this to your email.
    $to = "r.dolewa@readview.nl";
    $from = "m2@maaking.com";
    $subject = "Hello! This is HTML email";

    //begin of HTML message
    $message = "<html>
  <body bgcolor=\"#DCEEFC\">
    <center>
        <b>Looool!!! I am reciving HTML email......</b> <br>
        <font color=\"red\">Thanks Mohammed!</font> <br>
        <a href=\"http://www.maaking.com/\">* maaking.com</a>
    </center>
      <br><br>*** Now you Can send HTML Email <br> Regards<br>MOhammed Ahmed - Palestine
  </body>
</html>";
   //end of message

    // To send the HTML mail we need to set the Content-type header.
    $headers = "MIME-Version: 1.0rn";
    $headers .= "Content-type: text/html; charset=iso-8859-1rn";
    $headers  .= "From: $from\r\n";
    //options to send to cc+bcc
    //$headers .= "Cc: [email]maa@p-i-s.cXom[/email]";
    //$headers .= "Bcc: [email]email@maaking.cXom[/email]";
    
    // now lets send the email.
    mail($to, $subject, $message, $headers);

    echo "Message has been sent....!";
?> 