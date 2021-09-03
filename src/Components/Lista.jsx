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

    const listItems = listaMusica.map(function (cancion, i) {
        const url = cancion.url
        return <li key={i}><button onClick={() => {reproductor.src = "https://assets.breatheco.de/apis/sound/" + url}}>{cancion.name}</button></li>
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
        if (reproductor) {

        }
    }

    return (
        <div>
            
            <ul>
                {listItems}
            </ul>
            <div id="barra">
                <audio ref={t => reproductor = t}></audio>
                <div id="contBotones">
                    <button id="anterior" className="botones" /* onClick={ } */>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button id="play" className="botones" onClick={playAudio}>
                        {icon}
                    </button>
                    <button id="siguiente" className="botones" /* onClick={ } */>
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>
            </div>
        </div>);
}

export default Lista;