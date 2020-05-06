import React, { useState } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import Tilt from 'react-tilt';
import Button from '@material-ui/core/Button';

import Login from './Login';
import UserHome from './UserHome';
import logo from '../assets/blue-youtube-icon-71.png';

const styles = {
  background: {
    width: '100%',
    minHeight: '100vh',
    justifyContent: 'center',
    background: 'linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)',
  },
  button: {
    marginTop: '3ch',
    color: 'dodgerblue',
    borderRadius: '25px',
    backgroundColor: 'aliceblue',
  },
};

const PageControl = () => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <div style={styles.background}>
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10%' }}>
                <Tilt style={{ height: '250px', width: '250px' }}>
                  <img src={logo} alt="Logo" style={{ height: '250px', width: '250px' }} />
                </Tilt>
              </div>
              <div style={{
                textAlign: 'center', fontSize: 'larger', color: 'white',
              }}
              >
                <h1 style={{ fontFamily: 'sans-serif' }}>Welcome to ListTube</h1>
                <h3>Your custom list of Youtube videos</h3>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button style={styles.button} variant="contained" type="button" onClick={() => { props.history.push('/login'); }}>Get started</Button>
              </div>
            </div>
          )}
        />
        <Route
          path="/login"
          exact
          render={
            (props) => (
              <Login
                history={props.history}
                isLoggedIn={isLoggedIn}
                setUserData={setUserData}
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        />
        {isLoggedIn && (
        <Route
          path="/:name"
          exact
          render={
            () => <UserHome userData={userData} />
          }
        />
        )}
      </Switch>
    </Router>
  );
};

export default PageControl;
