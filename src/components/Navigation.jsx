import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Music } from "lucide-react";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "Beranda" },
    { path: "/traditional-pop", label: "Traditional Pop" },
    { path: "/rock", label: "Rock" },
    { path: "/hip-hop", label: "Hip Hop" },
    { path: "/jazz", label: "Jazz" },
  ];

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-container">
        {" "}
        <Link to="/" className="nav-logo">
          <Music size={28} />
          <span>Profil Artis</span>
        </Link>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <motion.li
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navigation;
