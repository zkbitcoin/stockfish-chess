import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useNavigate, Navigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  game: {
    marginBottom: theme.spacing(1),
  },
}));

export const ActiveGame = ({ gameId }: { gameId: number }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" className={classes.game}>
      <Typography variant="body1">Game {gameId}</Typography>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => navigate(`/game/${gameId}`)}
      >
        Join
      </Button>
    </Box>
  );
};
