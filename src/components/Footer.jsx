import { Music2 } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <Music2 size={24} />
            <span className="footer-text">© Dean Prananta 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
