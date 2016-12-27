function startScroller(time) {

	var time = time;
	var count = 0;


	console.log("time = " + time);

	var scroll_timer = setInterval(function() {
		console.log("count = " + count);
		if (count <= time) {
			console.log("scrolling...");
			$(window).scrollTop( $(document).height() );
			count++;
		} else {
			clearInterval(scroll_timer);
			followSorter();
		}

	}, 1000);

}


function followSorter() {
	var questions = $(".feed_item");

	questions.detach();

	questions = questions.toArray();

	for (var i = 0; i < questions.length; i++) {
		questions[i].follows = $(questions[i]).find(".count").first().text();
		if (questions[i].follows.includes("k")) {
		    questions[i].follows = parseFloat(questions[i].follows) * 1000;
		}
	}

	questions.sort(function(a, b) {
	    return b.follows - a.follows;
	});

	if ($(".TopicFeed").length > 0) {
		// We are on /topic/*
		for (i = questions.length - 1; i >= 0; --i) {
		    $(".TopicFeed").children().first().before(questions[i]);
		}
	} 
	else if ($(".PagedList").length > 0) {
		// We are on /answer
		for (i = questions.length - 1; i >= 0; --i) {
		    $(".PagedList").children().first().before(questions[i]);
		}
	}

	// window.scrollTo(0, 0);
}


chrome.runtime.onMessage.addListener(
    function (request) {
        if(request.message == "sort_by_follows") {
            console.log("Sort by Follows");
            if (request.time > 0) {
            	startScroller(request.time);
            } else {
            	followSorter();
            }

        }
    }
);


