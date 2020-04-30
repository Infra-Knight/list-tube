import React, { useState } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

import Login from './Login';
import UserHome from './UserHome';

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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div>Welcome to ListTube</div>
              <button type="button" onClick={() => { props.history.push('/login'); }}>Login</button>
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
