<?php
include('dbConnection.php');

// Get Student information

$sql ="SELECT * FROM student";
$result = $conn->query($sql);
if($result->num_rows > 0){
    $data = array();
    while($row = $result->fetch_assoc()){
        $data[]= $row;
    }
}

// Return JSON Data 
echo json_encode($data);
?>