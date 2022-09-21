//turns off notifications once SARS tab is closed
browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
  browser.storage.local.get("sarsId", function ({ sarsId }) {
    if (tabId === sarsId) {
      browser.storage.local.set({ isOn: false });
      browser.browserAction.setIcon({
        path: "../../resources/iconSmall.png",
      });
    }
  });
});
