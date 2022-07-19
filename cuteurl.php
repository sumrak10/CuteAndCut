<?php
include "db.php";

const SITE_DOMAIN = "cnc.io";
const URL_LENGTH = 7; // задает длину "красивой" ссылки
                      // при длине 7 символов 
                      // кол-во комбинаций равно 3 521 614 606 208
                      // не указывайте число меньше 5 для минимизации коллизий

$url = $_POST["url"];
// $url = "https://www.example.com/sumrak10/repo?data=first";

do {
    $link = getRandomString(URL_LENGTH);
    $empty_url = getUrl($link);
} while ($emptyurl);

// $sql = "INSERT INTO `links` (`link`, `url`) VALUES ('".$link."','".$url."');";
// echo $sql;
// echo insertUrl($link,$url);

if (insertUrl($link,$url)) {
    echo "http://".SITE_DOMAIN."/".$link;
} else {
    echo "INSERT_ERROR";
}
$conn->close();

// UTILS
function getRandomString($stringLength) 
{
    $rstr = "";
    $simbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for ($i = 0; $i <= $stringLength-1; $i++) {
        $rstr = $rstr . $simbols[rand(0,strlen($simbols))];
    }
    return $rstr;
}


// $foo = 5;
// function bar($a) {
//     global $foo;
//     echo "a:";
//     echo $a;
//     echo "foo:";
//     echo $foo;
//     return $a + $foo;
// }
// $b = bar($foo);
// echo "b:";
// echo $b;