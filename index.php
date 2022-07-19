<?php
include "db.php";

$link = $_SERVER['REQUEST_URI'];
$link = explode('?', $link);
$link = mb_substr($link[0],1,strlen($link[0]));
$url = getUrl($link);

$path = "";

if (!($url == '0')) {
    header('Location: '.$url);
    exit();
} else {
    if (!($link == '')) {
        $path = "wronglink";
    } else {
        $path = "index";
    }
}

include "templates/header.php";
include "templates/social.php";

include "templates/".$path.".php";

include "templates/footer.php";

$conn->close();