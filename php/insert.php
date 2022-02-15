<?php 
include('dbConnection.php');

$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['id'];
$name = $mydata['name'];
$email = $mydata['email'];
$password = $mydata['password'];

if(!empty($name) && !empty($email) && !empty($password)){
    $sql = "INSERT INTO student (id, name, email, password) VALUES
    ('$id', '$name', '$email', '$password') ON DUPLICATE Key
    UPDATE name='$name', email ='$email', password ='$password'";

if($conn->query($sql) == TRUE){
        echo "Student Saved Successfully";
    } else {
        echo "Unable to Save Student";
    }
} else {
    echo "Fill All Fields";
}
?>
<!-- if(!empty($name) && !empty($email) && !empty($password)){
    $sql = "INSERT INTO student (name, email, password) VALUES
    ('$name', '$email', '$password')";

if($conn->query($sql) == TRUE){
        echo "Student Saved Successfully";
    } else {
        echo "Unable to Save Student";
    }
} else {
    echo "Fill All Fields";
} -->