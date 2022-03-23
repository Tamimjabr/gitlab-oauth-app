import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from 'next/link';

const ProfileTabs = () => {
  const [value, setValue] = React.useState('profile');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Link href='/profile' passHref>
          <Tab
            value="profile"
            label="profile"
            wrapped
          />
        </Link>
        <Link href='/activities' passHref>
          <Tab value="activities" label="activities" />
        </Link>
      </Tabs>
    </Box>
  );
}

export default ProfileTabs