'use client';
import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { alpha } from '@mui/material/styles';

// Importando os ícones
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Vendas', href: '/dashboard/vendas', icon: <ShoppingCartIcon /> },
  { text: 'Compras', href: '/dashboard/compras', icon: <InventoryIcon /> },
  { text: 'Estoque', href: '/dashboard/estoque', icon: <InventoryIcon /> },
  { text: 'Relatórios', href: '/dashboard/relatorios', icon: <AssessmentIcon /> },
  { text: 'Usuários', href: '/dashboard/usuarios', icon: <PeopleIcon /> },
  { text: 'Perfis de Acesso', href: '/dashboard/settings/roles', icon: <SecurityIcon /> },
  { text: 'Configurações', href: '/dashboard/settings', icon: <SettingsIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      sx={(theme) => ({
        width: drawerWidth,
        flexShrink: 0,
        minHeight: '100vh',
        backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.96)} 0%, ${alpha(theme.palette.secondary.main, 0.95)} 100%)`,
        color: theme.palette.common.white,
        boxShadow: theme.shadows[4],
        borderRight: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1200,
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: `radial-gradient(circle at 20% 10%, ${alpha(theme.palette.common.white, 0.18)} 0%, transparent 55%), radial-gradient(circle at 80% 18%, ${alpha(theme.palette.common.white, 0.12)} 0%, transparent 50%)`,
          opacity: 0.9,
        },
      })}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={(theme) => ({
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            backgroundImage: `linear-gradient(120deg, ${alpha(theme.palette.common.white, 0.95)} 0%, ${alpha(theme.palette.common.white, 0.65)} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          ERP VISION
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)', mx: 3 }} />
      <List sx={{ mt: 2, px: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={(theme) => ({
                borderRadius: 14,
                padding: theme.spacing(1.5, 2),
                transition: 'all 0.25s ease',
                color: alpha(theme.palette.common.white, 0.9),
                '& .MuiListItemIcon-root': {
                  color: 'inherit',
                  minWidth: 40,
                },
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.common.white, 0.16),
                  boxShadow: `0 18px 38px -28px ${alpha(theme.palette.common.black, 0.6)}`,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.2),
                  },
                },
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.12),
                  transform: 'translateX(4px)',
                },
              })}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: pathname === item.href ? 600 : 500,
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}