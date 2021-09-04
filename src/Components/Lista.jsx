import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons';

const Lista = () => {
    const [listaMusica, setLista] = useState([
        { "id": 1, "category": "game", "name": "Mario Castle", "url": "files/mario/songs/castle.mp3" },
        { "id": 2, "category": "game", "name": "Mario Star", "url": "files/mario/songs/hurry-starman.mp3" },
        { "id": 3, "category": "game", "name": "Mario Overworld", "url": "files/mario/songs/overworld.mp3" }
    ])

    let reproductor = useRef();

    const [ultimaPosicion, setUltimaPosicion] = useState(null)

    const listItems = listaMusica.map(function (cancion, i) {
        const url = cancion.url
        return <li key={i}><button onClick={() => {reproductor.src = "https://assets.breatheco.de/apis/sound/" + url; setUltimaPosicion(i)}}>{cancion.name}</button></li>
    })
    

    useEffect(() => {
        console.log(reproductor)
    })

    const [icon, cambiarIcon] = useState(<FontAwesomeIcon icon={faPlay} />)

    function playAudio() {
        if (reproductor.paused) {
            reproductor.play();
            cambiarIcon(<FontAwesomeIcon icon={faPause} />);
        } else {
            reproductor.pause();
            cambiarIcon(<FontAwesomeIcon icon={faPlay} />);
        }
    }

    function siguienteCancion() {
        
        if (ultimaPosicion === null || ultimaPosicion === listaMusica.length -1) {
            reproductor.src = "https://assets.breatheco.de/apis/sound/" + listaMusica[0].url;
            setUltimaPosicion(0)
            playAudio()
            return;
        }
        reproductor.src = "https://assets.breatheco.de/apis/sound/" + listaMusica[ultimaPosicion + 1].url;
        playAudio()
        setUltimaPosicion(ultimaPosicion + 1);
            
    }

    function cancionAnterior() {
        
        if (ultimaPosicion === null || ultimaPosicion === listaMusica.length -1) {
            reproductor.src = "https://assets.breatheco.de/apis/sound/" + listaMusica[listaMusica.length-1].url;
            setUltimaPosicion(0)
            playAudio()
            return;
        }
        reproductor.src = "https://assets.breatheco.de/apis/sound/" + listaMusica[ultimaPosicion + 1].url;
        playAudio()
        setUltimaPosicion(ultimaPosicion + 1);
            
    }

    return (
        <div>
            
            <ul>
                {listItems}
            </ul>
            <div id="barra">
                <audio ref={t => reproductor = t}></audio>
                <div id="contBotones">
                    <button id="anterior" className="botones" onClick={cancionAnterior}>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button id="play" className="botones" onClick={playAudio}>
                        {icon}
                    </button>
                    <button id="siguiente" className="botones" onClick={siguienteCancion}>
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>
            </div>
        </div>);
}

export default Lista;