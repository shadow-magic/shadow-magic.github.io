window.addEventListener('DOMContentLoaded', (event) => {
    const searchBar = document.getElementById('searchBar');
    const buttonsContainer = document.getElementById('buttonContainer');
    const clearButton = document.getElementById('clearButton');

    searchBar.addEventListener('input', (event) => {
        const searchValue = event.target.value.trim().toLowerCase();
        buttonsContainer.innerHTML = '';

        if (searchValue !== '') {
            // Perform search and create buttons

            const filteredFiles = imageFiles.filter(file => file.toLowerCase().includes(searchValue));

            filteredFiles.forEach(file => {
                const fileName = file.replace(/\.[^/.]+$/, ''); // Remove file extension
                const button = document.createElement('button');
                button.textContent = fileName.replace(/\b\w/g, c => c.toUpperCase()); // Capitalize first letter of each word
                button.addEventListener('click', () => {
                    switchImage(file);
                });
                buttonsContainer.appendChild(button);
            });

            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
            switchImage('teyvat.png'); // Display default image
        }
    });

    clearButton.addEventListener('click', () => {
        searchBar.value = '';
        buttonsContainer.innerHTML = '';
        clearButton.style.display = 'none';
        switchImage('teyvat.png'); // Display default image
        deleteSelectedAreaAndTimer()
        map.removeControl(drawControl);
    });

    function switchImage(fileName) {
        //const imagePath = `maps/${fileName}`; // Assuming images are in a folder named "maps"
        var image = L.imageOverlay(`maps/${fileName}`, bounds).addTo(map);
        deleteSelectedAreaAndTimer()
        if (fileName != 'teyvat.png') {
            map.addControl(drawControl);
        }
    }

    switchImage('teyvat.png'); // Display default image on page load

});
