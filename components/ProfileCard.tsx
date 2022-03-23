import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GitlabUserInfo } from '../intergrations/gitlab-user-info';




const ProfileCard = ({ userInfo }: { userInfo: GitlabUserInfo }) => {

  return (
    <Card sx={{
      flex: '0 1 500px', m: 'auto auto'
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500], width: 56, height: 56 }} aria-label="profile image" src={userInfo.avatar_url}>
          </Avatar>
        }
        title={`
          ${userInfo.name}
        `}
        subheader={`last activity: ${userInfo.last_activity_on}`}
      />
      < CardContent >
        <Typography variant="body2" color="text.primary">
          username: {userInfo.username}
        </Typography>
        <Typography variant="body2" color="text.primary">
          public email: {userInfo.email}
        </Typography>
      </CardContent >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          ID: {userInfo.id}
        </Typography>
      </CardContent>
    </Card >
  );
}

export default ProfileCard;