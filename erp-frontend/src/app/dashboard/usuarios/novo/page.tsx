'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function CreateUserPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [roleId, setRoleId] = useState('');
  const [roles, setRoles] = useState<{ id: string; nome: string }[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!nome || !email || !senha) {
      setError('Nome, e-mail e senha são obrigatórios.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      // The backend is expected to be running on port 3000
      const response = await axios.post('http://localhost:3000/usuarios', {
        nome,
        email,
        senha,
        roleId: roleId || undefined,
      });

      if (response.status === 201) {
        // RGN005: Success feedback and redirection
        alert('Usuário criado com sucesso!'); // Placeholder for a toast/snackbar
        // Reset form
        setNome('');
        setEmail('');
        setSenha('');
        setRoleId('');
        // Redirect to user list page
        window.location.href = '/dashboard/usuarios'; // Simple redirection
      }
    } catch (err: any) {
      // RGN006: Error feedback
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Card>
        <CardHeader title="Criar Novo Usuário" />
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Perfil</InputLabel>
              <Select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                label="Perfil"
                disabled={loadingRoles}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Box sx={{ mt: 2, position: 'relative' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                Salvar
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}