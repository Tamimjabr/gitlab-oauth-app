import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { GitlabUserInfo } from '../intergrations/gitlab-user-info'
import Link from 'next/link'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useMediaQuery from '@mui/material/useMediaQuery'


const Header = ({ userInfo }: { userInfo: GitlabUserInfo | null }) => {
  const matches = useMediaQuery('(max-width:400px)')

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
            <Link href='/' passHref >
              <Button color="inherit">
                <Typography variant="h5" component="div" > OAuth App
                </Typography>
              </Button>
            </Link>
          </Typography>
          {userInfo && (
            <Box sx={{ display: 'flex', flexDirection: matches ? 'column' : 'row' }}>
              <Link href='/profile' passHref>
                <Button color="inherit">
                  <Typography variant="body2" component="span">
                    {userInfo.name}
                  </Typography>
                </Button>
              </Link>
              <Link href='/logout' passHref>
                <Button variant='contained' color='secondary' sx={{ m: 'auto 0 auto 2rem', fontWeight: '600' }} >
                  Logout < LogoutRoundedIcon sx={{ m: 'auto 0 auto 0.5rem' }} />
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar >
    </Box >
  )
}


export default Header
