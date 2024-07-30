import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark border rounded-md p-2 m-2">
      <div className="flex gap-3">
        <Link to="/recipes" className="btn btn-outline-primary">
          Gestionar Recetas
        </Link>
        <Link to="/settings" className="btn btn-outline-primary">
          Configuracion
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
