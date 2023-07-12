//displays timers that move with drawn layers. timeUntil(futureDate) will be passed once per minute for each timer (alternatively call it once and subtract a minute from all timers every minute) whose layer will be associated with it using layerID.
let timers = {};
function timerOverlay(futureDate, layer) {
    let id = layer._leaflet_id; // get unique id of the layer
    timers[id] = {
        tooltip: L.tooltip({
            permanent: true,
            direction: "center",
            className: 'timer-tooltip'
        }).setContent(`${hours}:00`).setLatLng(layer.getBounds().getCenter()).addTo(map),
        updateTimer: function () {
            const [hours, minutes] = timeUntil(futureDate);
            this.tooltip.setContent(hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0"));
        }
    };
    layer.on('move', function () {
        timers[id].tooltip.setLatLng(layer.getBounds().getCenter());
    });
    setInterval(timers[id].updateTimer.bind(timers[id]), 1000);
}

// calculates hours and minutes until date in the future. receives date object iso string
function timeUntil(dateString) {
    const futureTime = new Date(dateString);
    const currentTime = new Date();
    const timeDifference = futureTime - currentTime;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return [hours, minutes];
}
