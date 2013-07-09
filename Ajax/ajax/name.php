
<?php

//if(isset($_POST['name']) === true){

//$_POST['name'] = 'radek';
require '../db/connect.php';


      $data = "
        Select location
        FROM names
        WHERE name = '".$_POST['name']."'
        ";
      //echo $data;
      //die();
      $querry = mysql_query($data);
      echo (mysql_num_rows($querry) !== 0) ? mysql_result($querry, 0, 'location') : 'Name not found' ;

//}

?>
