const API_KEY = "&apikey=S8P66L8bOZUZaq7TME2QoF5NTK2AoAVp"
//const concertURL = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=300&startDateTime=2018-06-05T00:00:00Z&endDateTime=2018-06-12T00:00:00Z&size=120&apikey='
//const concertURL = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&size=200&apikey='
const concertURL = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&size=20'
//const concertURL = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&size=20&classificationName=County&apikey=S8P66L8bOZUZaq7TME2QoF5NTK2AoAVp'
let movieList=$("#movieList")
var genre = 'County'
let genresearch = '&classificationName='+genre
let city = '&dmaId=300'
let dateRange ='&startDateTime=2018-06-05T00:00:00Z&endDateTime=2018-06-12T00:00:00Z'

//let listBody=$("#listBody")
let rock=$("#rock") 
let hip_hop=$("#hip-hop") 
let country=$("#county") 
let world=$("#world") 
let rnb=$("#rnb") 

rock.click(function(){genre = 'Rock',console.log("Rock clicked"),console.log(genresearch),movieList.innerHTML='',fetchAll()})
hip_hop.click(function(){genre = 'Hip-Hop/Rap',console.log("Hip-Hop clicked"),console.log(genresearch),movieList.innerHTML='',fetchAll()})
country.click(function(){genre = 'County',console.log("County clicked"),console.log(genresearch),movieList.innerHTML='',fetchAll()})
world.click(function(){genre = 'World',console.log("World clicked"),console.log(genresearch),movieList.innerHTML='',fetchAll()})
rnb.click(function(){genre = 'R&B',console.log("R&B clicked"),console.log(genresearch),movieList.innerHTML='',fetchAll()})


function fetchAll()
{

    fetch(concertURL+genresearch+city+dateRange+API_KEY)
    .then(function(response){return response.json()})
    .then(function(json)
    {   
        for (event in json["_embedded"])
            {
//                console.log(event)
//                console.log(json["_embedded"][event])
                return json["_embedded"][event]
                    
            }
        })
    .then(function(event){
        for (i in event)
                    {
//                    console.log("i")
                    console.log(i)
                    console.log(event[i].classifications[0].genre.name)
//                    console.log('event[i].classifications')
//                    console.log(event[i].classifications)
//                    console.log('event[i].classifications.genre')
//                    console.log(event[i].classifications[0].genre.name)
//                    console.log('event[i].classifications.genre.name')
//                    console.log(event[i].classifications.genre.name)
                    let genre = event[i].classifications[0].genre.name
//                    let subgenre = event[i].classifications[0].subGenre.name
                    let eventTitle=event[i].name
                    let venue=event[i]._embedded.venues[0].name
                    let eventDate=event[i].dates.start.localDate
//                    console.log(eventDate)
                    let li = $("<li>").addClass("displayList");
                    let itemTitle= $("<title>").addClass("textForm")
                   li.append(eventTitle)
                   li.append(" at the "+venue)
/                   li.append(" on "+eventDate)
                   li.append(" Genre:  "+genre)
//                   li.append(" subgenre:  "+subgenre)
                   movieList.append(li)
                    }
        })
    }

fetchAll()