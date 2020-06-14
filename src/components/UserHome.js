import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';


const UserHome = ({ userData, setPlayList, history }) => {
  const createData = (name, url, youtubeId) => ({ name, url, youtubeId });
  const rows = [
    createData('Starboy', 'https://youtu.be/34Na4j8AVgA', '34Na4j8AVgA'),
    createData('Rockabye', 'https://youtu.be/papuvlVeZg8', 'papuvlVeZg8'),
    createData('Happy Now', 'https://youtu.be/KfXvjxbRhZk', 'KfXvjxbRhZk'),
    createData('Viva La Vida', 'https://youtu.be/dvgZkm1xWPE', 'dvgZkm1xWPE'),
    createData('Stereo Hearts', 'https://youtu.be/T3E9Wjbq44E', 'T3E9Wjbq44E'),
    createData('We Are Young Now', 'https://youtu.be/Sv6dMFF_yts', 'Sv6dMFF_yts'),
    createData('Me and My Broken Heart', 'https://youtu.be/7JJfJgyHYwU', '7JJfJgyHYwU'),
    createData("I don't wanna live forever", 'https://youtu.be/7F37r50VUTQ', '7F37r50VUTQ'),
    createData('Nước mắt em lau bằng tình yêu mới', 'https://youtu.be/GQ4F9k4USfA', 'GQ4F9k4USfA'),
  ];
  const [selected, setSelected] = useState([]);
  const handleClick = (event, rowItem) => {
    const selectedIndex = selected.findIndex((item) => item.youtubeId === rowItem.youtubeId);
    if (selectedIndex === -1) {
      setSelected(selected.concat([rowItem]));
    } else if (selectedIndex === 0) {
      setSelected(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      setSelected(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      const emptyArr = [];
      setSelected(emptyArr.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      ));
    }
  };
  const isSelected = (rowItem) => selected.findIndex(
    (item) => item.youtubeId === rowItem.youtubeId,
  ) !== -1;
  const onClickPlay = () => {
    setPlayList(selected);
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
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Artist(s)</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isItemSelected = isSelected(row);
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.name}
                  role="checkbox"
                  onClick={(event) => handleClick(event, row)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.artists}</TableCell>
                  <TableCell align="right">{row.genre}</TableCell>
                  <TableCell align="right">{row.youtubeId}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button
          variant="contained"
          onClick={onClickPlay}
          disabled={selected.length === 0}
        >
          Play
        </Button>
      </div>
    </>
  );
};

export default UserHome;
