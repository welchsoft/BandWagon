var access_token = ''  
var currentUser = ''
var playlist_id = ''
var formattedIdString = ''
var token = $('#tokenGetter')
var hash = $('#hashGetter')
var coldplay = $('#findColdplay')
var top_song = $('#findTopSong')
var playlist_generator = $('#generatePlaylist')
var user_id = $('#getUserId')
var display_playlist = $('#displayPlaylist')
var list_of_band_ids = []
var list_of_song_titles = []
var list_of_song_ids = []



function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

token.click(()=>{
  window.location = "https://accounts.spotify.com/authorize?client_id=b976c43fb15b44c881e1598f77270193&redirect_uri=http:%2F%2Flocalhost:3000&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private&response_type=token"
})

hash.click(()=>{
  var params = getHashParams();
  access_token = params.access_token
  console.log("Token created")
  console.log(artistPass)
})

coldplay.click(()=>{
  $.ajax({
    url: 'https://api.spotify.com/v1/search?q=coldplay&type=artist',
    headers:{
      'Authorization': 'Bearer ' + access_token
    },
    success: (response)=>{
      var searchResults = JSON.stringify(response)
      var band = response.artists.items[0].name
      var bandId = response.artists.items[0].id
      list_of_band_ids.push(bandId)
      console.log(band)
      console.log(bandId)
      console.log(list_of_band_ids)
      return searchResults
    }
  })

})

top_song.click(()=>{
  list_of_band_ids.forEach((item)=>{
    $.ajax({
      url: `https://api.spotify.com/v1/artists/${item}/top-tracks?country=US`,
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      },
      success: (response)=>{
        var songName = response.tracks[0].name
        var songId = response.tracks[0].id
        list_of_song_ids.push(songId)
        list_of_song_titles.push(songName)
        var searchResults = JSON.stringify(response)
        console.log(songName)
      }
    })
  })
})

playlist_generator.click(()=>{
  var playlistName = {name: "Bandwagon"}
  $.ajax({
    method: 'POST',
    url: `https://api.spotify.com/v1/users/${currentUser}/playlists`,
    data:JSON.stringify(playlistName),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    },
    success: (response)=>{
      console.log("playlist created!")
      playlist_id = response.id
      console.log(response.id)
      let songlist = formattedSongs()
      addSongs(playlist_id, songlist)
    }
  })
})


display_playlist.click(()=>{
  playlistDiv = document.getElementById("generatedPlaylist")
  console.log(`<iframe src="https://open.spotify.com/embed?uri=spotify:user:${currentUser}:playlist:${playlist_id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
  playlistDiv.innerHTML = `<iframe src="https://open.spotify.com/embed?uri=spotify:user:${currentUser}:playlist:${playlist_id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`

})

function addSongs(playlist, track_ids){
  console.log(track_ids)
  $.ajax({
    method: 'POST',
    //url: `"https://api.spotify.com/v1/users/jmperezperez/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks?position=0&uris=spotify%3Atrack%3A4iV5W9uYEdYUVa79Axb7Rh%2Cspotify%3Atrack%3A1301WleyT98MSxVHPZCA6M"`,
    url: `https://api.spotify.com/v1/users/${currentUser}/playlists/${playlist}/tracks?position=0&uris=${track_ids}`,
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + access_token
    },
    success: (response)=>{
      console.log(response)
    }
  })
}


function formattedSongs(){
  for (var i=0; i<list_of_song_ids.length; i++){
    list_of_song_ids[i]="spotify%3Atrack%3A"+list_of_song_ids[i];
  }
  list_of_song_ids = list_of_song_ids.join(',')
  return list_of_song_ids
}
  // const baseUrl = `https://open.spotify.com/embed?uri=spotify:trackset:My Playlist:${list_of_song_ids.join()}`
  // $('.playlist').html(`<iframe src="${baseUrl}" height="400" width="300" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)



//Create the playlist
//Add songs to the playlist
//Display that playlist


user_id.click(()=>{
  $.ajax({
    url: `https://api.spotify.com/v1/me`,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    },
    success: (response)=>{
      currentUser = response.id
      console.log(currentUser)
    }
  })
})

//   fetch('https://api.spotify.com/v1/search?', {
//   method: 'GET',
//   headers: {
//     q: 'coldplay',
//     type: 'artist',
//     'Authorization': 'Bearer ' + access_token
//   }
// }, 
// )
// .then((response)=>{
//   console.log(response)
//   return response.json()
// }).then((reply)=>{
//   console.log(reply)
// })})