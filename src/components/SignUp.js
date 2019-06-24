import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Done from '@material-ui/icons/Done';
import AccountCircle from '@material-ui/icons/AccountCircle';
import School from '@material-ui/icons/School';
import VpnKey from '@material-ui/icons/VpnKey';
import { CenteredHeader1, CenteredHeader2, ColumnFlexBox, FullContainer } from "./styles";
import ErrorModal from './ErrorModal';

const styles = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
});

const SignUp = props => {

  const api = process.env.API || `http://localhost:3000/api/students`;
  const { classes } = props;
  const cohorts = [
    {
      value: 58,
      cohort: 'SEI-PREP[58]'
    },
    {
      value: 59,
      cohort: 'SEI-PREP[59]'
    },
    {
      value: 60,
      cohort: 'SEI-PREP[60]'
    },
  ];

  const [userinfo, setUserinfo] = useState({
    username: '',
    password: '',
    cohort: '',
    submitting: false,
    complete: false
  });

  const [errors, setErrors] = useState({
    type: '',
    message: ''
  });
  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    e.persist();
    setUserinfo(currentState => ({
      ...currentState,
      [e.target.name]: e.target.value
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    console.log('init\n', userinfo)
    const { username, password, cohort } = userinfo;
    // Validation
    // requires '.' between first and last name
    if (!username.includes('.')) {
      // alert('please use the slack naming convention\nlower-cased\n\nExample:\n      jane.smith\n      john.doe');
      setErrors({
        type: 'Invalid username',
        message: `Please use the slack naming convention with lower-cased letters combined with a '.'\n\nExample:\njane.smith`
      });
      setModal(true);
      return;
    }

    const lowerCasedLetters = /^[a-z]+$/;
    const splitName = username.split('.');
    const firstName = splitName[0];
    const lastName = splitName.length > 2 ? splitName[2] : splitName[1];
    const middleName = splitName.length > 2 ? splitName[1] : undefined;
    // lower-cased only user name
    if (!lowerCasedLetters.test(firstName) || !lowerCasedLetters.test(lastName) || (middleName && !lowerCasedLetters.test(middleName))) {
      // alert('lower-cased letters only please');
      setErrors({
        type: 'Invalid username',
        message: `Please use the slack naming convention with LOWER-CASED letters combined with a '.'\n\nExample:\njane.smith`
      });
      setModal(true);
      return;
    }
    // password length of at least 6 chars
    if (password.length < 6) {
      // alert('password must be at least 6 characters');
      setErrors({
        type: 'Invalid password',
        message: `Password must be at least 6 characters long`
      });
      setModal(true);
      return;
    }

    setUserinfo(currentState => ({
      ...currentState,
      submitting: true
    }));

    const url = `${api}/v1/register`;
    const student = { username, password, cohort };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" }
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setUserinfo(currentState => ({
          ...currentState,
          submitting: false
        }));
        // if account exists
        if (resp.message) {
          // alert(`${JSON.stringify(resp.message)}\ntry first.middle.lastName`);
          setErrors({
            type: 'Username taken',
            message: `This account already exists\nYou may try adding a middle name in the case of students with same names\n\nExample:\njane.alice.smith`
          });
          setModal(true);
          return;
        }
        // if some other error
        if (resp.error) {
          // alert(`${JSON.stringify(resp.error)}\nplease contact the administrator`);
          setErrors({
            type: 'Unknown error',
            message: `Please contact your supervising staff`
          });
          setModal(true);
          return;
        }
        // upon success
        // alert(`account creation successful\nplease log in`);
        setErrors({
          type: 'Account created',
          message: `Please log in`
        });
        setModal(true);
        setTimeout(() => {
          setUserinfo(currentState => ({
            ...currentState,
            complete: true
          }));
        }, 1000)
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    userinfo.complete ? <Redirect to={`/`}/>
      :
      <FullContainer id={`signup-container`}>
        <ColumnFlexBox>
          <CenteredHeader2>SEI - PREMIUM PREP</CenteredHeader2>
          <CenteredHeader1>Student Registration</CenteredHeader1>
          <ColumnFlexBox id={`signup-input-container`}>
            <form onSubmit={submit}>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle fontSize={`large`}/>
                  </Grid>
                  <Grid item>
                    <TextField id="input-with-icon-grid" label="username"
                               className={classes.textField} required
                               name={`username`} onChange={handleChange}
                               helperText={`first.last (lower-cased)`}/>
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
                               className={classes.textField}
                               name={`password`} onChange={handleChange}
                               helperText={`at least 6 characters`}/>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <School fontSize={`large`}/>
                  </Grid>
                  <Grid item>
                    <TextField required select label="cohort #"
                               className={classes.textField}
                               name={`cohort`}
                               value={userinfo.cohort}
                               onChange={handleChange}
                               SelectProps={{
                                 native: true,
                                 MenuProps: {
                                   className: classes.menu,
                                 },
                               }}
                               helperText="select your SEI-PREP #">
                      <option/>
                      {
                        cohorts.map(cohort => (
                          <option key={cohort.value} value={cohort.value}>
                            {cohort.cohort}
                          </option>
                        ))
                      }
                    </TextField>
                  </Grid>
                </Grid>
              </div>
              <br/>
              <Button variant="contained" color="default" type={`submit`}
                      fullWidth={true} disabled={userinfo.submitting}>
                sign up
                <Done className={classes.rightIcon}/>
              </Button>
            </form>
          </ColumnFlexBox>
        </ColumnFlexBox>
        <ErrorModal openModal={modal} closeModal={() => setModal(false)}
                    errorType={errors.type} errorMessage={errors.message}/>
      </FullContainer>
  );
};

export default withStyles(styles)(SignUp);
