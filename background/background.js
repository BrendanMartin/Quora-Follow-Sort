var time = 5;

function setTime(num) {
    time = num === false || num === undefined || num === null ? 5 : num;
}

function sortByFollows() {
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			"message": "sort_by_follows",
			"time": time
		});
	});
}
