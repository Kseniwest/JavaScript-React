<?php
$_POST = json_decode(file_get_contents("php://input"), true); //для того чтобы работать с json
echo var_dump($_POST);
