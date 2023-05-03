<?php
    $host = "localhost";
    $username = "admin";
    $password = "admin";
    $database = "wp_assignment";

    $conn = mysqli_connect($host, $username, $password, $database);

    if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
    }

    $query = "SELECT * FROM scores ORDER BY player_score DESC";
    $result = mysqli_query($conn, $query);
    $scores = array();

    while ($row = mysqli_fetch_assoc($result)) {
    $scores[] = $row;
    }

    mysqli_close($conn);
    echo json_encode($scores);
?>