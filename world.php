<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    die();
}

$country = isset($_GET['country']) ? $_GET['country'] : '';
$lookup = isset($_GET['lookup']) ? $_GET['lookup'] : '';
$response = [];

if ($country !== '') {
    if ($lookup === 'cities') {
        // SQL query to join countries and cities and get the cities of the country
        $sql = "SELECT city.name AS city_name
                FROM cities
                JOIN countries ON cities.country_code = countries.code
                WHERE countries.name = :country";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':country', $country, PDO::PARAM_STR);
        $stmt->execute();

        $cities = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($cities) {
            $response['country'] = $country;
            $response['cities'] = array_column($cities, 'city_name');
        } else {
            $response['error'] = 'No cities found for this country.';
        }
    } else {
        // SQL query to get country data
        $sql = "SELECT name, continent, population
                FROM countries
                WHERE name = :country";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':country', $country, PDO::PARAM_STR);
        $stmt->execute();

        $countryData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($countryData) {
            $response = $countryData;
        } else {
            $response['error'] = 'Country not found.';
        }
    }
} else {
    $response['error'] = 'Please enter a valid country name.';
}

echo json_encode($response);
?>

