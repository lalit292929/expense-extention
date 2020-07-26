$(function () {
    chrome.storage.sync.get(['total', "limit"], function (budget) {
        $("#limit").val(budget.limit);
    })
    $('#saveLimit').click(function () {
        var limit = $('#limit').val();
        if (limit && !isNaN(parseInt(limit))) {
            chrome.storage.sync.set({ "limit": parseInt(limit) }, function () {
                close();
            });
        } else {
            alert("Please enter an integer value");
        }
    });
    $('#resetTotal').click(function () {
        chrome.storage.sync.set({ "total": 0 }, function () {
            var notificationObj = {
                type: 'basic',
                iconUrl: '../icons/money64.png',
                title: 'Total Reset!!!',
                message: "Total has been set to 0"
            };
            chrome.notifications.create('limitNotification', notificationObj);
        });
    });
})