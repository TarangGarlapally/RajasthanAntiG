// Listen for extension icon click
chrome.action.onClicked.addListener((tab) => {
    // Open the side panel
    chrome.sidePanel.open({ windowId: tab.windowId });
});

// Set up side panel behavior on installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('AI Chat Sidebar extension installed');

    // Enable side panel for all sites
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

console.log('AI Chat Sidebar background script loaded');
