import {
  AppBar,
  Box,
  Button,
  Typography,
  Container,
  Toolbar,
  Link,
  Paper,
} from "@mui/material";
import { Link as routerLink, Outlet } from "react-router-dom";
export const HomeAdmin = () => {
  return (
    <>
      <AppBar position="static">
        <Container max-width="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={routerLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={routerLink} to="/admin/restaurantes/Novo">
                <Button sx={{ my: 2, color: "white" }}>Novo restaurante</Button>
              </Link>
              <Link component={routerLink} to="/admin/pratos/Novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Prato</Button>
              </Link>
              <Link component={routerLink} to="/admin/pratos">
                <Button sx={{ my: 2, color: "white" }}>Pratos</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container max-width="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
              {/* conteudo das rotas filhas do react-router-dom */}
              <Outlet/>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
