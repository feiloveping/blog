<?php

require_once __DIR__ . "/DataClass.php";
$dataClass =  new DataClass();
if(isset($_GET['id']) && !empty($_GET['id'])){
    $id = $_GET['id'];
}else{
    $id = 0;

}
$data = $dataClass->getDetail($id);
echo json_encode($data,JSON_UNESCAPED_UNICODE );