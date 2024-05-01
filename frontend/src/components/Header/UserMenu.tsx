import {Button, Menu, MenuItem} from '@mui/material';
import {UserFromDb} from '../../types';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

interface Props {
  user: UserFromDb
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color='inherit'
        onClick={handleClick}
      >
        Hello {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to='/trackHistory' onClick={handleClose}>Track History</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;