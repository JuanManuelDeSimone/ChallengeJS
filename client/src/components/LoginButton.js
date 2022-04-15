import {useAuth0} from '@auth0/auth0-react'
import {Button, Grid} from '@mui/material'

export default function LoginButton() {
  const {loginWithRedirect} = useAuth0();

  return (
    <div>
      <Grid justify="center">
        <Button onClick={() => loginWithRedirect()} variant="contained">
          Login
        </Button>
      </Grid>
    </div>
  );
}

