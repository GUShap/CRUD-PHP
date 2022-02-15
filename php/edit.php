<?php
include('dbConnection.php');

$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['sid'];

$sql = "SELECT * FROM student WHERE id={$id}";
$results = $conn->query($sql);
$row = $results->fetch_assoc();

echo json_encode($row);
?>