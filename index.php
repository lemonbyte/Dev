<?php

class database{
  
  var $dbh;
  
   function __construct() {
   	  $this->connect();
   }
   
   // Functie voor het opzetten van de database connectie
  function connect(){

      $hostname = "93.157.2.57:3306";
      $database = "readview_dbs";
      $username = "test";
      $password = "visje";          
              
      try { 
        $this->dbh = new PDO("mysql:host=".$hostname.";dbname=".$database.";",$username, $password);       
    }
        catch(PDOException $e){
        echo $e->getMessage();        
    } 
  }
	
  // Functie voor het uitvoeren van een select string.
  // @ Param String
  function select_all($sql){
      $result = $this->dbh->query($sql);
      return $result->fetchALL(PDO::FETCH_OBJ);
  }

  // Functie voor het uitvoeren van een select string.
  // @ Param String
  function select_where($sql="",$id=""){
 		
  	try{
		$this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$select = $this->dbh->prepare($sql);
		$select->execute(array('id' => $id));
		
    	while($row = $select->fetch(PDO::FETCH_OBJ)) {
	        print_r($row);
	        echo $row->id;
	    }
  	}
  	catch(PDOException $e) {
  		echo 'Error: ' . $e->getMessage();
  	}
  	
  }
  
  function __destruct() {
  	$dbh = null;
  	unset($dbh);
  }
  
}// Einde classe


$db = new database;

$members = $db->select_all("SELECT * FROM a");

foreach($members AS $member)
{
     echo $member->userId.PHP_EOL;
}


$param = 1;
$db->select_where('SELECT * FROM a WHERE id = :id',$param);



?>