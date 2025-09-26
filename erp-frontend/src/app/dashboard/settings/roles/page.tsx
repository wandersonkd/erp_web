'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Role {
  id: string;
  nome: string;
  descricao: string;
  data_criacao: string;
  data_atualizacao: string;
}

export default function RolesPage() {
  const { data: session } = useSession();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState({ nome: '', descricao: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const fetchRoles = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/roles`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      setRoles(response.data);
    } catch (error) {
      console.error('Erro ao buscar roles:', error);
      setSnackbar({ open: true, message: 'Erro ao carregar perfis', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [session, apiUrl]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchRoles();
    }
  }, [session?.accessToken, fetchRoles]);

  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setNewRole({ nome: role.nome, descricao: role.descricao || '' });
    } else {
      setEditingRole(null);
      setNewRole({ nome: '', descricao: '' });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingRole(null);
    setNewRole({ nome: '', descricao: '' });
  };

  const handleSave = async () => {
    try {
      if (editingRole) {
        const response = await axios.patch(`${apiUrl}/roles/${editingRole.id}`, newRole, {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        });
        setRoles(roles.map(role => role.id === editingRole.id ? response.data : role));
        setSnackbar({ open: true, message: 'Perfil atualizado com sucesso', severity: 'success' });
      } else {
        const response = await axios.post(`${apiUrl}/roles`, newRole, {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        });
        setRoles([...roles, response.data]);
        setSnackbar({ open: true, message: 'Perfil criado com sucesso', severity: 'success' });
      }
      handleCloseDialog();
    } catch (error: any) {
      console.error('Erro ao salvar role:', error);
      const message = error.response?.data?.message || 'Erro ao salvar perfil';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este perfil?')) return;
    try {
      await axios.delete(`${apiUrl}/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      setRoles(roles.filter(role => role.id !== id));
      setSnackbar({ open: true, message: 'Perfil excluído com sucesso', severity: 'success' });
    } catch (error: any) {
      console.error('Erro ao deletar role:', error);
      const message = error.response?.data?.message || 'Erro ao excluir perfil';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Perfis de Acesso
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Perfil
        </Button>
      </Box>

      {loading ? (
        <Typography>Carregando...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.nome}</TableCell>
                  <TableCell>{role.descricao}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenDialog(role)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(role.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{editingRole ? 'Editar Perfil' : 'Novo Perfil'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            fullWidth
            variant="outlined"
            value={newRole.nome}
            onChange={(e) => setNewRole({ ...newRole, nome: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            variant="outlined"
            value={newRole.descricao}
            onChange={(e) => setNewRole({ ...newRole, descricao: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}