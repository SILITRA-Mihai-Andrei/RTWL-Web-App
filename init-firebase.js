/* Initialize Firebase */
firebase.initializeApp(VALUES_firebaseConfig);
/* Get a reference to the database service */
var database = firebase.database();
/* Declare lists for regions and their data */
var weatherData = [];
var weatherRegions = [];
var dangerRegions = [];
initElements();

/* Start listening to database (reading to each new modification) */
readData();

/* Create listener for reading database modification */
function readData() {
    /* Database node for updated regions is "weather" */
    var weatherRoot = database.ref('weather/');
    /* Call this function every time database is updated */
    weatherRoot.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key; /* Region name */
            var childData = childSnapshot.val(); /* Region data */
            /* Check if the region is already registered */
            let index = isRegionRegistered(key);
            if (index == -1) { /* Not registered - store them in lists */
                weatherRegions.push(key);
                weatherData.push(childData);
            } else { /* Already registered - replace old version */
                weatherRegions[index] = key;
                weatherData[index] = childData;
            }
        });
        /* Notify reading done */
        readyToGetDataBaseData();
    });
}

/* Check if region is in list <weatherRegions> */
function isRegionRegistered(region) {
    for (let i = 0; i < weatherRegions.length; i++) {
        if (weatherRegions[i].valueOf() == region.valueOf()) /* Compare regions name */
            return i; /* Return the index where was found */
    }
    /* Not found - region is not registered yet */
    return -1;
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

/* Write data to database */
/* TESTING */
function writeUserData(userId, name, email) {
    database.ref('users/' + userId).set({
        username: name,
        email: email
    });
    alert("Sent!");
}