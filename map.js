/* 
    (!) All variables that start with VALUE_ or UPPERCASE are declared in <values.js>
*/

var map;
var currentPosition;
var currentRegion; /* The current region where the user is located */
var currentPositionMarker = null;
var idLocationChangeListener;
var markers = []; /* All markers displayed on map */
var markersArea = []; /* All polygons (markers area) on map */
var hide_markers = false; /* Boolean variable for hiding markers and polygons */
var infoWindowContent; /* Custom InfoWindow for marker */
var isValidData = true; /* The data received from database is valid? */
var isLocationTrackingEnabled = false; /* Is location tracking enabled or not */

var welcomeRegionMessage; /* The welcome box - when the user enters a region */
var welcomeMessageIsActive = false;
var welcomeMessageList = [];

var currentRegionWeather; /* The weather icon of the current zoomed region */
var locationTrackingIcon; /* Location tracking icon */
/* Buttons over map */
var hideMarkersBtn;
var enableLocationBtn;

/* Initialize and add the map */
function initMap() {
    /* The map, centered at VALUES_mapStartCoordinates, with variables from <values.js> */
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: VALUES_mapStartZoom,
        center: VALUES_mapStartCoordinates,
        mapTypeId: VALUES_mapStartType
    });
    currentPosition = new google.maps.LatLng(VALUES_NOT_UPDATED_LOCATION.lat, VALUES_NOT_UPDATED_LOCATION.lng);
    currentRegion = null; /* There is no region on map yet */
}

/* Initialize all elements from HTML file */
function initElements() {
    currentRegionWeather = document.getElementById("currentRegionWeather");
    hideMarkersBtn = document.getElementById("btnHideMarkers");
    locationTrackingIcon = document.getElementById("btnEnableLocationTracking");
    enableLocationBtn = document.getElementById("btnEnableLocation");
    welcomeRegionMessage = document.getElementById("welcomeRegion");
    /* Set icon for buttons */
    hideMarkersBtn.src = VALUES_hide_map_markers;
    locationTrackingIcon.src = VALUES_enable_location_tracking;
    enableLocationBtn.src = VALUES_enable_location;
    /* Hide the current region weather icon */
    currentRegionWeather.style.visibility = "hidden";
    /* Set a welcome message when the map is ready */
    setWelcome(true, undefined);
    /* Add listeners for map */
    /* When zoom is changed, draged or tilesloaded
        check if the minimum zoom is big enough to display region weather 
    */
    map.addListener("zoom_changed", onMapEvent, false);
    map.addListener("dragend", onMapEvent, false);
    map.addListener("tilesloaded", onMapEvent, false);
    /* Set currentPosition to a default coordinates - to detect if the location was moved or updated */
}

/* Initialize location tracking */
function enableLocation() {
    /* Check if location is already enabled */
    if (enableLocationBtn.src == VALUES_disabling_location) {
        /* Change the button text for enabling location */
        enableLocationBtn.src = VALUES_enable_location;
        /* Disable location tracking too - location can not be tracked without new coordinates */
        enableLocationTracking();
        /* Clear listener (location moving) */
        navigator.geolocation.clearWatch(idLocationChangeListener);
        /* Remove the location tracking marker */
        if (currentPositionMarker == null) return;
        currentPositionMarker.setMap(null);
        currentPositionMarker = null;
        return;
    }
    /* Set location tracking when user activate location */
    enableLocationTracking();
    /* Check if GEOlocation is available */
    if (navigator.geolocation) {
        /* GEOlocation is available and now get location */
        navigator.geolocation.getCurrentPosition(
            (position) => {
                /* Set listener for location change */
                idLocationChangeListener = navigator.geolocation.watchPosition(onLocationChange);
                onLocationChange(position);
                /* Change the button text for disabling command */
                enableLocationBtn.src = VALUES_disabling_location;
            },
            showError /* This function catches the errors */
        );
    } else {
        /* Browser doesn't support Geolocation */
        alert(STRING_CATCH_GEOLOCATION_NOT_SUPPORTED);
    }
}

/* Enable or disable location tracking - move or not the map acording to new position */
function enableLocationTracking() {
    /* Check if the location tracking is already enabled */
    if (isLocationTrackingEnabled) { /* Location tracking is enabled */
        isLocationTrackingEnabled = false; /* Disable location tracking */
        /* Set icon for enabling location tracking - now is disabled */
        locationTrackingIcon.src = VALUES_enable_location_tracking;
    } else { /* Location tracking is disabled */
        isLocationTrackingEnabled = true; /* Enabled location tracking */
        if (isLocationUpdated(currentPosition)) { /* If there is updated position (not the default one) */
            map.panTo(currentPosition); /* Start location tracking - pan to current location  */
        }
        /* Set icon for disabling location tracking - now is enabled */
        locationTrackingIcon.src = VALUES_disabling_location_tracking;
    }
}

/* 
    Called when received data from database
    <weatherRegions> and <weatherData> are assigned in <init-firebase.js> 
*/
function readyToGetDataBaseData() {
    /* Every region must have data - the list must have same number of elements */
    if (weatherRegions.length != weatherData.length) return;
    /* For each new data, old markers and polygons are removed and replaced */
    clearMarkers();
    markers = [];
    /* Add a marker for each region in database */
    for (let i = 0; i < weatherRegions.length; i++) {
        addMarker(weatherRegions[i], weatherData[i]);
    }
}

function onLocationChange(position) {
    /* Check if the device is moving */
    //if (currentPosition == null || position == null || position.coords == null) return;
    let moving = false;
    /* Check if is first location reading */
    if (currentPosition.lat() != VALUES_NOT_UPDATED_LOCATION.lat &&
        currentPosition.lng() != VALUES_NOT_UPDATED_LOCATION.lng) {
        /* Check if speed is defined */
        if (position.coords.speed != null ||
            position.coords.speed != undefined ||
            position.coords.speed != "undefined") {
            /* Check if current coordinates are modified - the device is moving */
            if (currentPosition.lat() != position.coords.latitude ||
                currentPosition.lng() != position.coords.longitude) {
                /* Device is moving */
                moving = true;
            }
        }
    }
    /* Update current position variable */
    currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    checkDangerRegion(moving); /* Check if the user entered a danger region */
    if (moving) {
        /* Set the moving marker icon */
        addLocationMarker(currentPosition, VALUES_moving_location_icon);
    } else {
        /* Set the stationary marker icon */
        addLocationMarker(currentPosition, null);
    }
    if (isLocationTrackingEnabled) {
        /* Set map center to current location */
        map.setCenter(currentPosition);
        /* Move map to current location */
        map.panTo(currentPosition);
    }
}

/* Add markers on map */
function addMarker(region, regionData) {
    var coords = getLatLon(region); /* Convert string coordinates to LatLng class */
    if (coords == null) return; /* Conversion string-LatLng failed */

    /* Create the marker */
    const marker = new google.maps.Marker({
        position: coords,
        icon: getMarkerIcon(VALUES_weather_icons[regionData["weather"]]),
        title: region,
        map: map,
    });

    /* If the user won't see the markers */
    if (hide_markers) marker.setVisible(false);
    /* Create the custom InfoWindow for marker */
    const infowindow = new google.maps.InfoWindow({
        content: getInfoWindow(region, regionData),
        maxWidth: 1000
    });
    /* Set listener on marker to open the InfoWindow when is clicked */
    marker.addListener("click", () => {
        /* If the InfoWindow is opened already, close it */
        if (isInfoWindowOpened(infowindow)) infowindow.close();
        /* Open InfoWindow for the clicked marker */
        else {
            infowindow.open(map, marker);
        }
    });
    /* Store the marker in list */
    markers.push(marker);
    /* Call the function for creating polygon for each marker (whici is the region area) */
    addRegionArea(coords, regionData);
}

/* Add polygons around each marker on map - these polygons are the region area */
function addRegionArea(position, regionData) {
    /* 
        Define the LatLng coordinates for the polygon's path
        <VALUES_mapRegionAreaDimension> is defined in <values.js>
            and reprezents the region area radius
    */
    const areaCoords = [
        { lat: position.lat() - VALUES_mapRegionAreaDimension, lng: position.lng() - VALUES_mapRegionAreaDimension },
        { lat: position.lat() + VALUES_mapRegionAreaDimension, lng: position.lng() - VALUES_mapRegionAreaDimension },
        { lat: position.lat() + VALUES_mapRegionAreaDimension, lng: position.lng() + VALUES_mapRegionAreaDimension },
        { lat: position.lat() - VALUES_mapRegionAreaDimension, lng: position.lng() + VALUES_mapRegionAreaDimension },
    ];
    /* Get weather string from list (ex: "Moderate rain") */
    let weather = regionData["weather"];
    let color = getWeatherAreaColor(weather);
    /* Construct the polygon */
    const poly = new google.maps.Polygon({
        paths: areaCoords,
        strokeColor: "#000",
        /* Black border */
        strokeOpacity: 0.3,
        /* Opacity border */
        strokeWeight: 1,
        /* Thickness border */
        fillColor: color,
        /* Inside area color */
        fillOpacity: 0.3,
        /* Inside area color opacity */
    });
    /* Store polygon in list */
    markersArea.push(poly);
    /* If the user won't see markers and polygons, hide it */
    if (hide_markers) poly.setVisible(false);
    /* Display polygon on map */
    poly.setMap(map);
}

function addLocationMarker(position, icon) {
    /* Remove previous location marker */
    if (currentPositionMarker != null) currentPositionMarker.setMap(null);
    /* Create the marker */
    currentPositionMarker = new google.maps.Marker({
        /* If the position is not updated, take the default location */
        position: isLocationUpdated(position) ?
            new google.maps.LatLng(VALUES_mapStartCoordinates.lat, VALUES_mapStartCoordinates.lng) : position,
        map: map,
    });
    //  alert(isLocationUpdated(position) + " " + position);
    if (icon == null) return;
    currentPositionMarker.setIcon(getMarkerIcon(icon));
}

/* 
    Hide/Show the current region weather icon when the zoom is bigger than <VALUES_MIN_ZOOM_IN> 
    This is usefull when the zoom is too higher to see the region weather icon    
*/
function onMapEvent() {
    /* Check if the current zoom is grater or equal to <VALUES_MIN_ZOOM_IN> */
    if (map.getZoom() >= VALUES_MIN_ZOOM_IN) {
        let weather; /* Store here the current region weather - where the user zoom in */
        try {
            /* If the region is found in markers list, get its weather data */
            weather = weatherData[markers.indexOf(getRegionMarker(true))]["weather"];
            currentRegionWeather.style.visibility = "visible";
            /* Set the region icon for its weather */
            currentRegionWeather.src = VALUES_weather_icons[weather];
        } catch (err) { /* The region wasn't found or other error - usually TypeError */
            /* Hide the icon - because the region wasn't found in markers list - can be: map draged outsite the region */
            currentRegionWeather.style.visibility = "hidden";
            return;
        }
    } else { /* The user zoom out the map - the region weather icon can be seen on map */
        /* Hide the static region weather icon and remove the image icon */
        currentRegionWeather.style.visibility = "hidden";
        currentRegionWeather.src = "//:0";
    }
}

/* Sets the map on all markers in the array */
function setMapOnAll(Map) {
    if (markers.length == 0) return; /* No markers */
    /* Diplay all markers and polygons */
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(Map);
        markers[i].setVisible(true);
        markersArea[i].setMap(Map);
        markersArea[i].setVisible(true);
    }
}

/* Shows any markers currently in the array */
function showMarkers() {
    setMapOnAll(map);
}

/* Called by HTML button to hide/show markers and polygons */
function hideMarkers() {
    /* Invert boolean variable */
    hide_markers = !hide_markers;
    if (hide_markers == true) {
        /* Change the button text */
        hideMarkersBtn.src = VALUES_show_map_markers;
        /* Hide all markers and polygons */
        clearMarkers();
    } else {
        hideMarkersBtn.src = VALUES_hide_map_markers;
        /* Show all markers and polygons */
        showMarkers();
        /* TESTING */
        setWelcome(true, markers[1]);
    }
}

/* Removes the markers from the map, but keeps them in the array */
function clearMarkers() {
    setMapOnAll(null);
}

/* Deletes all markers in the array by removing references to them */
function deleteMarkers() {
    clearMarkers();
    markers = [];
    markersArea = [];
}

/* Construct custom InfoWindow for markers */
function getInfoWindow(region, regionData) {
    /* Get the InfoWindow template */
    infoWindowContent = VALUES_contentInfoWindows;
    /* Get weather color depending on weather danger level */
    let weather_color = getWeatherColor(regionData["weather"]);
    /* Get gradient for air quality bar depending on percent */
    let gradient_for_air_bar = getGradientForAirBar(regionData["air"]);
    /* Replace placeholders with the region data */
    try {
        infoWindowContent = infoWindowContent
            .replace(STRING_PLACEHOLDER_REGION, region)
            .replace(STRING_PLACEHOLDER_WEATHER, regionData["weather"])
            .replace(STRING_PLACEHOLDER_WEATHER_COLOR, weather_color)
            .replace(STRING_PLACEHOLDER_TEMPERATURE, regionData["temperature"])
            .replace(STRING_PLACEHOLDER_HUMIDITY, regionData["humidity"])
            .replace(STRING_PLACEHOLDER_AIR, regionData["air"])
            .replace(STRING_PLACEHOLDER_AIR_DATA, regionData["air"] + "%")
            .replace(STRING_PLACEHOLDER_AIR_DATA_MIDDLE_GRADIENT_BAR, gradient_for_air_bar["MIDDLE"])
            .replace(STRING_PLACEHOLDER_AIR_DATA_STOP_GRADIENT_BAR, gradient_for_air_bar["STOP"]);
    } catch (err) { /* Catch errors */
        if (isValidData == true) {
            if (err instanceof ReferenceError) {
                alert(STRING_CATCH_CORRUPTED_RECEIVED_DATA);
            } else {
                alert(STRING_CATCH_INVALID_RECEIVED_DATA);
            }
            isValidData = false;
        }
    }
    if (!isValidData) {
        return VALUES_contentInfoWindowCorrupted;
    }
    isValidData = true;
    return infoWindowContent;
}

/* Get the region focused by user with a zoom of minimum <VALUES_MIN_ZOOM_IN> */
function getRegionMarker(focused) {
    let center;
    /* Get focused region - where the user zoom in */
    if (focused == true) center = map.getCenter();
    /* Get region of the current position - using location coordinates */
    else center = currentPosition;
    for (marker of markers) {
        let lat = marker.getPosition().lat();
        let lng = marker.getPosition().lng();
        let area = VALUES_mapRegionAreaDimension;
        if (
            /* Left-top point */
            center.lat() <= lat + area &&
            center.lng() >= lng - area &&
            /* Right-top point */
            center.lat() <= lat + area &&
            center.lng() <= lng + area &&
            /* Left-top point */
            center.lat() >= lat - area &&
            center.lng() >= lng - area &&
            /* Right-bottom point */
            center.lat() >= lat - area &&
            center.lng() <= lng + area
        ) {
            return marker;
        }
    }
    return null;
}

/* Regions in database are stored as coordinates, but without comma or point
    this function get coordinates without comma or point and return LatLon */
function getLatLon(region) {
    /* 
        Regions stored in data base have 4 values separated with spaces 
        Example: 47 60 26 23 is the region that includes all coordinates between:
            [47.6000, 26.2300] - [47.6999, 26.2399]     
    */
    let split = region.split(" ");
    if (split.length != 4 || !isNumber(split)) return null;
    /* Rebuild region coordinates - string to LatLng class */
    let lat = parseFloat(split[0] + "." + split[1]);
    let lon = parseFloat(split[2] + "." + split[3]);
    return new google.maps.LatLng(lat, lon);
}

/* Check if a string can be converted to a number */
function isNumber(string) {
    for (let i = 0; i < string.length; i++) {
        if (parseInt(string[i]) == NaN) return false;
    }
    return true;
}

/* Check if a marker InfoWindow is opened */
function isInfoWindowOpened(infoWindow) {
    var infoWindowsMap = infoWindow.getMap();
    return (infoWindowsMap !== null && typeof infoWindowsMap !== "undefined");
}

/* Check if location is updated at least one time */
function isLocationUpdated(coords) {
    try {
        return (coords.lat() >= VALUES_NOT_UPDATED_LOCATION.lat && coords.lat() <= VALUES_NOT_UPDATED_LOCATION.lat + 1) ? false : true;
    } catch (err) {
        return true;
    }
}

/* Check if the user is approaching a danger region  */
function checkDangerRegion(moving) {
    /* <dangerRegions> is updated in <init-firebase.js> */
    if (isLocationUpdated() == false || moving == false) {
        /* The location is not updated (or enabled) or the user is not moving */
        return false;
    }
    let marker = getRegionMarker(false); /* Get the current region marker */
    if (marker != currentPositionMarker) {
        let weather = weatherData[markers.indexOf(getRegionMarker(true))]["weather"];
        alert("You entered in a " + weather + " weather!");
        setWelcome(true, marker);
    } else {
        alert("Nothing!");
        setWelcome(false, null);
    }
}

/* Restrict marker icon to a fixed resolution and fix its center for uniform zoom */
function getMarkerIcon(icon) {
    if (icon == null) return null;
    return new google.maps.MarkerImage(
        icon,
        new google.maps.Size(VALUES_marker_icon_width, VALUES_marker_icon_lenght),
        new google.maps.Point(0, 0),
        new google.maps.Point(VALUES_marker_icon_width / 2, VALUES_marker_icon_width / 2));
}

/* Construct gradient for air quality bar */
function getGradientForAirBar(air) {
    /* 
        The return value will be a dictionary with 2 keys 
        There will be 3 colors for air quality bar
        The first color will be always green - because low values means no pollution
        The middle color will be red - medium danger of pollution
        The end color will be violet - high danger of pollution
    */
    var gradient = {
        "MIDDLE": "",
        /* How much red */
        "STOP": "" /* How much violet */
    };
    /* The 3 color for RGB */
    let green, red, blue;
    /* Convert air percent to float */
    let percent = air / 100;

    /* Calculate middle color */
    red = percent * 255; /* The highest air percent is, there will be more red in the bar */
    green = 255 - red - (percent * 64); /* The highest air percent is, the green color will be removed in the bar */
    blue = 0; /* The blue color will create violet, but only after air quality percent is bigger than 75% */
    gradient["MIDDLE"] = red + ", " + green + ", " + blue; /* Assign the middle color */
    blue = red / 2;
    gradient["STOP"] = red + ", " + green + ", " + blue;
    return gradient;
}

function getWeatherColor(weather) {
    if (
        weather.includes("Sun") ||
        weather.includes("Moderate")
    )
        return VALUES_weather_color_medium_danger;
    else if (
        weather.includes("Heat") ||
        weather.includes("Torrential") ||
        weather.includes("Massive")
    )
        return VALUES_weather_color_high_danger;
    else return VALUES_weather_color_low_danger;
}

/* Get area color depending on weather condition */
function getWeatherAreaColor(weather) {
    let color = VALUES_weather_area_color_low_danger; /* Green area - no danger */
    if (VALUES_weather_key_medium_danger.includes(weather)) /* Orange area - small-medium danger */
        color = VALUES_weather_area_color_medium_danger;
    else if (VALUES_weather_key_high_danger.includes(weather)) /* Red area - high danger */
        color = VALUES_weather_area_color_high_danger;
    return color;
}

/* Show and hide the welcome region */
function setWelcome(start, marker) {
    /* If another message must be displayed but there is already and active one */
    if (start == true && welcomeMessageIsActive) {
        /* Store the marker in list to display it after current one is finished */
        if (marker instanceof google.maps.Marker) {
            welcomeMessageList.push(marker);
        }
        return;
    }
    if (start == true && !welcomeMessageIsActive) { /* Show the welcome message */
        if (marker == undefined) { /* First welcome message - after map initialization */
            welcomeRegionMessage.style.backgroundColor = VALUES_welcome_message_map_init_background_color;
            welcomeRegionMessage.innerHTML = VALUES_welcome_message_map_init;
        } else {
            let weather = weatherData[markers.indexOf(marker)];
            welcomeRegionMessage.style.backgroundColor = getWeatherAreaColor(weather["weather"]);
            welcomeRegionMessage.innerHTML =
                VALUES_welcome_message_content
                .replace(STRING_PLACEHOLDER_WEATHER, weather["weather"])
                .replace(STRING_PLACEHOLDER_TEMPERATURE, weather["temperature"])
                .replace(STRING_PLACEHOLDER_HUMIDITY, weather["humidity"])
                .replace(STRING_PLACEHOLDER_AIR, weather["air"])
                .replace(STRING_PLACEHOLDER_DANGER, "None");
        }
        setWelcomeMessageAnimation(true);
        /* Set timeout for closing the message after a time */
        setTimeout(function() { setWelcome(false, null); }, VALUES_welcome_message_duration);
    } else if (start == false && welcomeMessageIsActive) { /* Hide the welcome message */
        setWelcomeMessageAnimation(false);
        /* The current message is closed - check if another message wanted to be displayed */
        if (welcomeMessageList.length > 0) {
            setTimeout(function() { setWelcome(true, welcomeMessageList.shift()); }, VALUES_welcome_message_delay_between);
        }
        /* welcomeRegionMessage.innerHTML = ""; */
    }
}

function setWelcomeMessageAnimation(starting) {
    if (starting == true && welcomeMessageIsActive == false) {
        welcomeMessageIsActive = true;
        welcomeRegionMessage.classList.remove('welcomeMessageEnd'); /* Remove welcome end animation */
        welcomeRegionMessage.classList.add('welcomeMessageStart'); /* Add welcome start animation */
    } else if (starting == false && welcomeMessageIsActive == true) {
        welcomeMessageIsActive = false;
        welcomeRegionMessage.classList.remove('welcomeMessageStart'); /* Remove welcome start animation */
        welcomeRegionMessage.classList.add('welcomeMessageEnd'); /* Add welcome end animation */
    }
}

/* Handle location error when location tracking enabling was unsuccessfull */
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert(STRING_CATCH_GEOLOCATION_DENIED);
            break;
        case error.POSITION_UNAVAILABLE:
            alert(STRING_CATCH_POSITION_UNAVAILABLE);
            break;
        case error.TIMEOUT:
            alert(STRING_CATCH_GEOLOCATION_TIMEOUT);
            break;
        case error.UNKNOWN_ERROR:
            alert(STRING_CATCH_GEOLOCATION_UNKNOWN_ERROR);
            break;
    }
}