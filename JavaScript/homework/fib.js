/* ЗАДАНИЕ 1. Возведение числа в степень */

// Возводит base в степень exp без использования Math.pow.
// Отрицательная степень: a^(-n) = 1 / a^n
function power(base, exp) {
    if (exp === 0) return 1;                 // любое число в нулевой степени = 1

    var negative = exp < 0;
    if (negative) exp = -exp;

    var result = 1;
    for (var i = 0; i < exp; i++) {
        result = result * base;
    }

    return negative ? 1 / result : result;
}

function showPower() {
    var base = parseFloat(document.getElementById('base').value);
    var exp = parseInt(document.getElementById('exp').value, 10);
    var out = document.getElementById('out1');

    if (isNaN(base) || isNaN(exp)) {
        return print(out, 'Введите корректные числа.', true);
    }
    if (base === 0 && exp < 0) {
        return print(out, 'Ноль нельзя возводить в отрицательную степень (деление на ноль).', true);
    }

    var result = power(base, exp);
    print(out, '<b>' + base + '<sup>' + exp + '</sup> = ' + result + '</b>');
}


/* ЗАДАНИЕ 2. Ряд Фибоначчи до указанного предела */

// Возвращает массив членов ряда Фибоначчи, не превышающих limit.
function fibToLimit(limit) {
    var series = [];
    var a = 0, b = 1;

    while (a <= limit) {
        series.push(a);
        var next = a + b;   // следующий член ряда — сумма двух предыдущих
        a = b;
        b = next;
    }

    return series;
}

function showFibToLimit() {
    var limit = parseInt(document.getElementById('limit').value, 10);
    var out = document.getElementById('out2');

    if (isNaN(limit)) {
        return print(out, 'Введите целое число.', true);
    }
    if (limit < 0) {
        return print(out, 'Предел должен быть неотрицательным: ряд начинается с 0.', true);
    }

    var series = fibToLimit(limit);
    print(out, 'Ряд Фибоначчи до ' + limit + ':' + renderSeries(series) +
        '<div class="count">Всего членов: ' + series.length + '</div>');
}


/* ЗАДАНИЕ 3. Заданное количество чисел ряда Фибоначчи  */

// Возвращает массив из n первых членов ряда Фибоначчи.
function fibCount(n) {
    var series = [];
    var a = 0, b = 1;

    for (var i = 0; i < n; i++) {
        series.push(a);
        var next = a + b;
        a = b;
        b = next;
    }

    return series;
}

function showFibCount() {
    var n = parseInt(document.getElementById('count').value, 10);
    var out = document.getElementById('out3');

    if (isNaN(n)) {
        return print(out, 'Введите целое число.', true);
    }
    if (n < 0) {
        return print(out, 'Количество не может быть отрицательным.', true);
    }
    if (n > 500) {
        return print(out, 'Слишком много — введите не больше 500.', true);
    }

    var series = fibCount(n);
    if (series.length === 0) {
        return print(out, 'Нечего выводить: запрошено 0 чисел.');
    }

    print(out, 'Первые ' + n + ' чисел ряда Фибоначчи:' + renderSeries(series) +
        '<div class="count">Последний член: ' + series[series.length - 1] + '</div>');
}

/* Вспомогательные функции вывода  */
function print(el, html, isError) {
    el.innerHTML = html;
    el.className = 'out show' + (isError ? ' error' : '');
}

function renderSeries(arr) {
    if (arr.length === 0) return '<div class="count">Ряд пуст.</div>';
    var html = '<div class="series">';
    for (var i = 0; i < arr.length; i++) {
        html += '<span class="num">' + arr[i] + '</span>';
    }
    return html + '</div>';
}