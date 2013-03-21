<?php
class MysqlStringEscaper
{
    function __get($value)
    {
        return mysql_real_escape_string($value);
    }
}
$str = new MysqlStringEscaper;
?>

<?php
mysql_query("SELECT * FROM users WHERE name LIKE '{$str->$name}' LIMIT 10");
?>