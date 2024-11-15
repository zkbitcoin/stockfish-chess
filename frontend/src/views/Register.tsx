import React, { useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Fingerprint } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useNavigate, Navigate } from 'react-router-dom';

import { signUp, isAuthenticated } from 'utils/auth';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
  button: {
    textTransform: 'none',
  },
  marginTop: {
    marginTop: 10,
  },
}));

export const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState(true);

  const handleSubmit = async (_: React.MouseEvent) => {
    // Password confirmation validation
    if (password !== passwordConfirmation) setError('Passwords do not match');
    else {
      setError('');
      try {
        const data = await signUp(email, password, passwordConfirmation);

        if (data) {
            navigate('/');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          // handle errors thrown from frontend
          setError(err.message);
        } else {
          // handle errors thrown from backend
          setError(String(err));
        }
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
      navigate('/');
  };

  return isAuthenticated() ? (
    <Navigate to="/" />
  ) : (
    <Dialog
      className={classes.padding}
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
                fullWidth
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.currentTarget.value)
                }
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="passwordConfirmation"
                label="Confirm password"
                type="password"
                value={passwordConfirmation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPasswordConfirmation(e.currentTarget.value)
                }
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          <Grid container alignItems="center">
            {error && (
              <Grid item>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
          </Grid>
          <Grid container justify="center" className={classes.marginTop}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};
