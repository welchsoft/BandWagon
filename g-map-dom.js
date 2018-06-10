//key for google maps, remember that &key= was added
mapsAPI_KEY = '&key=AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI'
//key for google geolocation API
geolocationAPI_KEY = 'AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI'
//key for google places, might need this later?
placesAPI_KEY = 'AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI'

//generates the a time stamp for the current day to pass to TM.js
function startTimeStamp(){
  let timeZoneOffset = (new Date()).getTimezoneOffset() * 60000
  let startTime = (new Date(Date.now() - timeZoneOffset)).toISOString();
  startTime = startTime.substring(0, startTime.indexOf('T'))
  console.log(startTime)
  return startTime
}

//generates the a time stamp for the current day + the $day-select to pass to TM.js
function endTimeStamp(){
  let daysOffset = ($("#day-select").find(":selected").val()) * 60 * 60 * 24 * 1000
  let timeZoneOffset= (new Date()).getTimezoneOffset() * 60000
  let endTime = new Date(Date.now() + daysOffset - timeZoneOffset)
  endTime = endTime.toISOString()
  endTime = endTime.substring(0, endTime.indexOf('T'))
  console.log(endTime)
  return endTime
}

$("#day-select").change(function(){
  endTimeStamp()
})

//call google maps API
mynav = navigator.geolocation;
mynav.getCurrentPosition(success, failure)

function success(position) {
  //get the coordinates
  let mylat = position.coords.latitude
  let mylong = position.coords.longitude
  fetchCity(mylat, mylong)
  let mycoords = new google.maps.LatLng(mylat, mylong)
}

//shows up if google maps fails or gets denied access
function failure() {
  $('#maps-message').html("getCurrentPostion failed!")
  jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI", function(success) {
    let mylat = success.location.lat
    let mylong = success.location.lng
    fetchCity(mylat, mylong)
    })
}

//send fetch request with coordinates to google maps API
function fetchCity(mylat, mylong){
  fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+mylat+','+mylong+'&result_type=locality'+mapsAPI_KEY).then(function(response){
    return response.json()
  }).then(function(json){
    return json["results"]
  }).then(function(results){
    return results[0]
  }).then(function(results_array){
    return results_array["address_components"]
  }).then(function(address_components_array){
    return address_components_array[0]
  }).then(function(address_component){
    //set the city selector
    $("#city-select").val(address_component['long_name'])
    $("#city-select").trigger('change')
    //DO STUFF HERE!!!
  })
}

//grabs the city value from textbox, returns USA if not in the list passes to TM.js
function getCity(){
  let cityName = $('#city-select').val()
  if (locationData[cityName] == undefined){
    cityName = 'USA'
  }
  return cityName
}

$(document).ready(()=>{
$('#city-select').select2({
  placeholder: 'Select a city',
  width: '100%',
  data: cities
})
})
