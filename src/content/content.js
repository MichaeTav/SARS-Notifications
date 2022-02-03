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

function startMonitor() {
  chrome.storage.local.get("prevCount", function ({ prevCount }) {
    let count = document.getElementById("tabs-12-attention");
    let currCount = count.textContent;

    //element keeps 1 as textContent when dropping to zero so check for HiddenElement
    if (count.className === "dropin-tab-count HiddenElement") {
      currCount = 0;
    }
    if (currCount > 0) {
      //console.log("Number of students waiting: " + currCount);
      if (prevCount < currCount) {
        //console.log("NEW STUDENT");
        chrome.runtime.sendMessage(chrome.runtime.id, {
          action: "New Student",
        });
      }
    }
    // else {
    //   console.log("No students waiting");
    // }
    chrome.storage.local.set({ prevCount: currCount });
  });
}
