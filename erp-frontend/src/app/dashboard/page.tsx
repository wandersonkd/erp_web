'use client';
import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    icon: <MonetizationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
];

const salesData = [
  { month: 'Jan', vendas: 4000 },
  { month: 'Fev', vendas: 3000 },
  { month: 'Mar', vendas: 5000 },
  { month: 'Abr', vendas: 4500 },
  { month: 'Mai', vendas: 6000 },
  { month: 'Jun', vendas: 5500 },
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

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {kpiData.map((kpi) => (
          <Box key={kpi.title} sx={{ flex: '1 1 300px', maxWidth: '300px' }}>
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
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Vendas Mensais
        </Typography>
        <Card>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="vendas" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}