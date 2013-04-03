<?php 


class Object {
	
	public $var;
	public $var2;
	
	public function __construct($var,$var2){
		
		$this->var = $var;
		$this->var = $var2;
		
	}
	
	
	public function get($var3= 'var4'){
		return $var3;
	}
	
}

$p = new Object('test','test2');
//echo $p->get('var5');


?>

<?php 

function test($name){
	
	return "Hi there $name";
}


$array = array(
		'0' => 'geen',
		'1' => 'tweee'
		);

//echo test("Joe");

	function pp($value){
		echo '<pre>';
			//print_r($value);
		echo '</pre>';
	}

pp($array);

?>


<?php 

$arraytest = array(
		'title' => 'geen',
		'author' => 'tweee'
);


//isset($_GET['if']);

extract($arraytest);

$email = <<<EOT

<h1>$title</h1>
<p>$author </p>
{$arraytest['title']}
<h2>$title</h2>
EOT;


echo $email;

?>