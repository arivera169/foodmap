

  
        fetch('censustract.json')
            .then(response => response.json()) // Parse JSON response
            .then(data => {
                // Handle the JSON data
                const dataList = document.getElementById('dataList');

                // Iterate over each item in the JSON data and add it to the list
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item.name; // Assuming each item has a 'name' property
                    dataList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

