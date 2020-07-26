var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickEvent) {
    if (clickEvent.menuItemId === "spendMoney" && clickEvent.selectionText) {
        console.log("hi")
        if (!isNaN(clickEvent.selectionText)) {
            chrome.storage.sync.get(['total', "limit"], function (budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total)
                }

                newTotal += parseInt(clickEvent.selectionText)

                chrome.storage.sync.set({ "total": newTotal }, function () {
                    if (newTotal >= budget.limit) {
                        var notificationObj = {
                            type: 'basic',
                            iconUrl: '../icons/money64.png',
                            title: 'Limit Reached!!!',
                            message: "Oops! top limit reached"
                        };
                        chrome.notifications.create('limitNotification', notificationObj)
                    }
                });
            });
        }
    }
})

chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({ "text": changes.total.newValue.toString() })
})