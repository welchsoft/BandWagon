mapsAPI_KEY = '&key=AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI'

placesAPI_KEY = 'AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI'

bandwagonAPI_KEY = '&key=bandwagon-1528232343644'

function startTimeStamp(){
  let timeZoneOffset = (new Date()).getTimezoneOffset() * 60000
  let startTime = (new Date(Date.now() - timeZoneOffset)).toISOString();
  startTime = startTime.substring(0, startTime.indexOf('T'))
  console.log(startTime)
  return startTime
}

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

mynav = navigator.geolocation;

mynav.getCurrentPosition(success, failure)

function success(position) {
  let mylat = position.coords.latitude
  let mylong = position.coords.longitude
  let mycoords = new google.maps.LatLng(mylat, mylong)
  //$('#lat').html(mylat)
  //$('#long').html(mylong)

//warning not robust!!!
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
    $("#tags").val(address_component['long_name'])
    //return address_component['long_name']
    //DO STUFF HERE!!!
  })
}

function failure() {
  $('#fail-message').html("google maps fetch failed!")
}

function getCity(){
  let cityName = $('#tags').val()
  if (locationData[cityName] == undefined){
    cityName = 'USA'
  }
  return cityName
}

$(function(){
    let availableTags = cities
    $("#tags").autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(availableTags, request.term);

        response(results.slice(0, 5));
    }
})
})
