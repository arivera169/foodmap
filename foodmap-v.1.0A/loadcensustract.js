var request = new XMLHttpRequest();
request.open('GET', 'censustract.json', true);

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        const dataList = document.getElementById('dataList');

        // Iterate over each item in the JSON data and add it to the list
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name; // Assuming each item has a 'name' property
            dataList.appendChild(listItem);
        });
    } else {
        // We reached our target server, but it returned an error
        console.error('Server returned an error:', request.status);
    }
};

request.onerror = function() {
    // There was a connection error of some sort
    console.error('Connection error while fetching data');
};

request.send();

request.send();
