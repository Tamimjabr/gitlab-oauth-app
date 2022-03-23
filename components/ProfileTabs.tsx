import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useRouter } from 'next/router'

const ProfileTabs = () => {
  const router = useRouter()

  const [value, setValue] = useState(router.asPath);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue)
  };

  return (
    <Box sx={{ width: '100%', m: 'auto', display: 'flex', justifyContent: 'space-around' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ m: 'auto' }}
      >
        <Tab
          value="/profile"
          label="profile"
        />
        <Tab value="/activities" label="activities" />
      </Tabs>
    </Box>
  );
}

export default ProfileTabs