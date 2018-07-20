var startTimer = false;
var block = $('.time');
var act = $('.action');
var resultBlock = $('.results-block');
var startDate;
var timerID;

$(document).ready(function(){
    getResults();
});

/**
 * Show/hide result panel
 */
$('.toggle-results').click(function(){
    $('.results').toggle();
    if($('.results').is(':visible')){
        $(this).text('Скрыть результаты');
    } else {
        $(this).text('Показать результаты');
    }
    $(this).blur();
});

/**
 * clear all results
 */
$('.clear-results').click(function(){
    if(!startTimer){
        localStorage.clear();
        getResults();
    }
    $(this).blur();
});

/**
 * remove current result
 */
$(document).on('click', '.remove-result', function(){
    var result = getLS();
    result.sort(compareTime);
    result.splice($(this).data('index'), 1);
    setLS(result);
    getResults();
    resultBlock.find('div').removeClass('mark');
});


$(document).keyup(function(e){
    if(!startTimer){
        //space up
        if(e.which === 32) {
            start();
        }
    } else {
        startTimer = false;
    }
});

$(document).keydown(function(e){
    if(startTimer){
        //space down
        if(e.which === 32){
            finish();
        }
    } else {
        if(e.which === 32){
            keep();
        }
    }
});

function keep()
{
    block.find('.min').text('00');
    block.find('.sec').text('00');
    block.find('.m_sec').text('000');

    act.removeClass('red').addClass('default');
    act.text('ready...');
}

function start()
{
    startTimer = true;
    startDate = new Date();

    act.removeClass('default').addClass('green');
    act.text('GO!');

    timerID = setInterval(function () {
        var date = new Date() - startDate;
        var date2 = new Date(date);
        block.find('.min').text(('0' + date2.getMinutes()).slice(-2));
        block.find('.sec').text(('0' + date2.getSeconds()).slice(-2));
        block.find('.m_sec').text(('00' + date2.getMilliseconds()).slice(-3));
    }, 1);
}

function finish()
{
    clearInterval(timerID);

    var date = new Date() - startDate;
    var date2 = new Date(date);
    var min = ('0' + date2.getMinutes()).slice(-2);
    var sec = ('0' + date2.getSeconds()).slice(-2);
    var m_sec = ('0' + date2.getMilliseconds()).slice(-3);

    block.find('.min').text(min);
    block.find('.sec').text(sec);
    block.find('.m_sec').text(m_sec);

    var results = getLS();
    var time = Number(min+sec+m_sec);
    var value = min + ' : ' + sec + ' : ' + m_sec;
    results.push({'time': time, 'value': value});
    setLS(results);

    act.removeClass('green').addClass('red');
    act.text('stop');

    getResults();
}

function getResults()
{
    var results = getLS();
    var lastItem = results[results.length - 1];
    var text = '';
    results.sort(compareTime);
    results.forEach(function(e,i){
        var className = (e.time === lastItem.time) ? 'mark' : '';
        text += '<div class="' + className +'">';
        text += '<b>' + (i+1) + '</b>' + ' - ' + e.value;
        text += '<button data-index="' + i + '" class="remove-result">Х</button>';
        text += '</div>';
    });
    resultBlock.html(text);
    getStatistics();
}

function getStatistics()
{
    var results = getLS();
    if(results.length > 0){
        var sum = 0;
        results.forEach(function(e){
            sum += e.time;
        });
        var average = sum / results.length / 1000;
        $('.average').text(average.toFixed(3));
    } else{
        $('.average').text('0');
    }

}

function getLS()
{
    return localStorage['results'] === undefined ? []: JSON.parse(localStorage['results']);
}

function setLS(data)
{
    localStorage['results'] = JSON.stringify(data);
}

function compareTime(a,b)
{
    return a.time - b.time;
}
