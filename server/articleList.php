<?php

require_once __DIR__ . "/DataClass.php";
$dataClass =  new DataClass();
if(isset($_GET['page']) && !empty($_GET['page'])){
    $page = $_GET['page'];
}else{
    $page = 0;

}
$data = $dataClass->getArticleList($page);
echo json_encode($data,JSON_UNESCAPED_UNICODE );