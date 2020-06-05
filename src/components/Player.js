import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import { ReactComponent as Hamburger } from '../assets/hamburger_icon.svg';

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

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '3%' }}>
        <div>
          <ReactPlayer
            url={url}
            playing
            controls
            onEnded={nextVideo}
          />
        </div>
        <ul style={{
          margin: 0,
          padding: 0,
          width: '40%',
          height: '100vh',
          overflow: 'scroll',
          listStyle: 'none',
        }}
        >
          {playList.map((item, index) => (
            <li
              key={item.youtubeId}
              style={{
                display: 'flex',
                padding: '10px 20px',
                alignItems: 'center',
                backgroundColor: '#f1f1f1',
              }}
              onDragOver={(e) => onDragOver(e, index)}
            >
              <div className="drag" draggable onDragStart={(e) => onDragStart(e, index)} onDragEnd={onDragEnd} style={{ cursor: 'grab' }}>
                <Hamburger />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={`https://img.youtube.com/vi/${playList[index].youtubeId}/mqdefault.jpg`} alt="Thumbnail" style={{ width: '120px' }} />
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
