<?php
$conn = new mysqli("127.0.0.1:3306", "root", "root", "cuteandcut");

if ($conn->connect_error) {
    die("Connection failed");
}

function getUrl($link) 
{
    global $conn;
    $result = $conn->query("SELECT `url` FROM `links` WHERE `link`='".$link."'");
    if ($result->num_rows > 0) {
        $result = mysqli_fetch_array($result);
        return $result['url'];
    } else {
        return 0;
    }
}
function insertUrl($link,$url)
{
    global $conn;
    $sql = "INSERT INTO `links` (`link`, `url`) VALUES ('".$link."','".$url."')";
    if ($conn->query($sql) === TRUE) {
        return 1;
    } else {
        return 0;
    }
}