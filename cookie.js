// Save the drawn layer and additional values in a cookie
function saveCookie(countdown, layer, map) {
    const geoJSON = layer.toGeoJSON();
    const futureTime = dateIn(countdown); //returns date object
    const dateString = futureTime.toISOString();
    const data = {
        layer: geoJSON,
        map: map
    };
    Cookies.set(dateString, JSON.stringify(data), { expires: futureTime });
}
// Load the drawn layer and additional values from a cookie
function getCookie(cookieData) {
    let layerData;
    let geojsonLayer;
    let arrayOfArrays = [];
    for (let key in cookieData) {
        layerData = JSON.parse(Cookies.get(key));
        geojsonLayer = L.geoJson(layerData.layer);
        const currentMap = layerData.map;
        let array = [geojsonLayer, currentMap, key];
        arrayOfArrays.push(array);
    }
    return arrayOfArrays;
}
//get and retrieve countdown
function dateIn(hours) {
    let time = new Date();
    time.setHours(time.getHours() + hours);
    return time;
}
