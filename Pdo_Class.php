<?php
class database{
  
  var $dbh;
  
  function connect(){
      
      $hostname = "";
      $database = "";
      $username = "";
      $password = "";          
              
      try { 
        $this->dbh = new PDO("mysql:host=".$hostname.";dbname=".$database.";",$username, $password);
        echo 'Connected to database';        
    }
        catch(PDOException $e){
            
        echo $e->getMessage();        
    } 
  }
  function select_query($sql){
      $result = $this->dbh->query($sql);
      $result = $result->fetch(PDO::FETCH_OBJ);
      return $result;
  }
}

$db = new database;
$db->connect();
$members = $db->select_query("SELECT * FROM members");
foreach($members AS $member)
{
    echo $member->username;
}
?>

foreach($foo as $key => $value) {
   $$key = $value;
}

echo $first; // '1st'