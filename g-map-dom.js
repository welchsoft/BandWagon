mapsAPI_KEY = '&key=AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI'

placesAPI_KEY = 'AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI'

bandwagonAPI_KEY = '&key=bandwagon-1528232343644'

mynav = navigator.geolocation;

console.log(locationData)
console.log(cities)

mynav.getCurrentPosition(success, failure)

function startTimeStamp(){
  let timeZoneOffset = (new Date()).getTimezoneOffset() * 60000
  let startTime = (new Date(Date.now() - timeZoneOffset)).toISOString();
  startTime = startTime.substring(0, startTime.indexOf('T'))
  console.log(startTime)
  return startTime
}
//remove me!!!
startTimeStamp()

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

//remove me!!!
// function endTimeStampOld(days){
//   let daysOffset = days * 60 * 60 * 24 * 1000
//   let timeZoneOffset= (new Date()).getTimezoneOffset() * 60000
//   let endTime = new Date(Date.now() + daysOffset - timeZoneOffset)
//   endTime = endTime.toISOString()
//   endTime = endTime.substring(0, endTime.indexOf('T'))
//   console.log(endTime)
//   return endTime
//
// }
// endTimeStampOld(7)

///remove me !!! handler for depricated day selector
// $('#day-input').val(7)
// $('#day-submit').click(function(){
//   console.log($('#day-input').val())
//   let dayValue = $('#day-input').val()
//   $('#day-input').val('')
//   endTimeStamp(dayValue)
// })

function success(position) {
  let mylat = position.coords.latitude
  let mylong = position.coords.longitude
  $('#lat').html(mylat)
  $('#long').html(mylong)
  console.log(mylat)
  console.log(mylong)

    let mycoords = new google.maps.LatLng(mylat, mylong)

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
    console.log(address_component['long_name'])
    $('#city-name').html(address_component['long_name'])
    $("#autocomplete-input").val(address_component['long_name'])
    //return address_component['long_name']
    //DO STUFF HERE!!!
  })

  let mapOptions = {
    zoom: 16,
    center: mycoords,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  let map = new google.maps.Map(document.getElementById('map'), mapOptions)

  let marker = new google.maps.Marker({map: map, position: mycoords})
}

function failure() {
  $('#fail-message').html("google maps fetch failed!")
}

$(document).ready(function(){
    $('input.autocomplete').autocomplete({data: locationData})
    $('#city-submit').click(function(){
      getCity()
    })
  })

function getCity(){
  let cityName = $('#tags').val()
  if (locationData[cityName] == undefined){
    cityName = 'USA'
  }
  return cityName
}

$(function(){
    let availableTags = cities
    $("#tags").autocomplete({source: availableTags})
  })
