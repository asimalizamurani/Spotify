
console.log("Lets write js")
async function getSongs() {

    let a = await fetch("http://192.168.0.110:5500/spotify/songs/");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    // console.log(a);

    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
        
    }

    return songs
}

const playMusic = (track) => {
    let audio = new Audio("/songs/" + track)
    audio.play()
}

async function main () {

    let currentSong = new Audio();

    // Get the list of all the songs
    let songs = await getSongs();
    console.log(songs);

    // Show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        <i class="fa-solid fa-music"></i>
        <div class="info">
            <div> ${song.replaceAll("%20", " ")} </div>
            <div>Asim</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <i class="fa-solid fa-play"></i>
        </div>
 </li>`;
    }

    // Attatch event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=> {
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    /*
    // play the first song
    var audio = new Audio(songs[0]);
    audio.play();
    
    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    });
    */
}

main();

     