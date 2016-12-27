function bg() {
	return chrome.extension.getBackgroundPage();
}

function startTimer(duration, display) {
	var timer = duration, minutes, seconds;

    var scroll_timer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
            clearInterval(scroll_timer);
            display.text("");
        }
    }, 1000);
}

(function ($, init){
	console.log("init function");

    if($.isReady) {
        init();
    } else {
        $(init);
    }
}

(jQuery, function () {

    $('#scroll-sort').click(function () {

    	console.log("Sort button clicked");

    	var time = parseInt($('#time').val());
    	var display = $('#timer');

        bg().setTime(time);

        bg().sortByFollows();

        startTimer(time, display);

    });


    $('#no-scroll-sort').click(function() {

    	bg().setTime(-1);

    	bg().sortByFollows();
    });

}));