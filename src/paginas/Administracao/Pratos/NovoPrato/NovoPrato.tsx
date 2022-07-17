import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import IRestaurante from "../../../../interfaces/IRestaurante";
import ITag from "../../../../interfaces/ITag";
import http from "../../../../services";

export const NovoPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState('');
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [restaurante, setRestaurante] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)
  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("/tags/")
      .then((res) => setTags(res.data.tags))
      .catch((error) => console.log(error));
      http
      .get<IRestaurante[]>("/restaurantes/")
      .then((res) => setRestaurantes(res.data))
      .catch((error) => console.log(error));
  }, []);

  const selecionarArquivo= (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    }
  }
  const submitForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const formData = new FormData()
    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)
    if (imagem) {
      formData.append('imagem', imagem)
    }
    http.request({
      url: '/pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    }).then(res => {
      setDescricao('')
      setNomePrato('')
      setRestaurante('')
      setTag('')
      alert('prato cadastrado com sucesso')
    })
      .catch(error => console.log(error))
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
                Formulário de Pratos
              </Typography>
              <TextField
                id="standard-basic"
                label="Nome do prato"
                variant="standard"
                value={nomePrato}
                onChange={(event) => setNomePrato(event.target.value)}
                fullWidth
                required
                margin="dense"
              />
              <TextField
                margin="dense"
                id="standard-basic"
                label="Descricão"
                variant="standard"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                fullWidth
                required
              />
              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-tag">Tag</InputLabel>
                <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                  {tags.map((tag) => (
                    <MenuItem value={tag.value} key={tag.id}>
                      {tag.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                  {restaurantes.map((restaurante) => (
                    <MenuItem value={restaurante.id} key={restaurante.id}>
                      {restaurante.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input type="file" onChange={evento => selecionarArquivo}/>
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
