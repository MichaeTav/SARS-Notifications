//turns off notifications once SARS tab is closed
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  chrome.storage.local.get("sarsId", function ({ sarsId }) {
    if (tabId === sarsId) {
      chrome.storage.local.set({ isOn: false });
      chrome.action.setIcon({
        path: "../../resources/iconSmall.png",
      });
    }
  });
});
