chrome.runtime.onMessage.addListener(function (message) {
  if (message.action == "New Student") {
    playSound();
  }
});

function playSound() {
  let url = "src/extension/alert.html";

  // set this string dynamically in your code, this is just an example
  // this will play alert.mp3 at 4/5 the volume and close the popup after a second
  url += "?volume=0.8&src=../../resources/alert.mp3&length=1000";

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
