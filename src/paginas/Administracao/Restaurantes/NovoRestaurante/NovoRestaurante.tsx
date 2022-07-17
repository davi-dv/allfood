import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import http from "../../../../services/index";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../../interfaces/IRestaurante";

export const NovoRestaurante = () => {
  const parametros = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`/restaurantes/${parametros.id}`)
        .then((res) => setNomeRestaurante(res.data.nome))
        .catch((error) => console.log(error));
    }
  }, [parametros]);
  const submitForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      http
        .put(`/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then((res) => alert("Restaurante atualizado com sucesso"));
    } else {
      http
        .post("/restaurantes/", {
          nome: nomeRestaurante,
        })
        .then((res) => alert("Restaurante cadastrado com sucesso"));
    }
  };
  return (
    <Box>
      <Container max-width="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Box component="form" onSubmit={submitForm} sx={{ width: "100%" }}>
              <Typography component="h1" variant="h6">
                Formulário restaurantes
              </Typography>
              <TextField
                id="standard-basic"
                label="Nome do restaurante"
                variant="standard"
                value={nomeRestaurante}
                onChange={(event) => setNomeRestaurante(event.target.value)}
                fullWidth
                required
              />
              <Button
                variant="outlined"
                type="submit"
                fullWidth
                sx={{ marginTop: 1 }}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
