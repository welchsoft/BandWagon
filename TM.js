const tmAPI_KEY = "&apikey=S8P66L8bOZUZaq7TME2QoF5NTK2AoAVp"
const concertURL = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&size=10'

var genrePick="Country"

//var dateRange ='&startDateTime=2018-06-08T00:00:00Z&endDateTime=2018-06-30T00:00:00Z'

var dateRangeStart=startTimeStamp()
console.log(dateRangeStart)
var dateRangeEnd=endTimeStamp()
console.log(dateRangeEnd)
console.log('&startDateTime='+dateRangeStart+'T00:00:00Z&endDateTime='+dateRangeEnd+'T23:59:59Z')
var dateRange ='&startDateTime='+dateRangeStart+'T00:00:00Z&endDateTime='+dateRangeEnd+'T23:59:59Z'
var locationPick ="Houston"
//var locationPick=getCity()
// console.log(locationPick)
let movieList=$("#movieList")
var artistPass=[]  
var genre = genreCats[genrePick]
var genresearch = '&classificationId='+genre
var city = '&dmaId='+locationPick

/*$(function () {
    $('select').value();
 });*/

//var myNumber = 9;
//var formattedNumber = ("0" + myNumber).slice(-2);
//console.log(formattedNumber);

 generate.addEventListener('click',function(){
    var genreChoice = document.getElementById("genreSelect").value;
    genre = genreChoice;
    console.log(genre)
    genresearch = '&classificationId='+genre
    var dateRangeStart=startTimeStamp()
    console.log(dateRangeStart)
    dateRangeEnd=endTimeStamp()
    console.log(dateRangeEnd)
    console.log('&startDateTime='+dateRangeStart+'T00:00:00Z&endDateTime='+dateRangeEnd+'T23:59:59Z')
    dateRange ='&startDateTime='+dateRangeStart+'T00:00:00Z&endDateTime='+dateRangeEnd+'T23:59:59Z'
    buildLocation()
    fetchAll()
 })
 

/*function buildGenre(){
        genre = genreCats[genrePick]
        genresearch = '&classificationId='+genre}*/

function buildLocation(){
        var locationChoice =locationData[locationPick]
        city = '&dmaId='+locationChoice
        return city}

function fetchAll(){
        buildLocation()
        let searchstring = concertURL+genresearch+city+dateRange+tmAPI_KEY
        console.log(searchstring)
        fetch(searchstring)
        .then(function(response){return response.json()})
        .then(function(json)
        {   
            for (event in json["_embedded"])
                {
                    return json["_embedded"][event]
                }
        })
        .then(function(event)
            {
            movieList.html("")
            artistPass=[]
            for (i in event){
                        let genre = event[i].classifications[0].genre.name
                        let eventTitle=event[i].name
                        let venue=event[i]._embedded.venues[0].name
                        let eventDate=event[i].dates.start.localDate
                        let getTickets=event[i].url
                        console.log (getTickets)                        
                        let lineup = event[i]._embedded.attractions
//                        console.log (lineup)
                            for (index in lineup )
                                {
                                    let act = lineup[index].name
//                                    console.log(act)
                                    artistPass.push(act)
                                }
                        buildit(genre, eventTitle, venue, eventDate, getTickets )
                           /* console.log(artistPass)*/}})}

function buildit(genre, eventTitle, venue, eventDate, getTickets ){
    let li = $("<li>").addClass("displayList");
    let itemTitle= $("<title>").addClass("textForm")
    li.append(`<p class="event-title"> ${eventTitle}</p>`)
    li.append(`<p class="venue-class"> Venue: ${venue}</p>`)
    li.append(`<p class="event-date"> Date: ${eventDate}</p>`)
    li.append(`<p class="genre"> Genre: ${genre}</p>`)
    li.append(`<p onclick=(window.open('${getTickets}')) class="buy" >Buy Tickets</p>`)
    movieList.append(li)}

fetchAll()