//displays timers that move with drawn layers. timeUntil(futureDate) will be passed once per minute for each timer (alternatively call it once and subtract a minute from all timers every minute) whose layer will be associated with it using layerID.
let timers = {};
function timerOverlay(futureDate, layerId) {
    console.log(futureDate, id);
    /*
    let timerElement = document.createElement("div");
    timerElement.id = 'timer-' + id;
    timerElement.style.position = "absolute";
    timerElement.innerHTML = "00:00";
    document.body.appendChild(timerElement);
    timers[id] = {
        startTime: Date.now(),
        element: timerElement,
        updateTimer: function () {
            let elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
            let minutes = Math.floor(elapsedSeconds / 60);
            let seconds = elapsedSeconds - minutes * 60;
            this.element.innerHTML = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
        }
    };
    layer.on('move', function () {
        let position = map.latLngToContainerPoint(layer.getBounds().getCenter());
        timers[id].element.style.left = position.x + "px";
        timers[id].element.style.top = position.y + "px";
    });

    setInterval(timers[id].updateTimer.bind(timers[id]), 1000);
    */
}
function timeUntil(dateString) {
    const futureTime = new Date(dateString);
    const currentTime = new Date();
    const timeDifference = futureTime - currentTime;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return [hours, minutes];
}
