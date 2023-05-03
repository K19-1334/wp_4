<?php
    $player_name = $_POST['name'];
    $player_score = $_POST['score'];

    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "wp_assignment";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection Failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO scores (player_name, player_score) VALUES (?, ?)");
    $stmt->bind_param("si", $player_name, $player_score);
    $stmt->execute();
?>