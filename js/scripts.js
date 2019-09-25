fetch('records.json')
.then(function(response) {
  return response.json();
})
.then(function(data) {
  data.records.sort(function(a, b){
      let x = a.artist;
      let y = b.artist;
                  if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
  });
  let output = '';
  for(i = 0; i < data.records.length; i++) {
      output += 
      '<div class="artist-song close">' +
          '<h3 class="title">' + data.records[i].artist + '</h3>' +
          '<p>' + 'A Side: ' + data.records[i].aside + '<br>' + 'B Side: ' + data.records[i].bside + '</p>' +
          '<button class="btn-more"><span class="fas fa-angle-down"></span></button>' +
          '<div class="info-sec">' +
          '<h4>Additional Information</h4>' +
          '</div>' +
      '</div>';
  }
  document.getElementById('records').innerHTML = output;
})
.catch(function(error) {
  error.innerText = "Error!"
})

const records = document.getElementById('records');
let song = records.getElementsByClassName('artist-song');
const filterArtistInput = document.getElementById('filterArtistInput');
const filterSongInput = document.getElementById('filterSongInput');
const showMore = document.getElementById("show-more");

filterArtistInput.addEventListener('keyup', filterArtist);

function filterArtist() {
  let filterValue = document.getElementById('filterArtistInput').value.toUpperCase();
  for(i = 0; i < song.length; i++){
    let title = song[i].getElementsByTagName('h3')[0];
    if(title.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
         song[i].style.display = 'block';         
       } else {
         song[i].style.display = 'none';
       }
  }
}

filterSongInput.addEventListener('keyup', filterSong);

function filterSong() {
  let filterValue = document.getElementById('filterSongInput').value.toUpperCase();
  for(i = 0; i < song.length; i++){
    let para = song[i].getElementsByTagName('p')[0];
    if(para.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
         song[i].style.display = 'block';         
       } else {
         song[i].style.display = 'none';
       }
  }
}

function clearInput() {
    document.getElementById("myForm").reset();
}

showMore.addEventListener("click", handleClick);

function handleClick() {
    const songs = document.querySelectorAll(".artist-song");
    let hiddenSongs = [];
    for (let i = 0; i < songs.length; i++) {
        if (songs[i].offsetWidth <= 0 && songs[i].offsetHeight <= 0) {
        hiddenSongs.push(songs[i]);
        }
    }
    for (let i = 0; i < 20; i++) {
        if (hiddenSongs[i]) {
        hiddenSongs[i].style.display = "block";
        } else {
        showMore.style.display = "none";
        break;
        }
    }
    hiddenSongs.length = 0;
}

document.body.onload = function() {
    let toggle = document.getElementsByClassName('btn-more');

    for (let i = 0; i < toggle.length; i++) {
      console.log(toggle[i]);
      toggle[i].addEventListener('click', function () {
        console.log('clicked');
        let itemClass = this.parentNode.className;
        if (itemClass == 'artist-song close') {
          this.parentNode.className = 'artist-song open';
        } else if (itemClass == 'artist-song open') {
          this.parentNode.className = 'artist-song close';
        };
      });
    };
};
