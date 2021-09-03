import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons';
/*              */
const Lista = () => {
    const [listaMusica, setLista] = useState([
        { "id": 1, "category": "game", "name": "Mario Castle", "url": "files/mario/songs/castle.mp3" },
        { "id": 2, "category": "game", "name": "Mario Star", "url": "files/mario/songs/hurry-starman.mp3" },
        { "id": 3, "category": "game", "name": "Mario Overworld", "url": "files/mario/songs/overworld.mp3" }
    ])
    const [music, setMusic] = useState()

    const listItems = listaMusica.map(function (lista, i) {
        return <li key={i}><button onClick={setMusic(lista.url)}>{lista.name}</button></li>
    })

    const reproductor = useRef();

    const [icon, cambiarIcon] = useState(<FontAwesomeIcon icon={faPlay} />)

    function playAudio() {
        if (reproductor.current.paused) {
            reproductor.current.play();
            cambiarIcon(<FontAwesomeIcon icon={faPause} />);
        } else {
            reproductor.current.pause();
            cambiarIcon(<FontAwesomeIcon icon={faPlay} />);
        }
    }

    return (
        <div>
            <ul>
                {listItems}
            </ul>
            <div id="barra">
                <audio ref={reproductor}>
                    <source src={"https://assets.breatheco.de/apis/sound/" + { music }} type="audio/mpeg" />
                </audio>
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