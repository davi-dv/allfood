import { Routes, Route } from "react-router-dom";
import { HomeAdmin } from "./paginas/Administracao/Home/homeAdmin";
import { NovoRestaurante } from "./paginas/Administracao/Restaurantes/NovoRestaurante/NovoRestaurante";
import { AdministracaoPratos } from "./paginas/Administracao/Pratos/AdministracaoPratos";
import { NovoPrato } from "./paginas/Administracao/Pratos/NovoPrato/NovoPrato";
import { AdministracaoRestaurantes } from "./paginas/Administracao/Restaurantes/AdministracaoRestaurantes";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<HomeAdmin/>}>
        <Route
          path="restaurantes"
          element={<AdministracaoRestaurantes />}
        />
        <Route path="restaurantes/novo" element={<NovoRestaurante />} />
        <Route path="restaurantes/:id" element={<NovoRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/Novo" element={<NovoPrato />} />

      </Route>
    </Routes>
  );
}

export default App;
