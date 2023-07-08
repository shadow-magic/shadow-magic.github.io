async function e() {
    const times = await fetch('times.json');
    const obj = await times.json();
    let hours;
    searchBar.addEventListener("input", () => { if (searchBar.value !== '') { search(obj); } else { switchMap('teyvat.png'); buttonContainer.innerHTML = ''; map.removeControl(drawControl); drawnItems.clearLayers(); } });
    buttonContainer.addEventListener("click", (e) => { buttonClicked(e) });
    map.on('draw:created', (e) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
        //start countdown overlay
        saveCookie(hours, drawnItems, currentMap);
    });
}
function buttonClicked(e) {
    switchMap(e.target.textContent);
    map.addControl(drawControl);
    hours = e.target.getAttribute('hours');
    const cookieData = Cookies.get('mapData');
    if (cookieData) {
        const [drawnLayer, map] = getCookie(cookieData);
        if (currentMap == map) {
            drawnItems.addLayer(drawnLayer);
        }
    }
}
e();
