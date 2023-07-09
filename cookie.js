// Save the drawn layer and additional values in a cookie
function saveCookie(countdown, drawnLayer, map) {
    const geoJSON = drawnLayer.toGeoJSON();
    const jsonStr = JSON.stringify(geoJSON);
    const futureTime = dateIn(countdown);
    const data = {
        countdown: futureTime,
        drawnLayer: jsonStr,
        map: map
    };
    console.log(futureTime);
    Cookies.set('mapData', JSON.stringify(data));
}
// Load the drawn layer and additional values from a cookie
function getCookie(cookieData) {

    const data = JSON.parse(cookieData);
    const geoJSON = JSON.parse(data.drawnLayer);
    const drawnLayer = L.geoJSON(geoJSON);
    const map = data.map;
    const [hours, minutes] = timeUntil(data.countdown);
    return [drawnLayer, map, hours, minutes];

}
//get and retrieve countdown
function dateIn(hours) {
    const currentTime = new Date();
    const futureTime = new Date(currentTime + hours * 60 * 60 * 1000);
    // Convert the date object to a JSON string
    const jsonString = JSON.stringify(futureTime, (key, value) => {
        if (value instanceof Date) {
            return value.toISOString(); // Convert the date to ISO string format
        }
        return value;
    });
    console.log(jsonString);
    return jsonString;
}
function timeUntil(jsonString) {
    // Parse the JSON string back to a date object
    const parsedDate = JSON.parse(jsonString, (key, value) => {
        if (key === '' && typeof value === 'string') {
            return new Date(value); // Convert the ISO string back to a date object
        }
        return value;
    });
    console.log(parsedDate);
    const currentDate = new Date();
    const timeDifference = parsedDate - currentDate;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    console.log(hours, minutes);
    return [hours, minutes];

}