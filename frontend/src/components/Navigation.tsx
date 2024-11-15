import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Typography,
  Box
} from '@material-ui/core'
import { useNavigate } from 'react-router-dom';

import { isAuthenticated, logout } from 'utils/auth'

const useStyles = makeStyles({
  appBar: {
    justifyContent: 'space-between',
    background: 'transparent',
    boxShadow: 'none'
  },
  buttons: {
    color: 'grey',
    fontSize: '20px'
  },
  title: {
    color: 'grey',
    flexGrow: 3
  },
  actions: {
    width: '240px'
  }
})

export const Navigation = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <AppBar className={classes.appBar} position='static'>
      <Toolbar>
        <Typography variant='h4' className={classes.title}>
          Stockfish Chess
        </Typography>
        <Box
          display='flex'
          className={classes.actions}
          justifyContent='flex-end'
        >
          {isAuthenticated()
            ? (
              <Button className={classes.buttons} onClick={() => handleLogout()}>
                Logout
              </Button>
              )
            : (
              <>
                <Button
                  className={classes.buttons}
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
                <Button
                  className={classes.buttons}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </>
              )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
