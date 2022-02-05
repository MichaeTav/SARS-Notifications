document.addEventListener(
  "DOMContentLoaded",
  function () {
    getVolume();

    var startButton = document.getElementById("start");

    chrome.storage.local.get("isOn", function ({ isOn }) {
      if (isOn) {
        startButton.setAttribute("src", "../../resources/on.png");
      } else {
        startButton.setAttribute("src", "../../resources/off.png");
      }
    });

    startButton.addEventListener(
      "click",
      function () {
        chrome.tabs.query(
          { url: "https://sarsstem.miracosta.edu/sarsanywhere/" },
          function (tab) {
            chrome.storage.local.get("isOn", function ({ isOn }) {
              //if sars in opened in browser then turn on monitor
              if (tab[0]) {
                if (!isOn) {
                  console.log("ON");
                  startButton.setAttribute("src", "../../resources/on.png");
                  chrome.storage.local.set({ isOn: true });

                  chrome.tabs.sendMessage(tab[0].id, { method: "turnOn" });
                  chrome.action.setIcon({
                    path: "../../resources/iconOnSmall.png",
                  });
                } else {
                  console.log("OFF");
                  startButton.setAttribute("src", "../../resources/off.png");
                  chrome.storage.local.set({ isOn: false });

                  chrome.tabs.sendMessage(tab[0].id, { method: "turnOff" });
                  chrome.action.setIcon({
                    path: "../../resources/iconSmall.png",
                  });
                }
              } else {
                if (!tab[0] && isOn) {
                  startButton.setAttribute("src", "../../resources/off.png");
                  chrome.storage.local.set({ isOn: false });
                  chrome.action.setIcon({
                    path: "../../resources/iconSmall.png",
                  });
                } else {
                  alert("SARS must be opened");
                }
              }
            });
          }
        );
      },
      false
    );
  },
  false
);

function getVolume() {
  let soundTest = new Audio("../../resources/alert.mp3");
  let volume = document.getElementById("volume");
  let volumeIcon = document.getElementById("volIcon");

  chrome.storage.local.get("volume", (savedVolume) => {
    volume.value = savedVolume.volume * 100;
  });

  volume.addEventListener("input", () => {
    if (volume.value == 100) {
      volumeIcon.setAttribute("src", "../../resources/icons/highVolume.png");
    } else if (volume.value >= 50) {
      volumeIcon.setAttribute("src", "../../resources/icons/medVolume.png");
    } else if (volume.value < 50 && volume.value > 0) {
      volumeIcon.setAttribute("src", "../../resources/icons/lowVolume.png");
    } else {
      volumeIcon.setAttribute("src", "../../resources/icons/noVolume.png");
    }
  });

  volume.addEventListener("change", () => {
    soundTest.volume = volume.value / 100;
    soundTest.play();
    chrome.storage.local.set({ volume: volume.value / 100 });
  });
}
