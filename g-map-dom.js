mapsAPI_KEY = '&key=AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI'

placesAPI_KEY = 'AIzaSyDTU-JVepSRb5yJKYEmrhVwWRsLnN7ugMI'

API_KEY = '&key=bandwagon-1528232343644'

mynav = navigator.geolocation;

console.log(locationData)

mynav.getCurrentPosition(success, failure)

function startTimeStamp(){
  let startTime = new Date()
  console.log(startTime)
}

startTimeStamp()

function endTimeStamp(days){
  let endTime = new Date()
  endTime.setDate(endTime.getDate() + days)
  console.log(endTime)

}


$('#day-input').val(7)
$('#day-submit').click(function(){
  console.log($('#day-input').val())
  let dayValue = $('#day-input').val()
  $('#daye-input').val('')
  endTimeStamp(dayValue)
})

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
  let failbox = ('#failbox').html("google maps fetch failed!")
}

$(document).ready(function(){
    $('input.autocomplete').autocomplete({data: locationData})
    $('#city-submit').click(function(){
      console.log($('#autocomplete-input').val())
      let cityName = $('#autocomplete-input').val()
      $('#autocomplete-input').val('')
      return cityName
    })
  })
