import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import { ReactComponent as Hamburger } from '../assets/hamburger_icon.svg';

const styles = {
  wrapper: {
    display: 'flex',
    margin: '4vh 3vw 0 3vw',
    justifyContent: 'space-between',
  },
  vieoWrapper: {
    width: '60vw',
    height: '33.75vw',
  },
  unorderedList: {
    margin: 0,
    padding: 0,
    width: '33vw',
    height: '96vh',
    listStyle: 'none',
    overflow: 'scroll',
  },
  list: {
    display: 'flex',
    padding: '10px',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderTop: '1px solid lightgrey',
  },
  currentSong: {
    padding: '7px',
    display: 'flex',
    border: 'groove',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  imgAndTextWrapper: {
    outline: 'none',
    display: 'flex',
    cursor: 'pointer',
    fontWeight: '600',
    alignItems: 'center',
  },
  img: {
    width: '120px',
    marginRight: '15px',
  },
};

const Player = ({ playList, setPlayList }) => {
  const [currentSongItem, setCurrentSongItem] = useState(playList[0]);
  const [url, setUrl] = useState(currentSongItem.url);
  const nextVideo = () => {
    const currentSongIndex = playList.findIndex((item) => item === currentSongItem);
    if (currentSongIndex === playList.length - 1) {
      setCurrentSongItem(playList[0]);
      setUrl(playList[0].url);
      return;
    }
    setCurrentSongItem(playList[currentSongIndex + 1]);
    setUrl(playList[currentSongIndex + 1].url);
  };
  const [draggedItem, setDraggedItem] = useState();
  const onDragStart = (e, index) => {
    setDraggedItem(playList[index]);
    e.dataTransfer.effectAllowed = 'move';
    // For Firefox
    e.dataTransfer.setData('text/html', e.target.parentNode);
    // For Chrome
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };
  const onDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverItem = playList[index];
    // If the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }
    // Filter out the currently dragged item
    const items = playList.filter((item) => item !== draggedItem);
    // Add the dragged item after the dragged over item
    items.splice(index, 0, draggedItem);
    setPlayList(items);
  };
  const onDragEnd = () => {
    setDraggedItem(null);
  };
  const onClick = (item) => {
    setCurrentSongItem(item);
    setUrl(item.url);
  };

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.vieoWrapper}>
          <ReactPlayer
            url={url}
            playing
            controls
            width="100%"
            height="100%"
            onEnded={nextVideo}
          />
        </div>
        <ul style={styles.unorderedList}>
          {playList.map((item, index) => (
            <li
              key={item.youtubeId}
              onDragOver={(e) => onDragOver(e, index)}
              style={item === currentSongItem ? styles.currentSong : styles.list}
            >
              <div
                draggable
                className="drag"
                onDragEnd={onDragEnd}
                onDragStart={(e) => onDragStart(e, index)}
                style={{ cursor: 'grab', marginRight: '10px' }}
              >
                <Hamburger />
              </div>
              <div
                tabIndex={0}
                role="button"
                onKeyDown={() => null}
                onClick={() => onClick(item)}
                style={styles.imgAndTextWrapper}
              >
                <img
                  alt="Thumbnail"
                  style={styles.img}
                  src={`https://img.youtube.com/vi/${playList[index].youtubeId}/mqdefault.jpg`}
                />
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Player;
