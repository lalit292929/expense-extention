$(function () {
    chrome.storage.sync.get(['total', "limit"], function (budget) {
        $("#total").text(budget.total);
        $("#limit").text(budget.limit);
    })
    $('#spendAmount').click(function () {
        chrome.storage.sync.get(['total', 'limit'], function (budget) {
            var newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if (amount && !isNaN(parseInt(amount))) {
                newTotal += parseInt(amount);
            } else {
                alert("Please enter an integer value");
            }

            chrome.storage.sync.set({ "total": newTotal }, function () {
                if (amount && newTotal >= budget.limit) {
                    var notificationObj = {
                        type: 'basic',
                        iconUrl: '../icons/money64.png',
                        title: 'Limit Reached!!!',
                        message: "Oops! top limit reached"
                    };
                    chrome.notifications.create('limitNotification', notificationObj)
                }
            });
            $("#total").text(newTotal);
            $('#amount').val('')
        })
    })
})