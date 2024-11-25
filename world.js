document.addEventListener('DOMContentLoaded', function() {
    // Get references to the input fields, lookup buttons, and result div
    const countryInput = document.getElementById('country');
    const lookupButton = document.getElementById('lookup');
    const lookupCitiesButton = document.getElementById('lookupCities'); // New button for cities
    const resultDiv = document.getElementById('result');

    // Add click event listener for country lookup
    lookupButton.addEventListener('click', function() {
        const country = countryInput.value.trim();
        if (country === '') {
            resultDiv.innerHTML = '<p>Please enter a country name.</p>';
            return;
        }

        fetchData(country, 'country');
    });

    // Add click event listener for city lookup
    lookupCitiesButton.addEventListener('click', function() {
        const country = countryInput.value.trim();
        if (country === '') {
            resultDiv.innerHTML = '<p>Please enter a country name.</p>';
            return;
        }

        fetchData(country, 'cities');
    });

    // Function to handle the AJAX request based on lookup type (country or cities)
    function fetchData(country, lookupType) {
        const xhr = new XMLHttpRequest();
        let url = `world.php?country=${encodeURIComponent(country)}`;

        // Modify the URL to include the lookup type (for cities lookup)
        if (lookupType === 'cities') {
            url += '&lookup=cities';
        }

        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Handle the response
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resultDiv.innerHTML = xhr.responseText; // Populate with the response
            } else {
                resultDiv.innerHTML = '<p>Error retrieving data. Please try again later.</p>';
            }
        };

        // Handle network errors
        xhr.onerror = function() {
            resultDiv.innerHTML = '<p>Network error. Please check your connection.</p>';
        };

        // Send the request
        xhr.send();
    }
});
