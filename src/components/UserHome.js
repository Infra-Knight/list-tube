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
import TablePagination from '@material-ui/core/TablePagination';

import userLists from '../__mockData__';

const UserHome = ({ userData, setPlayList, history }) => {
  const matchedUser = userLists.find(({ uuid }) => uuid === userData.uuid);
  const reversedPlayList = matchedUser.playList.slice(0).reverse();
  const rows = reversedPlayList;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <div style={{ margin: '15px 0px', display: 'flex', justifyContent: 'center' }}>
        {`Welcome ${userData.name} ${userData.uuid}`}
      </div>
      <div style={{ margin: '15px 0px', display: 'flex', justifyContent: 'center' }}>Select your songs</div>
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
              <TableCell>Artist(s)</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row);
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.youtubeId}
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
                    <TableCell>{row.artists ? row.artists : '-'}</TableCell>
                    <TableCell>{row.gender ? row.gender : '-'}</TableCell>
                    <TableCell>{row.genre ? row.genre : '-'}</TableCell>
                    <TableCell>{row.language ? row.language : '-' }</TableCell>
                    <TableCell>{row.youtubeId}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
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
