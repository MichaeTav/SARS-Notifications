chrome.runtime.onMessage.addListener(function (message) {
  console.log(message.action);
  if (message.action == "New Student") {
    console.log(message.action);
    playSound();
  }
});

function playSound() {
  let url = chrome.runtime.getURL("alert.html");

  // set this string dynamically in your code, this is just an example
  // this will play success.wav at half the volume and close the popup after a second
  url += "?volume=0.8&src=alert.mp3&length=1000";

  chrome.windows.create({
    type: "popup",
    focused: false,
    top: 1,
    left: 1,
    height: 1,
    width: 1,
    url,
  });
}
