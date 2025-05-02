import React from 'react'
import Button from '../Buttons/Button'
import PlayButton from '../Icon/PlayButton'
import MoreIcon from '../Icon/MoreIcon'
import Style from './PlayListSongs.module.scss'
import {useDispatch } from 'react-redux'
import {changeSong} from '../../Redux/Actions/songActions'
import PlayListGrid from './PlayListGrid'

const PlayListSongs = ({playListDetails}) => {
    const dispatch = useDispatch();
    
    if (!playListDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className={Style.Root} >
            <div className={Style.Background}></div>
            <div className={Style.ActionBar}>
                <Button className={Style.PlayButton}><PlayButton  /></Button>
                <Button className={Style.MoreButton}><MoreIcon /></Button>
            </div>
            
            <ul>
                {
                    playListDetails.fetching === true ?
                    "Loading" :
                    playListDetails.fetched === true && 
                    playListDetails.details?.songs?.map(song => (
                        <li key={song.id} className={Style.ListItem} onClick={() => dispatch(changeSong(song.songUrl))}>
                            {song.artist + "-" + song.songName}
                        </li>
                    ))
                }
            </ul>
            <h4>Çalmak istediğiniz şarkıya tıklayınız. Ve şarkının yüklenmesini bekleyiniz.</h4>
            <PlayListGrid></PlayListGrid>
        </div>
    )
}

export default PlayListSongs
