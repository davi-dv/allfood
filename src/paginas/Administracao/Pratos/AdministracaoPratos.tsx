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
import IPrato from "../../../interfaces/IPrato";
export const AdministracaoPratos = () => {
  const [pratos, setpratos] = useState<IPrato[]>([]);
  useEffect(() => {
    http
      .get<IPrato[]>("/pratos/")
      .then((res) => setpratos(res.data))
      .catch((error) => console.log(error));
  }, []);
  const excluir = (prato: IPrato) => {
    http
      .delete(`/pratos/${prato.id}/`)
      .then((res) => {
        const listapratosAtual = pratos.filter(
          (item) => item.id !== prato.id
        );
        setpratos([...listapratosAtual]);
      })
      .catch((error) => console.log(error));
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <a href={prato.imagem} target="_blank" rel="noreferrer">Ver imagem</a>
                </TableCell>
              <TableCell>
                <Link to={`/admin/pratos/${prato.id}`}>Editar</Link>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
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
