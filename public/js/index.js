const req = new XMLHttpRequest();
req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    const user = JSON.parse(req.response).user;
    document.getElementById("welcome-message").innerText = `Welcome ${user.username}!!`;
  }
};
req.open("GET", "http://localhost:1337/user", true);
req.send();