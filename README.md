# RTWL-Web-App
Real Time Weather Location Web Application

This application is specially created for the RTWL Traffic System. This is the web application where any user can see a GoogleMap with region areas and markers coresponding to the weather conditions of the region.

A region is a ~1.1km2 area (partial GPS coordinates - 47.26125412 26.21235424 will be in region 47.26 26.21 - 47.25125412 26.21235424 will be in region 47.25 26.21).

The system has a hardware support used to collect weather conditions in the environment of the car and send them through a Bluetooth module to database.

A fixed server will take the weather data and calculate with Machine Learning functions to obtain average weather conditions and predictions. The calculated data is send to database from where the web application will collect and display weather data.

Tracking location is available for this application and allow user to update the map position when the device is moving.

Some pictures of the app are hosted on my personal Google Drive.
https://drive.google.com/drive/folders/1dRKpDlu9L7g53c33urG4z5RgXUJwZCwe?usp=sharing
