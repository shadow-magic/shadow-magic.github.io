// Save the drawn layer and additional values in a cookie
function saveCookie(countdown, drawnLayer, map) {
    const geoJSON = drawnLayer.toGeoJSON();
    const jsonStr = JSON.stringify(geoJSON);
    const data = {
        countdown: countdown,
        drawnLayer: jsonStr,
        map: map
    };

    Cookies.set('mapData', JSON.stringify(data));
}
// Load the drawn layer and additional values from a cookie
function getCookie(cookieData) {

    const data = JSON.parse(cookieData);
    console.log(data);
    const map = data.map;
    const geoJSON = JSON.parse(data.drawnLayer);
    drawnLayer = L.geoJSON(geoJSON);
    return [drawnLayer, map];

}
//get and retrieve countdown
function countdownFinishedIn(hours) {
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + hours * 60 * 60 * 1000);
    return futureTime;
}
