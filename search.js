//adds favorited (all) and previously visted (3?) buttons. upon typing replace both (or only previously visited?) with filtered buttons
const searchBar = document.getElementById('searchBar');
const buttonContainer = document.getElementById('buttonContainer');
const clearButton = document.getElementById('clearButton');
function search(obj) {
    function getAllValues(object) {
        for (let key in object) {
            if (Array.isArray(object[key])) {
                const array = object[key];
                array.forEach((map) => { console.log(key, map); addButton(map, key) });
            }
        }
    }
    buttonContainer.innerHTML = ""; // Clear previous buttons
    getAllValues(obj);
}
function showVisited(obj) {
    // buttons (maps) with cookie data are displayed when search bar is empty (cleared)
    const cookieData = Cookies.get();
    if (Object.keys(cookieData).length !== 0) {
        arrayOfArrays = getCookie(cookieData);
        for (array in arrayOfArrays) {
            [layer, cookieMap, futureDate] = arrayOfArrays[array];
            function getAllValues(object) {
                for (let key in object) {
                    if (Array.isArray(object[key])) {
                        const array = object[key];
                        array.forEach((map) => { if (map == cookieMap) { addButton(cookieMap, key, 'fa-regular fa-clock') } });
                    }
                }
            }
            getAllValues(obj);
        }
    }
}
function addButton(fileName, hours, iconClass) {
    const searchTerm = searchBar.value.toLowerCase();
    if (fileName.toLowerCase().includes(searchTerm)) {
        const button = document.createElement("button");
        if (iconClass !== undefined) { const icon = document.createElement('i'); icon.className = iconClass; button.appendChild(icon); }
        const text = document.createTextNode(' ' + capitalizeAndRemoveExtension(fileName));
        button.appendChild(text);
        button.setAttribute('fileName', fileName);
        button.setAttribute('hours', hours);
        buttonContainer.appendChild(button);
    }
}
function capitalizeAndRemoveExtension(filename) {
    const capitalized = filename.replace(/\..+$/, '')
        .replace(/(^|\s)\S/g, c => c.toUpperCase());
    return capitalized;
}
