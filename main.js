let hours;
let mayType = true;
let fileName;
async function e() {
    const times = await fetch('times.json');
    const obj = await times.json();
    searchBar.addEventListener("input", () => { if (searchBar.value !== '') { search(obj); } else { emptiedSearch(); } });
    clearButton.addEventListener("click", () => { searchBar.value = ''; emptiedSearch(); });
    buttonContainer.addEventListener("click", (e) => { if (e.target.textContent !== currentMap) { buttonClicked(e); } });
    map.on('draw:created', (e) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
        timerOverlay(dateIn(hours), layer);
        saveCookie(hours, layer, currentMap);

    });
    /*
    map.on('draw:edited', function (event) {
        let layers = event.layers;
        layers.eachLayer(function (layer) {
            let id = layer._leaflet_id;
            timers[id].tooltip.setLatLng(layer.getBounds().getCenter());
        });
    });
    */
}
function buttonClicked(e) {
    fileName = e.target.getAttribute('fileName');
    if (fileName !== currentMap) {
        hours = parseInt(e.target.getAttribute('hours'));
        switchMap(fileName);
        map.addControl(drawControl);
        const cookieData = Cookies.get();
        if (Object.keys(cookieData).length !== 0) {
            arrayOfArrays = getCookie(cookieData);
            for (array in arrayOfArrays) {
                [layer, cookieMap, futureDate] = arrayOfArrays[array];
                if (cookieMap == currentMap) {
                    drawnItems.addLayer(layer);
                    timerOverlay(futureDate, layer);
                }
            }
        }
        typed(fileName);
    }
}
function emptiedSearch() {
    switchMap('teyvat.png', '');
    typed();
    buttonContainer.innerHTML = '';
    map.removeControl(drawControl);
    drawnItems.clearLayers();
    deleteTimers();
}
function typed(file) {
    console.log(file, currentMap);
    if (currentMap !== 'teyvat.png' && mayType) {
        timeToRespawnBox.style.display = 'block';
        mayType = false;
        let typedText = new Typed('#respawnHoursText', {
            strings: [`Respawns in <b>${hours} H<b>`, ''],
            typeSpeed: 50,
            backSpeed: 25,
            onStringTyped: (arrayPos, self) => {
                // Pause Typed
                self.stop();
                searchBar.addEventListener("input", () => { if (searchBar.value == '') { self.start(); } });
                buttonContainer.addEventListener("click", () => { if (file !== currentMap) { self.start(); } });
                clearButton.addEventListener("click", () => { self.start(); });
            },
            onComplete: (self) => {
                // Destroy Typed instance once backspacing is done
                self.destroy();
                mayType = true;
                timeToRespawnBox.style.display = 'none';
                typed(currentMap);
            },
        });
    }
}
e();
