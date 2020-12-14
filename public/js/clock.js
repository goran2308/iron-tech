const timeDisplay = document.getElementById("time");


function refreshTime() {
  let dateString = new Date().toLocaleString("en-GB", {
    timeZone: "UTC"
  });
  let formattedString = dateString.replace(", ", " - ");
  timeDisplay.innerHTML = formattedString;
}

setInterval(refreshTime, 1000);