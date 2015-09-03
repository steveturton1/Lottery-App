/**
 * Created by Steve on 29/08/2015.
 */

var inc = 0, max = 10000;
var linesDone = 0;
var costPerLine = 1;

function cancelThunderball() {
    inc = max;
}

function thunderballWithRefresh() {
var delay = 0;

    inc = 0;

    function timeoutloop() {
        runThunderball();

        if (++inc < max) {
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

    linesDone = 0;
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