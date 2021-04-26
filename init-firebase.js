/* Initialize Firebase */
firebase.initializeApp(VALUES_firebaseConfig);
/* Get a reference to the database service */
var database = firebase.database();
/* Declare lists for regions and their data */
var weatherData = [];
var weatherRegions = [];
var dangerRegions = [];
var dangerData = [];
var predictionRegions = [];
var predictionData = [];
var dangerRegions = [];

/* Start listening to database (reading to each new modification) */
readData();
initElements();

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
            let index = isRegionRegistered(weatherRegions, key);
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

    /* Database node for dangers is "dangers" */
    var dangersRoot = database.ref('dangers/');
    /* Call this function every time database is updated */
    dangersRoot.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key; /* Region name */
            var childData = childSnapshot.val(); /* danger data */
            /* Check if the region is already registered */
            let index = isRegionRegistered(dangerRegions, key);
            if (index == -1) { /* Not registered - store them in lists */
                dangerRegions.push(key);
                dangerData.push(childData);
            } else { /* Already registered - replace old version */
                dangerRegions[index] = key;
                dangerData[index] = childData;
            }
        });
        /* Notify reading done */
        readyToGetDataBaseData();
    });

    /* Database node for prediction is "predictions" */
    var predictionsRoot = database.ref('predictions/');
    /* Call this function every time database is updated */
    predictionsRoot.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key; /* Region name */
            var childData = childSnapshot.val(); /* prediction data */
            /* Check if the region is already registered */
            let index = isRegionRegistered(predictionRegions, key);
            if (index == -1) { /* Not registered - store them in lists */
                predictionRegions.push(key);
                predictionData.push(childData);
            } else { /* Already registered - replace old version */
                predictionRegions[index] = key;
                predictionData[index] = childData;
            }
        });
        /* Notify reading done */
        readyToGetDataBaseData();
    });
}

/* Check if region is in list. */
function isRegionRegistered(list, region) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].valueOf() == region.valueOf()) /* Compare regions name */
            return i; /* Return the index where was found */
    }
    /* Not found - region is not registered yet */
    return -1;
}

/**
 * Get the region index.
 * Example: for weather code 100 it will return 0, for 134 it will return 1, for 167 will return 2, for 200 will return 3.
 * 
 * @param {int} code 
 * @returns 
 */
function getRegionIndex(code) {
    if (code < 100 || code > 499) return -1;
    // Loop trough all weather conditions (sun, rain, wind and snowfall)
    for (let i = 1; i <= 4; i++) {
        // Check if the weather code specifies a weather condition of low intensity (sunny, soft rain)
        if (isInRange(code, 0 + (i * 100), 33 + (i * 100)))
            return (i - 1) + ((i - 1) * 2); // indexes 0, 3, 6, 9
        // Check if the weather code specifies a weather condition of medium intensity (sun, moderate rain)
        else if (isInRange(code, 34 + (i * 100), 66 + (i * 100)))
            return i + ((i - 1) * 2); // indexes 1, 4, 7, 10
        // Check if the weather code specifies a weather condition of high intensity (heat, torrential rain)
        else if (isInRange(code, 67 + (i * 100), 99 + (i * 100)))
            return i + 1 + ((i - 1) * 2); // indexes 2, 5, 7, 11
    }
    return -1;
}

/**
 * Check if the number is in range.
 *
 * @param number specifies the number that is checked.
 * @param min    specifies the left limit.
 * @param max    specifies the right limit.
 * @return true is the number between the limits, false otherwise.
 */
function isInRange(number, min, max) {
    return number >= min && number <= max;
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
