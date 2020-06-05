import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  background: {
    width: '100%',
    display: 'flex',
    minHeight: '100vh',
    justifyContent: 'center',
    background: 'linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)',
  },
  container: {
    margin: '8% 0',
    width: '40%',
    background: '#fff',
    borderRadius: '10px',
  },
  formWrapper: {
    margin: '70px 0px 20px 0px',
  },
  welcomeText: {
    display: 'flex',
    fontSize: 'larger',
    fontWeight: '900',
    justifyContent: 'center',
  },
  iconColor: { color: 'rgba(0, 0, 0, 0.54)' },
  button: {
    height: '7ch',
    width: '100%',
    marginTop: '3ch',
    borderRadius: '25px',
    backgroundColor: 'aliceblue',
  },
  forgotCredentialsText: {
    color: 'gray',
    display: 'flex',
    marginTop: '1ch',
    justifyContent: 'center',
  },
  createAccountText: {
    marginTop: '5ch', display: 'flex', justifyContent: 'center', color: 'navy',
  },
};

const hashedTable = [
  {
    username: 'user',
    name: 'PowerHour',
    hash: '$2a$10$18oZsmKLWa0h1BPSLcM33e5nW64eS6LctYCZmq6wOHwQFaD5tyEJa',
    uuid: '8866d308-f3ae-4eb2-9f9f-e7e034cfd1f5',
  },
];

const TextFieldWrapper = styled(TextField)`
  fieldset {
    border-radius: 25px;
  }
`;

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const TextWithPopover = ({ text, popoverText }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {text}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography style={{ color: 'red' }}>{popoverText}</Typography>
      </Popover>
    </>
  );
};

const LoginPage = ({ history, setIsLoggedIn, setUserData }) => {
  const [values, setValues] = useState({ username: '', password: '', showPassword: false });
  const handleChange = (type) => (event) => setValues({ ...values, [type]: event.target.value });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const [isWrongUsername, setIsWrongUsername] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState(null);
  const [passwordHelperText, setPasswordHelperText] = useState(null);
  const onClickLogin = () => {
    const usernameAndHashObject = hashedTable.find((obj) => obj.username === values.username);
    if (usernameAndHashObject !== undefined) {
      setIsWrongUsername(false);
      setUsernameHelperText(null);
      const comparePass = bcrypt.compareSync(values.password, usernameAndHashObject.hash);
      if (comparePass === true) {
        setIsLoggedIn(true);
        setUserData({
          username: usernameAndHashObject.username,
          name: usernameAndHashObject.name,
          uuid: usernameAndHashObject.uuid,
        });
        history.push('/home');
      } setIsWrongPassword(true); setPasswordHelperText('Incorrect password');
    } else { setIsWrongUsername(true); setUsernameHelperText('Incorrect username'); }
    return null;
  };
  const onKeyPressed = (event) => {
    if (event.key === 'Enter') {
      onClickLogin();
    }
  };
  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.welcomeText}>Member Login</div>
          <div style={{ margin: '5ch 7ch' }}>
            <TextFieldWrapper
              label="Username"
              variant="outlined"
              style={{ width: '100%' }}
              onKeyPress={onKeyPressed}
              onChange={handleChange('username')}
              error={isWrongUsername}
              helperText={usernameHelperText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon style={styles.iconColor} />
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldWrapper
              label="Password"
              variant="outlined"
              value={values.password}
              style={{ width: '100%', marginTop: '2ch' }}
              onKeyPress={onKeyPressed}
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              error={isWrongPassword}
              helperText={passwordHelperText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon style={styles.iconColor} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword
                          ? <Visibility style={styles.iconColor} />
                          : <VisibilityOff style={styles.iconColor} />}
                      </IconButton>
                    </InputAdornment>
                  </>
                ),
              }}
            />
            <Button
              style={styles.button}
              variant="contained"
              onClick={onClickLogin}
            >
              Log in
            </Button>
            <div style={styles.forgotCredentialsText}>
              <TextWithPopover text="Forgot Username / Password?" popoverText="Ohh that's bad :((" />
            </div>
            <div style={styles.createAccountText}>
              <TextWithPopover text="Create your account" popoverText="No can do :))" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
