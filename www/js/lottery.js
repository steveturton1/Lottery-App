/**
 * Created by Steve on 29/08/2015.
 */

var inc = 0, max = 10000;
var linesDone = 0;
var drawsDone = 0;
var costPerLine = 1;
var bigWin = false;

var toastPos = 0;
function toast() {

    window.plugins.toast.showShortTop("I am a short message");
    return;

    switch(toastPos) {
        case 0:
            window.plugins.toast.showShortTop("I am a short message");
            toastPos = 1;
            break;
        case 1:
            window.plugins.toast.showShortCenter("I am a short message");
            toastPos = 2;
            break;
        case 2:
            window.plugins.toast.showShortBottom("I am a short message");
            toastPos = 0;
            break;
    }
}

function vibrateThunderball() {
    navigator.vibrate(2000);
}

function bigWinner() {
    vibrateThunderball();
    alertThunderball();
}

function alertThunderball() {
    function alertDismissed() {
    // do something
    }

    navigator.notification.alert(
        'You are a Jackpot Winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
}

var watchAccOptions = { frequency: 100 };  // Update every 10th seconds
var watchAccID = null;

function watchAccOn() {
    function onWatchAccSuccess(acceleration) {
        //alert('Acceleration X: ' + acceleration.x + '\n' +
        //  'Acceleration Y: ' + acceleration.y + '\n' +
        //  'Acceleration Z: ' + acceleration.z + '\n' +
        //  'Timestamp: '      + acceleration.timestamp + '\n');
        document.getElementById("WatchAccResult").innerHTML = "X:"+ acceleration.x.toFixed(2) + " Y:" + acceleration.y.toFixed(2) + " Z:" + acceleration.z.toFixed(2);

    };

    function onWatchAccError() {
        document.getElementById("WatchAccResult").innerHTML = "WatchAccError";
    };

    if (!watchAccID) {
        watchAccID = navigator.accelerometer.watchAcceleration(onWatchAccSuccess, onWatchAccError, watchAccOptions);
    }
}
function watchAccOff() {
    if (watchAccID) {
        navigator.accelerometer.clearWatch(watchAccID);
        watchAccID = null;
    }

}

var watchCompassOptions = { frequency: 1000 };  // Update every 10th seconds
var watchCompassID = null;

function watchCompassOn() {

    function onCompassSuccess(heading) {
        document.getElementById('WatchCompassResult').innerHTML = "Clicked 2";
        document.getElementById('WatchCompassResult').innerHTML = heading;
    }

    function onCompassError(error) {
        if (error.code == CompassError.COMPASS_INTERNAL_ERR) {
            document.getElementById('WatchCompassResult').innerHTML = "CompassError.COMPASS_INTERNAL_ERR";
        } else {
            if (error.code == CompassError.COMPASS_NOT_SUPPORTED) {
                document.getElementById('WatchCompassResult').innerHTML = "CompassError.COMPASS_NOT_SUPPORTED";
            } else {
                document.getElementById('WatchCompassResult').innerHTML = "ERROR! Not Supported:" + error.code;
            }
        }
    }


    if(!watchCompassID) {
        document.getElementById('WatchCompassResult').innerHTML = "Clicked";
        watchCompassID = navigator.compass.watchHeading(onCompassSuccess, onCompassError, watchCompassOptions);
    }

}

function watchCompassOff() {
    if(watchCompassID) {
        navigator.compass.clearWatch(watchCompassID);
        watchCompassID = null;
    }

}


function cancelThunderball() {
    inc = max;
    bigWin = true;
}

function thunderballWithRefresh() {
var delay = 0;

    inc = 0;
    bigWin = false;

    function timeoutloop() {
        runThunderball();
        inc++;

        if (bigWin === false) {
            setTimeout(timeoutloop, delay);
        } else {
            document.getElementById("Reset").disabled = false;
            document.getElementById("GoRefreshButton").disabled = false;
        }
    }

    document.getElementById("Reset").disabled = true;
    document.getElementById("GoRefreshButton").disabled = true;
    setTimeout(timeoutloop, delay);
}

function thunderballNoRefresh() {

    for (inc = 0; inc < max; inc ++) {
        runThunderball();
    }
}

function thunderballReset() {
    document.getElementById('five_thunderball').innerHTML = '0';
    document.getElementById('five').innerHTML = '0';
    document.getElementById('four_thunderball').innerHTML = '0';
    document.getElementById('four').innerHTML = '0';
    document.getElementById('three_thunderball').innerHTML = '0';
    document.getElementById('three').innerHTML = '0';
    document.getElementById('two_thunderball').innerHTML = '0';
    document.getElementById('one_thunderball').innerHTML = '0';
    document.getElementById('zero_thunderball').innerHTML = '0';

    document.getElementById('five_thunderball_prize').innerHTML = '0';
    document.getElementById('five_prize').innerHTML = '0';
    document.getElementById('four_thunderball_prize').innerHTML = '0';
    document.getElementById('four_prize').innerHTML = '0';
    document.getElementById('three_thunderball_prize').innerHTML = '0';
    document.getElementById('three_prize').innerHTML = '0';
    document.getElementById('two_thunderball_prize').innerHTML = '0';
    document.getElementById('one_thunderball_prize').innerHTML = '0';
    document.getElementById('zero_thunderball_prize').innerHTML = '0';

    document.getElementById('total_win').innerHTML = '0';
    document.getElementById('total_spent').innerHTML = '0';
    document.getElementById('time_gone').innerHTML = "&nbsp";

    linesDone = 0;
    drawsDone = 0;
    bigWin = false;
}


function runThunderball() {
    var maxLines = 50;
    var drawLine, drawThunderball;      // represents the drawn numbers
    var matchLine, matchThunderball;    // represents a line
    var numbersMatched = 0;             // number of matches in the matchLine
    var thunderballMatch = false;       // if the thunderball was matched or not
    var i;

    drawLine = getRandomNumbers(39, 5).sort(function(a, b){return a-b});
    drawThunderball = getRandomNumbers(14, 1);

    for (i = 0; i < maxLines; i++) {
        linesDone++;
        matchLine = getRandomNumbers(39, 5).sort(function(a, b){return a-b});
        matchThunderball = getRandomNumbers(14, 1);

        // Determine if a line is a match with the draw.
        numbersMatched = matchedNumberCount(drawLine, matchLine);
        thunderballMatch = matchedNumberCount(drawThunderball, matchThunderball) === 1;

        var elem = null;
        var elem_prize = null;
        var win = 0;
        switch(numbersMatched) {
            case 5:
                if (thunderballMatch === true) {
                    // 5 main numbers + the Thunderball	£500,000
                    elem = document.getElementById('five_thunderball');
                    elem_prize = document.getElementById('five_thunderball_prize');
                    bigWinner();
                    bigWin = true;
                    win = 500000;
                } else {
                    // 5 main numbers	£5,000
                    elem = document.getElementById('five');
                    elem_prize = document.getElementById('five_prize');
                    win = 5000;
                }
                break;
            case 4:
                if (thunderballMatch === true) {
                    // 4 main numbers + the Thunderball	£250
                    elem = document.getElementById('four_thunderball');
                    elem_prize = document.getElementById('four_thunderball_prize');
                    win = 250;
                } else {
                    // 4 main numbers	£100
                    elem = document.getElementById('four');
                    elem_prize = document.getElementById('four_prize');
                    win = 100;
                }
                break;
            case 3:
                if (thunderballMatch === true) {
                    // 3 main numbers + the Thunderball	£20
                    elem = document.getElementById('three_thunderball');
                    elem_prize = document.getElementById('three_thunderball_prize');
                    win = 20;
                } else {
                    // 3 main numbers	£10
                    elem = document.getElementById('three');
                    elem_prize = document.getElementById('three_prize');
                    win = 10;
                }
                break;
            case 2:
                if (thunderballMatch === true) {
                    // 2 main numbers + the Thunderball	£10
                    elem = document.getElementById('two_thunderball');
                    elem_prize = document.getElementById('two_thunderball_prize');
                    win = 10;
                }
                break;
            case 1:
                if (thunderballMatch === true) {
                    // 1 main numbers + the Thunderball	£5
                    elem = document.getElementById('one_thunderball');
                    elem_prize = document.getElementById('one_thunderball_prize');
                    win = 5;
                }
                break;
            case 0:
                if (thunderballMatch === true) {
                    // 0 main numbers + the Thunderball	£3
                    elem = document.getElementById('zero_thunderball');
                    elem_prize = document.getElementById('zero_thunderball_prize');
                    win = 3;
                }
                break;
        }

        if (elem !== null) {
            var winCount, winTotal;

            winCount = parseInt(elem.innerHTML) + 1;
            elem.innerHTML = winCount;

            elem_prize.innerHTML = formatDollar(winCount * win);

            winTotal = parseInt(document.getElementById('five_thunderball').innerHTML) * 500000;
            winTotal += parseInt(document.getElementById('five').innerHTML) * 5000;
            winTotal += parseInt(document.getElementById('four_thunderball').innerHTML) * 250;
            winTotal += parseInt(document.getElementById('four').innerHTML) * 100;
            winTotal += parseInt(document.getElementById('three_thunderball').innerHTML) * 20;
            winTotal += parseInt(document.getElementById('three').innerHTML) * 10;
            winTotal += parseInt(document.getElementById('two_thunderball').innerHTML) * 10;
            winTotal += parseInt(document.getElementById('one_thunderball').innerHTML) * 5;
            winTotal += parseInt(document.getElementById('zero_thunderball').innerHTML) * 3;
            document.getElementById('total_win').innerHTML = formatDollar(winTotal);
        }

        document.getElementById('total_spent').innerHTML = formatDollar(linesDone * costPerLine);
    }
    drawsDone++;
    setDrawsDone(drawsDone);
}

function setDrawsDone(drawsDone) {
    // each drawsDone is 1 month.
    var years = parseInt(drawsDone / 12);
    var remainingMonths = drawsDone % 12;
    var msg = "";

    if (years > 0) {
        if (years === 1) {
            msg = "1 Year ";
        } else {
            msg = years + " Years ";
        }
    }
    msg = msg + remainingMonths + " months";

    document.getElementById('time_gone').innerHTML = msg;

}

function formatDollar(num) {
    var p = num.toFixed(0).split(".");
    return "£" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "") //+ "." + p[1];
}

function getRandomNumbers(maxNumber, numbersInDraw) {
    var numbersAvailable = [], numbersPicked = [];
    var generatedIndex;
    var i;

    // Build a list of numbers we have in the draw.
    for (i = 0; i < maxNumber; i++) {
        numbersAvailable.push( i + 1 );
    }

    for (i = 0; i < numbersInDraw; i++) {
        // Get a random index to our numbersAvailable array.
        generatedIndex = Math.floor((Math.random() * (numbersAvailable.length - 1) ) + 1);

        // Get the number from array with the random index and add it to our numbersPicked array
        numbersPicked.push(numbersAvailable[generatedIndex]);

        // Remove that index so we don't pick it again next time.
        numbersAvailable.splice(generatedIndex, 1);
    }
    return numbersPicked;
}

function matchedNumberCount(drawLine, matchLine) {
    var i, j;
    var matchCount = 0;

    for (i = 0; i < drawLine.length; i++) {

        //if (matchLine.indexOf(drawLine[i]) !== -1) {
        //    matchCount++;
        //}

        // Now see if the number is in the matchLine
        for (j = 0; j < matchLine.length; j++) {
            if (drawLine[i] === matchLine[j]) {
                matchCount++;
                break;
            }
        }
    }
    return matchCount;
}