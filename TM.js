const tmAPI_KEY = "&apikey=S8P66L8bOZUZaq7TME2QoF5NTK2AoAVp"
const concertURL = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&size=10'
let movieList=$("#movieList")
var genrePick="Country"
var locationPick="Houston"
var artistPass=[]  
var dateRange ='&startDateTime=2018-06-05T00:00:00Z&endDateTime=2018-06-12T00:00:00Z'
var genre = genreCats[genrePick]
var genresearch = '&classificationId='+genre
console.log(genrePick+" is "+genre)
var city = '&dmaId='+locationPick
let rock=$("#rock") 
let hip_hop=$("#hip-hop") 
let country=$("#county") 
let world=$("#world") 
let rnb=$("#rnb") 
rock.click(function(){genrePick = 'Rock', buildGenre(), fetchAll()})
hip_hop.click(function(){genrePick = 'Rap', buildGenre(), fetchAll()})
country.click(function(){genrePick = 'Country', buildGenre(), fetchAll()})
world.click(function(){genrePick = 'World', buildGenre(),fetchAll()})
rnb.click(function(){genrePick = 'RnB', buildGenre(), fetchAll()})

function buildGenre()
    {
        genre = genreCats[genrePick]
        console.log (genre)
        genresearch = '&classificationId='+genre
        console.log(genrePick+" clicked")
    }

function buildLocation()
    {
        console.log(locationPick)
        var locationChoice =locationData[locationPick]
        city = '&dmaId='+locationChoice
        return city
    }

function fetchAll()
    {
        buildLocation()
        console.log(genresearch)
        console.log(city)
        console.log(dateRange)
        let searchstring = concertURL+genresearch+city+dateRange+tmAPI_KEY
        console.log(searchstring)
        fetch(searchstring)
        .then(function(response){return response.json()})
        .then(function(json)
        {   
            for (event in json["_embedded"])
                {
                    console.log(json["_embedded"][event])
                    return json["_embedded"][event]
                        
                }
        })
        .then(function(event)
            {
            movieList.html("")
            for (i in event)
                        {
                        let genre = event[i].classifications[0].genre.name
                        let eventTitle=event[i].name
                        let venue=event[i]._embedded.venues[0].name
                        let eventDate=event[i].dates.start.localDate
                        let li = $("<li>").addClass("displayList");
                        let itemTitle= $("<title>").addClass("textForm")
                    li.append(eventTitle)
                    li.append(" at the "+venue)
                    li.append(" on "+eventDate)
                    li.append(" Genre:  "+genre)
                    movieList.append(li)
                        }
            })
    }

fetchAll()
 