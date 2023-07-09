let hours;
async function e() {
    const times = await fetch('times.json');
    const obj = await times.json();
    searchBar.addEventListener("input", () => { if (searchBar.value !== '') { search(obj); } else { emptiedSearch(); } });
    clearButton.addEventListener("click", () => { searchBar.value = ''; emptiedSearch(); });
    buttonContainer.addEventListener("click", (e) => { if (e.target.textContent !== currentMap) { buttonClicked(e); } });
    map.on('draw:created', (e) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
        //start countdown overlay
        saveCookie(hours, drawnItems, currentMap);
    });
}
function buttonClicked(e) {
    hours = e.target.getAttribute('hours');
    switchMap(e.target.textContent, hours);
    map.addControl(drawControl);
    const cookieData = Cookies.get('mapData');
    if (cookieData) {//need to change this logic
        const [drawnLayer, map, hours, minutes] = getCookie(cookieData);
        //console.log(drawnLayer, map, hours, minutes);
        if (currentMap == map) {
            drawnItems.addLayer(drawnLayer);
        }
    }
}
function emptiedSearch() { switchMap('teyvat.png'); buttonContainer.innerHTML = ''; map.removeControl(drawControl); drawnItems.clearLayers(); }
e();