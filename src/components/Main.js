import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root'
import { Route, Switch, withRouter } from 'react-router-dom';
import { FullContainer } from "./styles";
import Home from "./Home";
import SignUp from './SignUp';
import NoMatch from "./NoMatch";
import LogIn from "./LogIn";

const Main = () => {

  const api = process.env.API || `http://localhost:3000/api/v1`;

  const [user, setUser] = useState({
    username: null,
    auth: false,
  });

  const authUser = user => {

    fetch(`${api}`,
      {
        method: 'POST',

      }).then()

  };

  return (
    <FullContainer>
      <Switch>
        <Route exact path={`/`} component={Home}/>
        <Route path={`/signup`} component={SignUp}/>
        <Route path={`/login`} component={LogIn}/>
        <Route component={NoMatch}/>
      </Switch>
    </FullContainer>
  )

};

export default hot(withRouter(Main));
