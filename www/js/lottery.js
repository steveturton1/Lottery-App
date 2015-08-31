/**
 * Created by Steve on 29/08/2015.
 */

function thunderBall() {
    var maxLines = 50;
    var drawLine, drawThunderball;      // represents the drawn numbers
    var matchLine, matchThunderball;    // represents a line
    var numbersMatched = 0;             // number of matches in the matchLine
    var thunderballMatch = false;       // if the thunderball was matched or not
    var i;

    drawLine = getRandomNumbers(39, 5).sort(function(a, b){return a-b});
    drawThunderball = getRandomNumbers(14, 1);
    document.getElementById('BLAG').innerHTML = "YEP";

    for (i = 0; i < maxLines; i++) {
        matchLine = getRandomNumbers(39, 5).sort(function(a, b){return a-b});
        matchThunderball = getRandomNumbers(14, 1);

        // Determine if a line is a match with the draw.
        numbersMatched = matchedNumberCount(drawLine, matchLine);
        thunderballMatch = matchedNumberCount(drawThunderball, matchThunderball) === 1;

        switch(numbersMatched) {
            case 5:
                if (thunderballMatch === true) {
                    // 5 main numbers + the Thunderball	£500,000
                } else {
                    // 5 main numbers	£5,000
                }
                break;
            case 4:
                if (thunderballMatch === true) {
                    // 4 main numbers + the Thunderball	£250
                } else {
                    // 4 main numbers	£100
                }
                break;
            case 3:
                if (thunderballMatch === true) {
                    // 3 main numbers + the Thunderball	£20
                } else {
                    // 3 main numbers	£10
                }
                break;
            case 2:
                if (thunderballMatch === true) {
                    // 2 main numbers + the Thunderball	£10
                }
                break;
            case 1:
                if (thunderballMatch === true) {
                    // 1 main numbers + the Thunderball	£5
                }
                break;
            case 0:
                if (thunderballMatch === true) {
                    // 0 main numbers + the Thunderball	£3
                }
                break;
        }
    }
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