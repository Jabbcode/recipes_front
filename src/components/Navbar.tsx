import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark border rounded-md p-2 m-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/recipes">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Recetas
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/my-store">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Mi Almacen
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/planning">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Planificacion
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
export default Navbar;
