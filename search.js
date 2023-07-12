//adds favorited (all) and previously visted (3?) buttons. upon typing replace both (or only previously visited?) with filtered buttons
const searchBar = document.getElementById('searchBar');
const buttonContainer = document.getElementById('buttonContainer');
const clearButton = document.getElementById('clearButton');
function search(obj) {
    function getAllValues(object) {
        for (let key in object) {
            if (Array.isArray(object[key])) {
                const array = object[key];
                array.forEach((map) => { addButton(map, key) });
            }
        }
    }
    buttonContainer.innerHTML = ""; // Clear previous buttons
    const searchTerm = searchBar.value.toLowerCase();
    function addButton(buttonName, key) {
        if (buttonName.toLowerCase().includes(searchTerm)) {
            const button = document.createElement("button");
            button.textContent = capitalizeAndRemoveExtension(buttonName);
            button.setAttribute('hours', key)
            buttonContainer.appendChild(button);
        }
    }
    getAllValues(obj);
}
function capitalizeAndRemoveExtension(filename) {
    const capitalized = filename.replace(/\..+$/, '')
        .replace(/(^|\s)\S/g, c => c.toUpperCase());
    return capitalized;
}