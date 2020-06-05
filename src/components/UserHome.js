import React from 'react';
import Button from '@material-ui/core/Button';
// import ReactPlayer from 'react-player';

const UserHome = ({ userData, setPlayList, history }) => {
  const onClickPlay = () => {
    setPlayList([
      { name: "I don't wanna live forever", url: 'https://www.youtube.com/watch?v=7F37r50VUTQ', youtubeId: '7F37r50VUTQ' },
      { name: 'Nước mắt em lau bằng tình yêu mới', url: 'https://www.youtube.com/watch?v=GQ4F9k4USfA', youtubeId: 'GQ4F9k4USfA' },
      { name: 'Starboy', url: 'https://www.youtube.com/watch?v=34Na4j8AVgA', youtubeId: '34Na4j8AVgA' },
      { name: 'Rockabye', url: 'https://youtu.be/papuvlVeZg8', youtubeId: 'papuvlVeZg8' },
      { name: 'Viva La Vida', url: 'https://youtu.be/dvgZkm1xWPE', youtubeId: 'dvgZkm1xWPE' },
      { name: 'We Are Young', url: 'https://youtu.be/Sv6dMFF_yts', youtubeId: 'Sv6dMFF_yts' },
      { name: 'Stereo Hearts', url: 'https://youtu.be/T3E9Wjbq44E', youtubeId: 'T3E9Wjbq44E' },
      { name: 'Me and My Broken Heart', url: 'https://youtu.be/7JJfJgyHYwU', youtubeId: '7JJfJgyHYwU' },
      { name: 'Happy Now', url: 'https://youtu.be/KfXvjxbRhZk', youtubeId: 'KfXvjxbRhZk' },
    ]);
    history.push('/play');
  };
  return (
    <>
      <div>
        Welcome
        {' '}
        {userData.name}
        {' '}
        {userData.uuid}
      </div>
      <div>Select songs</div>
      <div>
        <Button
        // style={styles.button}
          variant="contained"
          onClick={onClickPlay}
        >
          Play
        </Button>
      </div>
    </>
  );
};

export default UserHome;
