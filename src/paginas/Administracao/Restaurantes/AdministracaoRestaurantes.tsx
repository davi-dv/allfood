import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import http from "../../../services/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
export const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  useEffect(() => {
    http
      .get("/restaurantes/")
      .then((res) => setRestaurantes(res.data))
      .catch((error) => console.log(error));
  }, []);
  const excluir = (restaurante: IRestaurante) => {
    http
      .delete(`/restaurantes/${restaurante.id}/`)
      .then((res) => {
        const listaRestaurantesAtual = restaurantes.filter(
          (item) => item.id !== restaurante.id
        );
        setRestaurantes([...listaRestaurantesAtual]);
      })
      .catch((error) => console.log(error));
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(restaurante)}
                >
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
