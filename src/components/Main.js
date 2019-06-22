import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root'
import { Route, Switch, withRouter } from 'react-router-dom';
import { FullContainer } from "./styles";
import Home from "./Home";
import SignUp from './SignUp';
import NoMatch from "./NoMatch";
import LogIn from "./LogIn";

const Main = props => {

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
