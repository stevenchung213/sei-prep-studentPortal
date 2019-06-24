import React, { useState } from 'react';
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Home from '@material-ui/icons/Home';
import PersonAdd from '@material-ui/icons/PersonAdd';
import { CenteredHeader1, CenteredHeader2, ColumnFlexBox, FullContainer } from "./styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});

const LogIn = props => {

  const api = process.env.API || `http://localhost:3000/api/students`;
  const { classes } = props;

  const [userinfo, setUserinfo] = useState({
    username: '',
    password: '',
    loggingIn: false
  });

  const handleChange = (e) => {
    e.persist();
    setUserinfo(currentState => ({
      ...currentState,
      [e.target.name]: e.target.value
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    setUserinfo(currentState => ({
      ...currentState,
      loggingIn: true
    }));

    const url = `${api}/v1`;
    const { username, password, cohort } = userinfo;
    const student = { username, password, cohort };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setUserinfo(currentState => ({
          ...currentState,
          complete: true
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <FullContainer id={`signup-container`}>
      <ColumnFlexBox id={`signup-input-container`}>
        <CenteredHeader2>SEI - PREMIUM PREP</CenteredHeader2>
        <CenteredHeader1>Student Portal</CenteredHeader1>
        <form onSubmit={submit}>
          <FormControl className={classes.margin}>
            <div className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircle fontSize={`large`}/>
                </Grid>
                <Grid item>
                  <TextField required id="input-with-icon-grid" label="username"
                             name={`username`} onChange={handleChange}/>
                </Grid>
              </Grid>
            </div>
            <div className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <VpnKey fontSize={`large`}/>
                </Grid>
                <Grid item>
                  <TextField required id="input-with-icon-grid" label="password"
                             name={`password`} onChange={handleChange}/>
                </Grid>
              </Grid>
            </div>
            <br/>
            <Button variant="contained" color="default" type={`submit`}>
              log in
              <Home className={classes.rightIcon}/>
            </Button>
            <br/>
            <br/>
            <Button variant="contained" color="primary"
                    component={Link} to={`/signup`}>
              register
              <PersonAdd className={classes.rightIcon}/>
            </Button>
          </FormControl>
        </form>
      </ColumnFlexBox>
    </FullContainer>
  );
};

export default withStyles(styles)(LogIn);
