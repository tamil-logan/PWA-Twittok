import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import auth from './auth-helper';
import {Redirect} from 'react-router-dom';
import {signin} from './auth-helper';
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
 error: {
    verticalAlign: 'middle'
  }
}))


export function Login(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    username: 'saeed',
    password: 'pass',
    error: '',
    redirectToReferrer: false,
    errorMessage: ''
})

const clickSubmit = () => {
  const user = {
    username: values.username || undefined,
    password: values.password || undefined
  }

  signin(user).then((data) => {
    if (data.value) {
      setValues({ ...values, error: data.value})   
    } else {
      auth.authenticate(data, () => {
        setValues({ ...values, error: '',redirectToReferrer: true})
        
      })
    }
  })
}

const handleChange = name => event => {
  setValues({ ...values, [name]: event.target.value })
}

const {from} = props.location.state || {
    from: {
      pathname: '/'
    }
}
const {redirectToReferrer} = values
  if (redirectToReferrer) {
    return (<Redirect to={from}/>)
}

  
  return (
      <div className="base-container">
        <Grid item xs={12} sm={12}>
        <div className="header addon marginnew">Welcome to TwitTok.</div>
        <div className="header lato">Open the new creative world.</div>
        <div className="header editlato">It's all here.</div>

        <div className="header subadd">Sign-In to Twit-Tok</div>
        <div className="content">
          <div className="form">
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={handleChange('username')}
                value={values.username}
              />
             
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange('password')}
                value={values.password}
              />
          </div>
        </div>
        <div className="footer">
          <button onClick={clickSubmit} type="button" className="btn loginbtn">
            Login
          </button>
          {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>Error:{values.error}</Icon>
            </Typography>)
          }
         
        </div>
        </Grid>
      </div>
    );
  }

