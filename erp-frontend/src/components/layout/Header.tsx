'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  InputBase,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@/theme/ThemeProvider';

const drawerWidth = 260;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.common.white, 0.14),
  border: `1px solid ${alpha(theme.palette.common.white, 0.24)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.22),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { toggleTheme, isDark } = useTheme();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundImage: `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 85%)`,
        color: theme.palette.primary.contrastText,
        boxShadow: theme.palette.mode === 'light'
          ? '0 24px 48px -32px rgba(90, 49, 244, 0.65)'
          : '0 24px 48px -28px rgba(0, 0, 0, 0.75)',
        borderBottom: 'none',
        backdropFilter: 'blur(16px)',
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        borderBottomLeftRadius: { xs: 0, sm: 28 },
        borderBottomRightRadius: { xs: 0, sm: 28 },
        '& .MuiToolbar-root': {
          minHeight: 76,
        },
      })}
    >
      <Toolbar disableGutters sx={{ gap: 2 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={(theme) => ({
            mr: 2,
            display: { sm: 'none' },
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.18),
            },
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: '0.04em' }}
        >
          Dashboard
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            sx={(theme) => ({
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.18),
              },
            })}
          >
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            onClick={toggleTheme}
            color="inherit"
            sx={(theme) => ({
              marginX: 1,
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.18),
              },
            })}
          >
            {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={(theme) => ({
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.18),
              },
            })}
          >
            <Avatar>U</Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            sx={{ mt: '45px' }}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Configurações</MenuItem>
            <MenuItem onClick={handleClose}>Sair</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}