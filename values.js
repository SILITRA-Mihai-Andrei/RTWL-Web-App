/* Database configuration for FireBase - mihai.silitra@student.usv.ro */
const VALUES_firebaseConfig = {
    apiKey: "AIzaSyAWSQj1_J3d_91M2Fc3So5JcdRSODg1ncI",
    authDomain: "real-time-weather-location.firebaseapp.com",
    databaseURL: "https://real-time-weather-location.firebaseio.com",
    projectId: "real-time-weather-location",
    storageBucket: "real-time-weather-location.appspot.com",
    messagingSenderId: "529180953763",
    appId: "1:529180953763:web:84e8ee46a02938c7d08316",
    measurementId: "G-6H96WBKDH3"
};

/* Icon for each weather marker */
const VALUES_weather_icons = {
    "Sunny": "https://i94.servimg.com/u/f94/19/39/15/82/sunny10.png",
    "Sun": "https://i94.servimg.com/u/f94/19/39/15/82/sun10.png",
    "Heat": "https://i94.servimg.com/u/f94/19/39/15/82/heat10.png",
    "Soft rain": "https://i94.servimg.com/u/f94/19/39/15/82/soft_r10.png",
    "Moderate rain": "https://i94.servimg.com/u/f94/19/39/15/82/modera10.png",
    "Torrential rain": "https://i94.servimg.com/u/f94/19/39/15/82/torren10.png",
    "Soft wind": "https://i94.servimg.com/u/f94/19/39/15/82/soft_w10.png",
    "Moderate wind": "https://i94.servimg.com/u/f94/19/39/15/82/modera12.png",
    "Torrential wind": "https://i94.servimg.com/u/f94/19/39/15/82/torren11.png",
    "Soft snow fall": "https://i94.servimg.com/u/f94/19/39/15/82/soft_s10.png",
    "Moderate snow fall": "https://i94.servimg.com/u/f94/19/39/15/82/modera11.png",
    "Massive snow fall": " https://i94.servimg.com/u/f94/19/39/15/82/massiv10.png"
};
/* Icon for moving device */
const VALUES_moving_location_icon = " https://i94.servimg.com/u/f94/19/39/15/82/moving11.png";
/* Icon for hiding markers on map */
const VALUES_hide_map_markers = "https://i94.servimg.com/u/f94/19/39/15/82/246x0w10.jpg";
/* Icon for showing markers on map */
const VALUES_show_map_markers = "https://i94.servimg.com/u/f94/19/39/15/82/246x0w10.jpg";
/* Icon for enabling location */
const VALUES_enable_location = "https://i.servimg.com/u/f94/19/39/15/82/moving11.png";
/* Icon for disabling location */
const VALUES_disabling_location = "https://i94.servimg.com/u/f94/19/39/15/82/moving12.png";
/* Icon for enabling location tracking */
const VALUES_enable_location_tracking = "https://i.servimg.com/u/f94/19/39/15/82/locati11.png";
/* Icon for disabling location tracking */
const VALUES_disabling_location_tracking = "https://i.servimg.com/u/f94/19/39/15/82/locati10.png";

/* Weather conditions by danger level (for region area color) */
const VALUES_weather_key_medium_danger = "Sun Moderate Rain Moderate wind Moderate snow fall";
const VALUES_weather_key_high_danger = "Heat Torrential rain Torrential wind Massive snow fall";

/* Constants used for initializa map - defauld values */
const VALUES_mapStartZoom = 14;
const VALUES_mapStartType = "satellite";
const VALUES_mapStartCoordinates = {
    lat: 47.60,
    lng: 26.23
};
/* Region area radius - polygon around weather marker */
const VALUES_mapRegionAreaDimension = 0.005;
/* Min zoom in to display region weather icon on bottom right side */
const VALUES_MIN_ZOOM_IN = 17;
/* Default marker icon resolution */
const VALUES_marker_icon_width = 64;
const VALUES_marker_icon_lenght = 64;
/* Not updated location */
const VALUES_NOT_UPDATED_LOCATION = {
    lat: 0.0,
    lng: 0.0
};
/* Welcome region - when the user enters a region or any messaje */
const VALUES_welcome_region_width = "20vw";
const VALUES_welcome_region_max_height = "20%"
const VALUES_welcome_region_padding = "1%";
const VALUES_welcome_message_duration = 15000;

/* Colors for weather text in InfoWindow */
const VALUES_weather_color_low_danger = "#fff";
const VALUES_weather_color_medium_danger = "#f70";
const VALUES_weather_color_high_danger = "#F03";

/* Color for app title in welcome message */
const STRING_PLACEHOLDER_WELCOME_MESSAGE_APP_TITLE_STYLE = "#f70";

/* Button text for hide/show markers and polygons */
const STRING_SHOW_MARKERS = "Show markers";
const STRING_HIDE_MARKERS = "Hide markers";
const STRING_ENABLE_LOCATION = "Enable location";
const STRING_DISABLE_LOCATION = "Disable location";

/* Placeholders for custom InfoWindow and welcome message */
const STRING_PLACEHOLDER_REGION = "REPLACE_REGION";
const STRING_PLACEHOLDER_WEATHER = "REPLACE_WEATHER";
const STRING_PLACEHOLDER_TEMPERATURE = "REPLACE_TEMPERATURE";
const STRING_PLACEHOLDER_HUMIDITY = "REPLACE_HUMIDITY";
const STRING_PLACEHOLDER_AIR = "REPLACE_AIR_TEXT";
const STRING_PLACEHOLDER_DANGER = "REPLACE_DANGER";
/* Placeholders for custom InfoWindow style */
const STRING_PLACEHOLDER_WEATHER_COLOR = "REPLACE_COLOR_WEATHER";
const STRING_PLACEHOLDER_AIR_DATA = "REPLACE_AIR_DATA";
const STRING_PLACEHOLDER_AIR_DATA_MIDDLE_GRADIENT_BAR = "REPLACE_AIR_MIDDLE_GRADIENT_BAR";
const STRING_PLACEHOLDER_AIR_DATA_STOP_GRADIENT_BAR = "REPLACE_AIR_STOP_GRADIENT_BAR";

/* Welcome message - when the map is initilized */
const VALUES_welcome_message_map_init = "Welcome to <br> <span style='color: " + STRING_PLACEHOLDER_WELCOME_MESSAGE_APP_TITLE_STYLE +
    "'>Real Time Weather Location Traffic System</span> <br> The web application."
const VALUES_welcome_message_map_init_background_color = "black";
/* Welcome messages - when the user enter a region */
const VALUES_welcome_message_content = "You entered in a " + STRING_PLACEHOLDER_WEATHER + " weather region." +
    "<br>Temperature: " + STRING_PLACEHOLDER_TEMPERATURE +
    "<br>Humidity: " + STRING_PLACEHOLDER_HUMIDITY +
    "<br>Air quality: " + STRING_PLACEHOLDER_AIR +
    "<br>DANGER: " + STRING_PLACEHOLDER_DANGER;

/* Error messages for catches routine */
const STRING_CATCH_CORRUPTED_RECEIVED_DATA = "Received corrupted data from database!";
const STRING_CATCH_INVALID_RECEIVED_DATA = "Something went wrong in receiving valid data from database!";
const STRING_CATCH_GEOLOCATION_DENIED = "You denied the request for Geolocation.";
const STRING_CATCH_GEOLOCATION_NOT_SUPPORTED = "Error: Your browser doesn't support geolocation.";
const STRING_CATCH_POSITION_UNAVAILABLE = "Location information is unavailable.";
const STRING_CATCH_GEOLOCATION_TIMEOUT = "The request to get user location timed out.";
const STRING_CATCH_GEOLOCATION_UNKNOWN_ERROR = "An unknown error occurred.";

/* Template for custom InfoWindow */
const VALUES_contentInfoWindows =
    "<table><tr>" +
    "<th> Region <br>" + STRING_PLACEHOLDER_REGION + "</th>" +
    "<th style='color: " + STRING_PLACEHOLDER_WEATHER_COLOR + "'>" + STRING_PLACEHOLDER_WEATHER + "</th>" +
    "</tr><tr>" +
    "<td>Temperature: <br>" + STRING_PLACEHOLDER_TEMPERATURE + "&#8451;</td>" +
    "<td>Humidity: <br>" + STRING_PLACEHOLDER_HUMIDITY + "%</td>" +
    "</tr><tr>" +
    "<td id='airQualityRow' colspan='2'> Air quality: <br>" +
    "<div id='myProgress'><div id='myBar' style='width: " + STRING_PLACEHOLDER_AIR_DATA + "; " +
    "background-image: linear-gradient( to right, " + "rgb(0, 255, 0), " +
    "rgb(" + STRING_PLACEHOLDER_AIR_DATA_MIDDLE_GRADIENT_BAR +
    "), rgb(" + STRING_PLACEHOLDER_AIR_DATA_STOP_GRADIENT_BAR + "));'" +
    ">" + STRING_PLACEHOLDER_AIR + "%</div></div>" +
    "</td></tr></table>";

const VALUES_contentInfoWindowCorrupted =
    "<div id='corrupted_data_infowindow'>" + STRING_CATCH_INVALID_RECEIVED_DATA + "</div>";