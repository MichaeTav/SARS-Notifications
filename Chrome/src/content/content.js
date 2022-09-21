//ui-id-3 dropin-tab-count HiddenElement span id=tabs-12-attention

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method == "turnOn") {
    console.log("Turning on");
    chrome.storage.local.set({ prevCount: 0 });
    start = setInterval(startMonitor, 5000);
  } else if (request.method == "turnOff") {
    try {
      console.log("Turning off");
      clearInterval(start);
    } catch (error) {
      console.log(error);
    }
  }
});

let audio = new Audio(chrome.runtime.getURL("../../resources/alert.mp3"));

function startMonitor() {
  chrome.storage.local.get(
    ["prevCount", "volume"],
    function ({ prevCount, volume }) {
      let count = document.getElementById("tabs-12-attention");
      let currCount = count.textContent;
      audio.volume = volume;

      //element keeps 1 as textContent when dropping to zero so check for HiddenElement
      if (count.className === "dropin-tab-count HiddenElement") {
        currCount = 0;
      }
      //If there is a new student play sound
      if (currCount > 0 && currCount > prevCount) {
        audio.play();
      }
      chrome.storage.local.set({ prevCount: currCount });
    }
  );
}
