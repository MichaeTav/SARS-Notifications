document.addEventListener(
  "DOMContentLoaded",
  function () {
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
              if (tab[0] && !isOn) {
                console.log("ON");
                startButton.setAttribute("src", "../../resources/on.png");
                chrome.storage.local.set({ isOn: true });

                chrome.tabs.sendMessage(tab[0].id, { method: "turnOn" });
                chrome.action.setIcon({
                  path: "../../resources/iconOnSmall.png",
                });
              } else if (tab[0] && isOn) {
                console.log("OFF");
                startButton.setAttribute("src", "../../resources/off.png");
                chrome.storage.local.set({ isOn: false });

                chrome.tabs.sendMessage(tab[0].id, { method: "turnOff" });
                chrome.action.setIcon({
                  path: "../../resources/iconSmall.png",
                });
              } else {
                //if SARS is not opened alert pops up
                alert("SARS must be opened in a tab to start");
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
