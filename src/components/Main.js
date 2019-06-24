import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root'
import { Route, Switch, withRouter } from 'react-router-dom';
import { FullContainer } from "./styles";
import SignUp from './SignUp';
import NoMatch from "./NoMatch";
import LogIn from "./LogIn";

const Main = () => {

  const api = process.env.API || `http://localhost:3000/api/students`;

  const [user, setUser] = useState({
    userId: null,
    isAuthenticated: false,
  });

  const authUser = user => {

    fetch(`${api}/login`,
      {
        method: 'POST',

      }).then()

  };

  return (
    <FullContainer>
      <Switch>
        <Route exact path={`/`} component={LogIn}/>
        <Route path={`/signup`} component={SignUp}/>
        <Route component={NoMatch}/>
      </Switch>
    </FullContainer>
  )

};

export default hot(withRouter(Main));
