'use client';
import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const kpiData = [
  {
    title: 'Vendas do Mês',
    value: 'R$ 12.345,67',
    icon: <PointOfSaleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: 'Contas a Pagar Hoje',
    value: 'R$ 1.234,56',
    icon: <ReceiptLongIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: 'Novos Clientes',
    value: '23',
    icon: <PeopleAltIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: 'Lucro Previsto',
    value: 'R$ 4.567,89',
    icon: <AttachMoneyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
];

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo(a) ao seu Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Aqui está um resumo rápido da sua empresa.
      </Typography>

      <Grid container spacing={3}>
        {kpiData.map((kpi) => (
          <Grid item xs={12} sm={6} md={3} key={kpi.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {kpi.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {kpi.value}
                    </Typography>
                  </Box>
                  {kpi.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}