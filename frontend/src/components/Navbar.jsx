import { NavLink } from "react-router-dom";
import {
  useTheme
} from "../context/ThemeContext";

function Navbar() {

  const {
    darkMode,
    toggleTheme
  } = useTheme();

  const navClass = ({ isActive }) => `
  block
  p-3
  rounded-xl
  transition-colors
  duration-200
  ${
    isActive
      ? "bg-blue-600 text-white shadow-lg"
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
  }
`;

const menuItems = [
  {
    path: "/",
    icon: "🏠",
    label: "Dashboard",
  },
  {
    path: "/transactions",
    icon: "💰",
    label: "Transações",
  },
  {
    path: "/categories",
    icon: "📂",
    label: "Categorias",
  },
  {
    path: "/goals",
    icon: "🎯",
    label: "Metas",
  },
  {
    path: "/reports",
    icon: "📄",
    label: "Relatórios",
  },
  {
    path: "/analytics",
    icon: "📊",
    label: "Analytics",
  },
];
  return (
    <aside
  className="
    w-72
    bg-slate-950
    text-white
    min-h-screen
    p-6
    border-r
    border-slate-800
    fixed
  "
>

      <div className="mb-10">

  <h1
    className="
      text-3xl
      font-extrabold
      tracking-tight
    "
  >
    Finance Hub
  </h1>

  <button
  onClick={toggleTheme}
  className="
    w-full
    mb-8
    p-3
    rounded-xl
    bg-slate-800
    hover:bg-slate-700
    transition-colors
    duration-200
  "
>

  {
    darkMode
      ? "☀️ Tema Claro"
      : "🌙 Tema Escuro"
  }

</button>

  <p
    className="
      text-slate-400
      text-sm
      mt-1
    "
  >
    Controle Financeiro
  </p>

</div>

      <nav>
  <ul className="space-y-4">

    {menuItems.map((item) => (

      <li key={item.path}>

        <NavLink
          to={item.path}
          className={navClass}
        >
          <span className="mr-2">
            {item.icon}
          </span>

          {item.label}

        </NavLink>

      </li>

    ))}

  </ul>
</nav>

    </aside>
  );
}

export default Navbar;