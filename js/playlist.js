const url = window.location.search
const params = new URLSearchParams(url)
const id = params.get('id')
//const url2 = window.location.search
//const params2 = new URLSearchParams(url2)



document.addEventListener('DOMContentLoaded', () => {
    fetchPlaylist()
    fetchPlayImagen()
})



const fetchPlaylist = async() => {
    const url = `https://spotify81.p.rapidapi.com/playlist_tracks?id=${id}&offset=0&limit=100`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8608917c9emsh7f5e6b12a812d15p1f34cbjsnbb86019cb253',
		'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);

    let body = ''
        for(let i= 0; i<result.items.length; i++){
            //funcion para la duracion de la cancion 
            let duracion = (result.items[i].track.duration_ms)*0.001
            duracion = duracion/60
            let duracionRedondeado = duracion.toFixed(2)
            body += `<tr>
                        <td>
                        <div class="reproductor">
                           <div class="numero">${i+1}</div>
                            <div class="playspoty"
                                 onclick="playSpoty(event) 
                                 id="playbtn" 
                                 style="color:white;">
                                 <i class="bi bi-play-fill fa-3x"></i>
                            </div>
                            
                        </div>
                        </td>
                        <td>
                            <img src="${result.items[i].track.album.images[2].url}" alt="FotoPlayList">&nbsp;&nbsp;&nbsp;${result.items[i].track.name}<br>
                            <div style="margin-left: 80px;
                                        margin-top: -23px;
                                        color:gray;
                                        display: flex;">
                                <i class="bi bi-explicit-fill"></i> &nbsp
                                <p>${result.items[i].track.artists[0].name}</p>
                            </div>
                        </td>
                        <td>
                            ${result.items[i].track.album.name}
                        </td>
                        <td>
                            ${duracionRedondeado}
                        </td>
                    </tr>`
        }
        document.getElementById('data').innerHTML = body
        

    } catch (error) {
	    console.error(error);
    }
}

const fetchPlayImagen = async() => {
    const url = `https://spotify81.p.rapidapi.com/playlist?id=${id}`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8608917c9emsh7f5e6b12a812d15p1f34cbjsnbb86019cb253',
		'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const data = await response.json();
	console.log(data);
   
    let portada = document.getElementById('fotoAlbum')
    portada.innerHTML = `<img src="${data.images[0].url}" width="200px" top="10px">`
    let name = document.getElementById('nombreAlbum')
    name.innerHTML = `<p style="color: white;">Lista</p><br><h1 style="margin-right: 10px;">${data.name}</h1>`
    

} catch (error) {
	console.error(error);
}
}



//let element = document.getElementById('data')
  //      element.innerHTML = `<p>${result.items[0].track.name}</P>`