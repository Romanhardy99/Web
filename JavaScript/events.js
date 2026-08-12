function setImage() {
    let filename = document.getElementById("image-file");
    let file = filename.files[0];
    document.getElementById("image").src = URL.createObjectURL(file);
}
function setBackgroundColor() {
    document.body.style.backgroundColor = document.getElementById("background-color").value;
}
function setForegroundColor(e) {
    document.body.style.color = e.target.value;
}
function setColor(e) {
    console.log(e.target)
    console.log(document.body.style['backgroundColor']);
    console.log(document.body.style['background-color']);

    document.body.style[e.target.id === 'background-color' ? 'backgroundColor' : 'color'] = e.target.value;
    // (e.target.id === "background-color" ? document.body.style.backgroundColor : document.body.style.color;
    /*if(e.target.id === "background-color")
        document.body.style.backgroundColor = e.target.value;
    else
    document.body.style.color = e.target.value;*/
}
console.log(true === 1);
document.addEventListener("mousemove", trackMouse);
function trackMouse(e) {
    document.getElementById("mouse-coords").innerHTML = `Mouse: X = ${e.clientX}, Y = ${e.clientY}`;
}

document.getElementById("switch-background").addEventListener("click", switchBackground);
function switchBackground(e) {
    // console.log(e.target.id);
    // console.log(e.target.src);
    // e.target.src = (e.target.src.includes('moon.png') ? 'sun.png' : 'moon.png');
    document.body.className = document.body.className === 'dark' ? 'light' : 'dark';
}
function setTransitionTime(e) {
    document.documentElement.style.setProperty('--transition-time', `${e.target.value}s`);
    document.getElementById('transition-time-value').textContent = `${e.target.value}c`;
}

///////////////////////////////////////////////////////////////////////////////////////////

function addLeadingZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
}
tick_timer();
function tick_timer() {
    let time = new Date();
    document.getElementById("full-time").innerHTML = time.toString();

    document.getElementById("hours").innerHTML =        addLeadingZero(time.getHours());
    document.getElementById("minutes").innerHTML =      addLeadingZero(time.getMinutes());
    document.getElementById("seconds").innerHTML =      addLeadingZero(time.getSeconds());

    document.getElementById("years").innerHTML =        addLeadingZero(time.getFullYear());
    document.getElementById("months").innerHTML =        addLeadingZero(time.getMonth() + 1);
    document.getElementById("days").innerHTML =          addLeadingZero(time.getDate());

    document.getElementById("day-of-week").innerHTML = time.toLocaleDateString("ru", { weekday: 'long' });

    document.getElementById("current-date").style.visibility = document.getElementById("show-date").checked ? "visible" : "hidden";
    document.getElementById("day-of-week").style.visibility = document.getElementById("show-weekday").checked ? "visible" : "hidden";

    setTimeout(tick_timer, 100);
}

document.getElementById("btn-start").addEventListener("click", startCountdownTimer);
function startCountdownTimer() {
    let element = document.createElement("li");
    element.innerHTML = "Element";
    document.getElementById("construct").append(element);

    //append() - добавляет указанный элемент  разметки перед закрывающим дескриптором;
    //prepend() - добавляет указанный элемент разметки  после открывающего дескриптора;
    //before() - добавляет указанный элемент  разметки перед открывающим дескриптором;
    //after() - добавляет указанный элемент  разметки после закрывающего дескриптора;

    //////////////////////////////////////////////////
    let targetDateControl = document.getElementById("target-date");
    let targetTimeControl = document.getElementById("target-time");
    let btnStart = document.getElementById("btn-start");
    if (btnStart.value === "Start") {
        btnStart.value = "Stop";
        targetDateControl.disabled = targetTimeControl.disabled = true;
        resetDisplay();
        tickCountdown();
    }
    else {
        btnStart.value = "Start";
        targetDateControl.disabled = targetTimeControl.disabled = false;
       // clearTimeout(tickCountdown);
    }
}

function tickCountdown()
{
    if (document.getElementById("btn-start").value === "Start") return;
    let now = new Date();

    let targetDate = document.getElementById("target-date").valueAsDate;
    let targetTime = document.getElementById("target-time").valueAsDate;

    //выравниваем часовой пояс:
    targetDate.setHours(targetDate.getHours() + targetDate.getTimezoneOffset()/60);
    targetTime.setHours(targetTime.getHours() + targetTime.getTimezoneOffset()/60);

    //синхронизируем целевую дату и время:
    targetTime.setFullYear(targetDate.getFullYear());
    targetTime.setMonth(targetDate.getMonth());
    targetTime.setDate(targetDate.getDate());

    let timestamp = Math.abs(targetTime - now);

    let duration = Math.trunc(timestamp / 1000);

    document.getElementById("target-date-value").innerHTML = targetDate;
    document.getElementById("target-time-value").innerHTML = targetTime;
    document.getElementById("timezone").innerHTML = targetTime.getTimezoneOffset();
    document.getElementById("duration").innerHTML = duration;
    document.getElementById("timestamp").innerHTML = timestamp;

    const SECONDS_PER_MINUTE = 60;
    const SECONDS_PER_HOUR = 3600;
    const SECONDS_PER_DAY = 86400;
    const SECONDS_PER_WEEK = SECONDS_PER_DAY * 7;
    const DAYS_PER_MONTH = 365.25 / 12;
    const SECONDS_PER_MONTH = SECONDS_PER_DAY * DAYS_PER_MONTH;
    const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365 + SECONDS_PER_HOUR * 6;

    let time_of_day = duration % SECONDS_PER_DAY;
    let date = duration - time_of_day; //Math.trunc(duration / SECONDS_PER_DAY) * SECONDS_PER_DAY;

    let hours_block = document.getElementById("hours-unit").parentElement;
    let years = Math.trunc(date / SECONDS_PER_YEAR);
    if (years > 0) {
        date = date % SECONDS_PER_YEAR;
        let years_unit = document.getElementById("years-unit");
        if (years_unit == null) {
            let years_block = createTimeBlock("years", years);
            hours_block.before(years_block);
        }
        else years_unit.innerHTML = addLeadingZero(years);
    }
    else removeTimeBlock("years");

    let months = Math.trunc(date / SECONDS_PER_MONTH);
    if (months > 0) {
        date = date % SECONDS_PER_MONTH;
        let months_unit = document.getElementById("months-unit");
        if (months_unit == null) {
            months_block = createTimeBlock("months", months);
            hours_block.before(months_block);
        }
        else months_unit.innerHTML = addLeadingZero(months);
    }
    else removeTimeBlock("months");

    let weeks = Math.trunc(date / SECONDS_PER_WEEK);
    if (weeks > 0) {
        date = date % SECONDS_PER_WEEK;
        let weeks_unit = document.getElementById("weeks-unit");
        if (weeks_unit == null)
            hours_block.before(createTimeBlock("weeks", weeks));
        else weeks_unit.innerHTML = addLeadingZero(weeks);
    }
    else removeTimeBlock("weeks");

    let days = Math.trunc(date / SECONDS_PER_DAY);
    if (days > 0) {
        date = date % SECONDS_PER_DAY;
        let days_unit = document.getElementById("days-unit");
        if (days_unit == null)
            hours_block.before(createTimeBlock("days", days));
        else days_unit.innerHTML = addLeadingZero(days);
    }
    else removeTimeBlock("days");


    document.getElementById("hours-unit").innerHTML = addLeadingZero(Math.trunc(time_of_day / SECONDS_PER_HOUR));
    time_of_day = time_of_day % SECONDS_PER_HOUR;
    document.getElementById("minutes-unit").innerHTML = addLeadingZero(Math.trunc(time_of_day / SECONDS_PER_MINUTE));
    document.getElementById("seconds-unit").innerHTML = addLeadingZero(time_of_day % SECONDS_PER_MINUTE);
    

    setTimeout(tickCountdown, 100);
}
function createTimeBlock(name, value) {
    let time_block = document.createElement("div");
    time_block.className = "time-block";

    let unit = document.createElement("div");
    unit.id = `${name}-unit`;
    unit.className = "time-unit";
    unit.innerHTML = addLeadingZero(value);

    let marker = document.createElement("div");
    marker.id = `${name}-marker`;
    marker.className = "time-marker";
    marker.innerHTML = name;

    time_block.prepend(unit);
    time_block.append(marker);

    return time_block;

    //append() - добавляет указанный элемент  разметки перед закрывающим дескриптором;
    //prepend() - добавляет указанный элемент разметки  после открывающего дескриптора;
    //before() - добавляет указанный элемент  разметки перед открывающим дескриптором;
    //after() - добавляет указанный элемент  разметки после закрывающего дескриптора;
}

function removeTimeBlock(name) {
    let unit = document.getElementById(`${name}-unit`);
    if (unit != null) {
        let block = unit.parentElement;
        let display = block.parentElement;
        display.removeChild(block);
    }
}

function resetDisplay() {
    let display = document.getElementById("display");
    while (display.children[0].children[0].id != "hours-unit");
        display.children[0].remove();
}