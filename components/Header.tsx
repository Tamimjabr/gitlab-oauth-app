import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { GitlabUserInfo } from '../intergrations/gitlab-user-info';
import Link from 'next/link';


const Header = ({ userInfo }: { userInfo: GitlabUserInfo | null }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href='/' passHref>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              OAuth App
            </Typography>
          </Link>
          {userInfo && (
            <>
              <Link href='/profile' passHref>
                <Button color="inherit">
                  <Typography variant="body2" component="span">
                    {userInfo.name}
                  </Typography>
                </Button>
              </Link>
              <Link href='/logout' passHref>
                <Button variant='contained' color='warning'>
                  Logout
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default Header
