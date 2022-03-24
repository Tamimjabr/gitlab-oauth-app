import * as React from 'react'
import Card from '@mui/material/Card'
import { blue } from '@mui/material/colors'
import { GitlabUserInfo } from '../intergrations/gitlab-user-info'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'

const ProfileCard = ({ userInfo }: { userInfo: GitlabUserInfo }) => {
  return (
    <Card sx={{
      flex: '0 1 500px', m: 'auto auto', display: 'flex', justifyContent: 'center'
    }}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="center" sx={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Avatar sx={{ bgcolor: blue[500], width: 70, height: 70, m: '1.2rem' }} aria-label="profile image" src={userInfo.avatar_url} />
          <ListItemText
            primary={`${userInfo.name}`}
            secondary={`last activity: ${userInfo.last_activity_on}`}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar >
              <AlternateEmailRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Public Email"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {userInfo.email}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar  >
              <PersonRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="ID"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {userInfo.id}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Card >
  )
}

export default ProfileCard