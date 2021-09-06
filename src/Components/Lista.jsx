import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons';

const Lista = () => {

    const [listaMusica, setListaMusica] = useState([])
    const [ultimaPosicion, setUltimaPosicion] = useState(null)
    const [icon, cambiarIcon] = useState(<FontAwesomeIcon icon={faPlay} />)

    let reproductor = useRef();

    useEffect(() => {
        getMusic();
    }, [])

    const getMusic = () => {
        fetch("https://assets.breatheco.de/apis/sound/songs")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setListaMusica(data);
            });
    }

    const listItems = listaMusica.map(function (cancion, i) {
        const url = cancion.url
        return <li key={i}><button className="btnMusic" onClick={() => { reproductor.src = "https://assets.breatheco.de/apis/sound/" + url; setUltimaPosicion(i); playAudio() }}>{cancion.name}</button></li>
    })

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

        if (ultimaPosicion === null || ultimaPosicion === listaMusica.length - 1) {
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

        if (ultimaPosicion === null || ultimaPosicion === 0) {
            reproductor.src = "https://assets.breatheco.de/apis/sound/" + listaMusica[listaMusica.length - 1].url;
            setUltimaPosicion(listaMusica.length - 1)
            playAudio()
            return;
        }
        reproductor.src = "https://assets.breatheco.de/apis/sound/" + listaMusica[ultimaPosicion - 1].url;
        playAudio()
        setUltimaPosicion(ultimaPosicion - 1);

    }

    return (
        <div>
            <div className="conLista">
            <ul>
                {listItems}
            </ul>
            </div>
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