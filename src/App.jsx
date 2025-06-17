import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GenrePage from "./pages/GenrePage";
import ArtistDetail from "./pages/ArtistDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:genreId" element={<GenrePage />} />
            <Route path="/:genreId/:artistId" element={<ArtistDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
