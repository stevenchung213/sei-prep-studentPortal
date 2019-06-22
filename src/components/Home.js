import React from 'react';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { ColumnFlexBox, CenteredHeader1, CenteredHeader2 } from "./styles";

const Home = () => {

  return (
    <ColumnFlexBox id={`home-container`}>
      <CenteredHeader2>SEI - PREMIUM PREP</CenteredHeader2>
      <CenteredHeader1>Student Portal</CenteredHeader1>
      <br/>
      <Button variant="contained" color="default" fullWidth={true}
              component={Link} to={`/login`} size={`large`}>
        log in
      </Button>
      <br/>
      <Button variant="contained" color="default" fullWidth={true}
              component={Link} to={`/signup`} size={`large`}>
        sign up
      </Button>
    </ColumnFlexBox>
  );
};

export default Home;
