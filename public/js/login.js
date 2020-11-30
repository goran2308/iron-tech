const urlParams = new URLSearchParams(window.location.search);
const info = urlParams.get('info');

if (info) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerText = info;
  errorMessage.style.display = "block";
}