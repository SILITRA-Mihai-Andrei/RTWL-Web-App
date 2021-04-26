/* Database configuration for FireBase - mihai.silitra@student.usv.ro */
const VALUES_firebaseConfig = {
    apiKey: "AIzaSyBOp58iOEsXXXXXX-laNWDSs8r1JXXXXXX",
    authDomain: "my-domain.firebaseapp.com",
    databaseURL: "https://my-domain.firebaseio.com",
    projectId: "my-project-id",
    storageBucket: "my-project-name.appspot.com",
    messagingSenderId: "529180XXXXXX",
    appId: "1:529180XXXXXX:web:84e8ee4XXXXXXXXXXXXXXX",
    measurementId: "G-XXX6XXKXXX"
};

/* Weathers string */
const VALUES_weather_string = {
    0: "Sunny",
    1: "Sun",
    2: "Heat",
    3: "Soft rain",
    4: "Moderate rain",
    5: "Torrential rain",
    6: "Soft wind",
    7: "Moderate wind",
    8: "Torrential wind",
    9: "Soft snow fall",
    10: "Moderate snow fall",
    11: "Massive snow fall",
}

/* Icon for each weather marker */
const VALUES_weather_icons = {
    "Sunny": "../sunny10.png",
    "Sun": "../sun10.png",
    "Heat": "../heat10.png",
    "Soft rain": "../soft_r10.png",
    "Moderate rain": "../modera10.png",
    "Torrential rain": "../torren10.png",
    "Soft wind": "../soft_w10.png",
    "Moderate wind": "../modera12.png",
    "Torrential wind": "../torren11.png",
    "Soft snow fall": "../soft_s10.png",
    "Moderate snow fall": "../modera11.png",
    "Massive snow fall": "../massiv10.png"
};
/* Icon for moving device */
const VALUES_moving_location_icon = "../moving11.png";
/* Icon for hiding markers on map */
const VALUES_hide_map_markers = "../246x0w10.jpg";
/* Icon for showing markers on map */
const VALUES_show_map_markers = "../246x0w10.jpg";
/* Icon for enabling location */
const VALUES_enable_location = "../moving11.png";
/* Icon for disabling location */
const VALUES_disabling_location = "../moving12.png";
/* Icon for enabling location tracking */
const VALUES_enable_location_tracking = "../locati11.png";
/* Icon for disabling location tracking */
const VALUES_disabling_location_tracking = "../locati10.png";

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
const VALUES_welcome_message_duration = 5000;
const VALUES_welcome_message_delay_between = 500;
const VALUES_welcome_message_opacity = "0.75";

/* Colors for weather text in InfoWindow */
const VALUES_weather_color_low_danger = "#fff";
const VALUES_weather_color_medium_danger = "#f70";
const VALUES_weather_color_high_danger = "#F03";
const VALUES_weather_area_color_low_danger = "rgba(0, 255, 0, " + VALUES_welcome_message_opacity + ")";
const VALUES_weather_area_color_medium_danger = "rgba(255, 120, 0, " + VALUES_welcome_message_opacity + ")";
const VALUES_weather_area_color_high_danger = "rgba(255, 0, 0, " + VALUES_welcome_message_opacity + ")";

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
/* Placeholders for custom InfoWindow PREDICTIONS style */
const STRING_PLACEHOLDER_PREDICTION1 = "REPLACE_PREDICTION1";
const STRING_PLACEHOLDER_PREDICTION2 = "REPLACE_PREDICTION2";
const STRING_PLACEHOLDER_PREDICTION3 = "REPLACE_PREDICTION3";
const STRING_PLACEHOLDER_PREDICTION_TIME = "REPLACE_PREDICTION_TIME";
const STRING_PLACEHOLDER_PREDICTION_IMAGE = "REPLACE_PREDICTION_IMAGE";
const STRING_PLACEHOLDER_PREDICTION_PERCENT = "REPLACE_PREDICTION_PERCENT";
const STRING_PLACEHOLDER_PREDICTION_WEATHER = "REPLACE_PREDICTION_WEATHER";
const STRING_PLACEHOLDER_PREDICTION_TEMPERATURE = "REPLACE_PREDICTION_TEMPERATURE";
const STRING_PLACEHOLDER_PREDICTION_TEMPERATURE_PERCENT = "REPLACE_PREDICTION_TEMPERATURE_PERCENT";
const STRING_PLACEHOLDER_PREDICTION_HUMIDITY = "REPLACE_PREDICTION_HUMIDITY";
const STRING_PLACEHOLDER_PREDICTION_HUMIDITY_PERCENT = "REPLACE_PREDICTION_HUMIDITY_PERCENT";

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
    "<table class='infoWindow'><tr>" +
    "<th style='padding: 20px 5% 20px 10%; width: 50%;'> Region <br>" + STRING_PLACEHOLDER_REGION + "</th>" +
    "<th style='color: " + STRING_PLACEHOLDER_WEATHER_COLOR + "; padding: 0 10% 0 5%; font-size: 20px; width: 50%;'>" + STRING_PLACEHOLDER_WEATHER + "</th>" +
    "</tr><tr>" +
    "<td>Temperature: <br>" + STRING_PLACEHOLDER_TEMPERATURE + "&#8451;</td>" +
    "<td>Humidity: <br>" + STRING_PLACEHOLDER_HUMIDITY + "%</td>" +
    "</tr><tr>" +
    "<td>Air quality: " + STRING_PLACEHOLDER_AIR +
    "%</td><td><div id='myProgress'><div id='myBar' style='width: " + STRING_PLACEHOLDER_AIR_DATA + "; " +
    "background-image: linear-gradient( to right, " + "rgb(0, 255, 0), " +
    "rgb(" + STRING_PLACEHOLDER_AIR_DATA_MIDDLE_GRADIENT_BAR +
    "), rgb(" + STRING_PLACEHOLDER_AIR_DATA_STOP_GRADIENT_BAR + "));'" +
    ">_</div></div>" +
    "</td></tr>" +
    "<tr><td colspan='2' style='padding: 0 0 0 0;'>" +
    "<table id='infoWindowPredsictions' style='width: 100%; height: auto;'><tr>" +
    "<td style='padding: 0 0 0 0;'>" + STRING_PLACEHOLDER_PREDICTION1 +
    "</td><td style='padding: 0 0 0 0;'>" + STRING_PLACEHOLDER_PREDICTION2 +
    "</td><td style='padding: 0 0 0 0;'>" + STRING_PLACEHOLDER_PREDICTION3 + "</td> " +
    "</tr></table></td></tr></table>";

const VALUES_contentInfoWindowCorrupted =
    "<div id='corrupted_data_infowindow'>" + STRING_CATCH_INVALID_RECEIVED_DATA + "</div>";

/* InfoWindow for prediction */
const VALUES_contentInfoWindowsPrediction =
    "<table id='infoWindowPredictionsChild' style='width: 100%; height: auto;'>" +
    "<tr><th>" + STRING_PLACEHOLDER_PREDICTION_TIME + "<br>" + STRING_PLACEHOLDER_PREDICTION_PERCENT +
    "%</th><th><img src='" + STRING_PLACEHOLDER_PREDICTION_IMAGE +
    "'></th></tr><tr><td colspan='2'>" + STRING_PLACEHOLDER_PREDICTION_WEATHER +
    "</td></tr><tr><td><img width='15%' src='../Icons/temperature.jpg'> " + STRING_PLACEHOLDER_PREDICTION_TEMPERATURE +
    "&#8451;</td><td>" + STRING_PLACEHOLDER_PREDICTION_TEMPERATURE_PERCENT +
    "%</td></tr><tr><td><img width='15%' src='../Icons/humidity.jpg'> " + STRING_PLACEHOLDER_PREDICTION_HUMIDITY +
    "%</td><td>" + STRING_PLACEHOLDER_PREDICTION_HUMIDITY_PERCENT + "%</td></tr></table>";
/**
 <table id="infoWindowPredictionsChild" style="width: 100%; height: auto;">
    <tr>
        <th>21:11</td>
        <th><img src="../Icons/sun.png"></td>
        <th>17%</td>
    </tr>
    <tr>
        <td></td>
        <td>Sunny</td>
        <td></td>
    </tr>
    <tr>
        <td>
            <img width="15%" src="../Icons/temperature.jpg"> 12&#8451;
        </td>
        <td></td>
        <td>32%</td>
    </tr>
    <tr>
        <td>
            <img width="15%" src="../Icons/humidity.jpg"> 34%
        </td>
        <td></td>
        <td>19%</td>
    </tr>
</table>
 */
