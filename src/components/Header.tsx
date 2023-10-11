import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import { logout } from "../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const userMail = useSelector((state: RootState) => state.auth.userMail);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    setAnchorEl(null);
  };
  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#f2f2f2",
      }}
      className="header-shadow header-main"
    >
      <div className="Header">
        <Typography className="header-title" variant="h4">
          Physics Test
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <Typography>{userMail}</Typography>
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
