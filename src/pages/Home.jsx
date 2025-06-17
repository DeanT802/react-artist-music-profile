import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Music2, Users, Sparkles } from "lucide-react";
import { getGenres, getGenreData } from "../data/artistsData";
import "./Home.css";

const Home = () => {
  const genres = getGenres();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hero-container">
          <div className="hero-content">
            <motion.div
              className="hero-icon"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Music2 size={80} />
            </motion.div>{" "}
            <h1 className="hero-title">
              Jelajahi Artis
              <span className="hero-highlight"> Legendaris</span>
            </h1>
            <p className="hero-description">
              Jelajahi kehidupan dan warisan ikon musik terbesar di berbagai
              genre. Dari pop tradisional hingga hip-hop modern, temukan cerita
              di balik lagu-lagu tersebut.
            </p>
            <motion.div
              className="hero-stats"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="stat-item" variants={itemVariants}>
                <Users size={24} />
                <span className="stat-number">20+</span>
                <span className="stat-label">Artis</span>
              </motion.div>

              <motion.div className="stat-item" variants={itemVariants}>
                <Music2 size={24} />
                <span className="stat-number">4</span>
                <span className="stat-label">Genre</span>
              </motion.div>

              <motion.div className="stat-item" variants={itemVariants}>
                <Sparkles size={24} />
                <span className="stat-number">100+</span>
                <span className="stat-label">Lagu</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Genres Section */}
      <motion.section
        className="genres-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          {" "}
          <motion.div className="section-header" variants={itemVariants}>
            <h2>Jelajahi Genre Musik</h2>
            <p>Selami era dan gaya musik yang berbeda</p>
          </motion.div>
          <div className="genres-grid">
            {genres.map((genreId) => {
              const genre = getGenreData(genreId);
              return (
                <motion.div
                  key={genreId}
                  className="genre-card"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    rotate: 1,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={`/${genreId}`} className="genre-link">
                    <div className="genre-card-content">
                      <h3 className="genre-title">{genre.name}</h3>
                      <p className="genre-description">
                        {genre.description}
                      </p>{" "}
                      <div className="genre-meta">
                        <span className="artist-count">
                          {genre.artists.length} Artis
                        </span>
                        <motion.div
                          className="genre-arrow"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Featured Artists Section */}
      <motion.section
        className="featured-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          {" "}
          <motion.div className="section-header" variants={itemVariants}>
            <h2>Artis Pilihan</h2>
            <p>Temui beberapa musisi paling berpengaruh dalam sejarah</p>
          </motion.div>
          <div className="featured-grid">
            {[
              { genre: "traditional-pop", artistIndex: 0 },
              { genre: "rock", artistIndex: 0 },
              { genre: "hip-hop", artistIndex: 0 },
              { genre: "jazz", artistIndex: 0 },
            ].map(({ genre, artistIndex }) => {
              const genreData = getGenreData(genre);
              const artist = genreData.artists[artistIndex];

              return (
                <motion.div
                  key={`${genre}-${artistIndex}`}
                  className="featured-card"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <Link to={`/${genre}/${artist.id}`} className="featured-link">
                    <div className="featured-image">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="featured-artist-image"
                      />
                    </div>
                    <div className="featured-content">
                      <h4 className="featured-name">{artist.name}</h4>
                      <p className="featured-genre">{genreData.name}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
