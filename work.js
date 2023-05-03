$(document).ready(function () {
  var score = 0;
  var level = 1;
  var time = 0;
  var match = 0;
  var timerInterval;

  var playerName = prompt("Enter Your Name:");
  var totalTime = prompt("Enter Total Max Time:");
  var maxLevel = prompt("Enter Max Levels:");


  $("#level").text(level);
  $("#score").text(score);
  $("#timer").text("Not Defined");

  function startTimer() {
    timerInterval = setInterval(function () {
      time++;
      $("#timer").text((totalTime - time));
      if (time >= totalTime) {
        clearInterval(timerInterval);
        alert("Game Over !");
        sendScore();
        $("#start-button").prop("disabled", false);
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    time = 0;
    totalTime -= 5;
    $("#timer").text(totalTime);
    if (level >= maxLevel) {
      alert("You Win !");
      sendScore();
      $("#start-button").prop("disabled", false);
    } else {
      level++;
      alert("Level " + level + " Reached !");
      $("#level").text(level);
      shuffleItems();
      startTimer();
    }
  }

  function shuffleItems() {
    $(".char-row").each(function () {
      var items = $(this).children();
      for (var i = items.length - 1; i >= 0; i--) {
        $(this).append(items[Math.random() * (i+1) | 0]);
      }
    });
  
    $(".pic-row").each(function () {
      var items = $(this).children();
      for (var i = items.length - 1; i >= 0; i--) {
        $(this).append(items[Math.random() * (i+1) | 0]);
      }
    });
  }

  $("#start-button").click(function () {    
    if (name !== null) {
      startGame();
      $("#start-button").prop("disabled", true);
    }
  });

  function sendScore() {
    var playerName = $("#player-name").text().replace("Player: ", "");
    $.ajax({
      type: "POST",
      url: "score_db.php",
      data: { name: playerName, score: score },
      success: function(response) {
        console.log(response);
      }
    });
  }

function startGame() {
  var score = 0;
  var level = 1;
  var totalTime = 60;
  var time = 0;
  var match = 0;
  var timerInterval;
  $("#level").text(level);
  $("#score").text(score);
  $("#timer").text("Not Defined");
  shuffleItems();
  startTimer();

  $(".char").draggable({
    revert: "invalid"
  });

  $(".pic").droppable({
    drop: function (event, ui) {
      var sliceName = ui.draggable.attr("name");
      var wholeName = $(this).attr("name");
      if (sliceName === wholeName) {
        score+=5;
        match++;
        $("#score").text(score);
        ui.draggable.effect("bounce", { times: 3 }, 300);
        if (match === 5) {
          match = 0;
          resetTimer();
        }
      }
      
      ui.draggable.animate({
        top: 0,
        left: 0
      });
    }
  });
}
});

$.ajax({
  type: "GET",
  url: "get_scores.php",
  success: function(response) {
    var data = JSON.parse(response);
    var tableHtml = "<table><tr><th>Name</th><th>Score</th></tr>";
    for (var i = 0; i < data.length; i++) {
      tableHtml += "<tr><td>" + data[i].player_name + "</td><td>" + data[i].player_score + "</td></tr>";
    }
    tableHtml += "</table>";
    $("#scores").html(tableHtml);
  }
});