import React,{useEffect, useState} from 'react'
import styles from'./PlayingBar.module.scss';
import { useSelector,useDispatch } from "react-redux";
import { playSong,pauseSong,changeSong } from "../../Redux/Actions/songActions";

const useAudio = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.songReducer);
    const [audio,setAudio] = useState(new Audio(``));
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    const toggle = () => {
        if (!hasUserInteracted) {
            setHasUserInteracted(true);
        }
        state.play ? dispatch(pauseSong()) : dispatch(playSong());
    };

    //-
    //her şarkı değiştiğinde oto play | not: burada bug var stateyi değiştirmedin
    //audio.addEventListener('DOMAttrModified', audio.play(), true);
    //-
    useEffect(() => {
        if (hasUserInteracted && state.play) {
            audio.play().catch(error => {
                console.log("Playback failed:", error);
            });
        }
    }, [audio, state.play, hasUserInteracted]);

    const handleChangeSong = (path) => {
        dispatch(changeSong(`${process.env.PUBLIC_URL}${path}`));
    }

    useEffect(() => {
        if (hasUserInteracted) {
            audio.pause();
            dispatch(pauseSong());
            setAudio(new Audio(state.songPath));
        }
    }, [state.songPath, hasUserInteracted]);

    useEffect(() => {
        if (hasUserInteracted) {
            state.play ? audio.play().catch(error => {
                console.log("Playback failed:", error);
            }) : audio.pause();
        }
    }, [state.play, hasUserInteracted]);
    
    useEffect(() => {
        audio.addEventListener('ended', () => dispatch(pauseSong()));
        return () => {
            audio.removeEventListener('ended', () => dispatch(pauseSong()));
        };
    }, [audio]);

    return [toggle, handleChangeSong];
};

const PlayingBar = (props) => {
    const [toggle, handleChangeSong] = useAudio();
  
    return (
        <div className={styles.PlayingBar}>
            <button onClick={() => toggle()}>Play/Pause</button>
            <button onClick={() => handleChangeSong("/songs/baris-manco-unutamadim.mp3")}>test</button> 
        </div>
    )
}

export default PlayingBar;