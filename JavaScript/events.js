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