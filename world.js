// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the country input field, lookup button, and result div
    const countryInput = document.getElementById('country');
    const lookupButton = document.getElementById('lookup');
    const resultDiv = document.getElementById('result');

    // Add a click event listener to the "Lookup" button
    lookupButton.addEventListener('click', function() {
        // Get the value entered in the country input field
        const country = countryInput.value.trim();

        // If the input is empty, do nothing
        if (country === '') {
            resultDiv.innerHTML = '<p>Please enter a country name.</p>';
            return;
        }

        // Create a new XMLHttpRequest (AJAX request)
        const xhr = new XMLHttpRequest();

        // Set up the request
        xhr.open('GET', `world.php?country=${encodeURIComponent(country)}`, true);

        // Set the response type to JSON (if world.php returns JSON data)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Handle the response once the request is complete
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Parse the response (assuming world.php returns HTML or JSON)
                resultDiv.innerHTML = xhr.responseText;
            } else {
                // Handle errors 
                resultDiv.innerHTML = '<p>Error retrieving data. Please try again later.</p>';
            }
        };

        // Handle network errors
        xhr.onerror = function() {
            resultDiv.innerHTML = '<p>Network error. Please check your connection.</p>';
        };

        // Send the request
        xhr.send();
    });
});
