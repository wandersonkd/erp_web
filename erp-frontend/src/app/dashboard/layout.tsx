'use client';
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const drawerWidth = 260;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* O Sidebar fixo à esquerda */}
      <Sidebar />

      {/* O Header e a área de conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
        }}
      >
        <Header />
        {/* Toolbar para criar o espaçamento necessário abaixo do AppBar fixo */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}