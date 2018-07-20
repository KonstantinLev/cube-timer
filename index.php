<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/main.css">
    <title>Rubik's Timer</title>
</head>
<body>

    <div class="wrap">

        <div class="results">
            <h3 class="center">Статистика:</h3>
            <div class="statistics">
                ср. время на сборку: <b class="average"></b>
            </div>
            <h3 class="center">Результаты:</h3>
            <div class="results-block"></div>
        </div>

        <div class="block">

            <div class="block-timer">
                <h1>Rubik's Timer! - <span class="action default"></span></h1>
                <div class="time">
                    <span class="min">00</span>
                    <span class="divide">:</span>
                    <span class="sec">00</span>
                    <span class="divide">:</span>
                    <span class="m_sec">000</span>
                </div>
                <div class="block-control">
                    <button class="toggle-results">Скрыть результаты</button>
                    <button class="clear-results">Очистить результаты</button>
                </div>
            </div>
        </div>

    </div>

    <script src="js/jquery.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>