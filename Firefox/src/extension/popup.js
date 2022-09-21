document.addEventListener(
  "DOMContentLoaded",
  function () {
    getVolume();

    var startButton = document.getElementById("start");

    browser.storage.local.get("isOn", function ({ isOn }) {
      if (isOn) {
        startButton.setAttribute("src", "../../resources/on.png");
      } else {
        startButton.setAttribute("src", "../../resources/off.png");
      }
    });

    startButton.addEventListener(
      "click",
      function () {
        browser.tabs.query(
          { url: "https://sarsstem.miracosta.edu/sarsanywhere/" },
          function (tab) {
            browser.storage.local.get("isOn", function ({ isOn }) {
              //if sars in opened in browser then turn on monitor
              if (tab[0]) {
                browser.storage.local.set({ sarsId: tab[0].id });

                if (!isOn) {
                  console.log("ON");
                  startButton.setAttribute("src", "../../resources/on.png");
                  browser.storage.local.set({ isOn: true });

                  browser.tabs.sendMessage(tab[0].id, { method: "turnOn" });
                  browser.browserAction.setIcon({
                    path: "../../resources/iconOnSmall.png",
                  });
                } else {
                  console.log("OFF");
                  startButton.setAttribute("src", "../../resources/off.png");
                  browser.storage.local.set({ isOn: false });

                  browser.tabs.sendMessage(tab[0].id, { method: "turnOff" });
                  browser.browserAction.setIcon({
                    path: "../../resources/iconSmall.png",
                  });
                }
              } else {
                if (!tab[0] && isOn) {
                  startButton.setAttribute("src", "../../resources/off.png");
                  browser.storage.local.set({ isOn: false });
                  browser.browserAction.setIcon({
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
  let volumeSlider = document.getElementById("volumeSlider");
  let volumeIcon = document.getElementById("volIcon");

  browser.storage.local.get("volume", (savedVolume) => {
    volumeSlider.value = savedVolume.volume * 100;
    changeVolumeIcon(volumeIcon);
  });

  volumeSlider.addEventListener("input", () => {
    changeVolumeIcon(volumeIcon);
  });

  volumeSlider.addEventListener("change", () => {
    soundTest.volume = volumeSlider.value / 100;
    soundTest.play();
    browser.storage.local.set({ volume: volumeSlider.value / 100 });
  });
}

function changeVolumeIcon(volumeIcon) {
  if (volumeSlider.value == 100) {
    volumeIcon.setAttribute("src", "../../resources/icons/highVolume.png");
  } else if (volumeSlider.value >= 50) {
    volumeIcon.setAttribute("src", "../../resources/icons/medVolume.png");
  } else if (volumeSlider.value < 50 && volumeSlider.value > 0) {
    volumeIcon.setAttribute("src", "../../resources/icons/lowVolume.png");
  } else {
    volumeIcon.setAttribute("src", "../../resources/icons/noVolume.png");
  }
}
