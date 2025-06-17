import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Music2, Calendar, MapPin, ArrowRight } from "lucide-react";
import { getGenreData } from "../data/artistsData";
import "./GenrePage.css";

const GenrePage = () => {
  const { genreId } = useParams();
  const genreData = getGenreData(genreId);

  if (!genreData) {
    return (
      <div className="genre-page">
        <div className="container">
          {" "}
          <div className="error-message">
            <h1>Genre Tidak Ditemukan</h1>
            <p>Genre yang diminta tidak dapat ditemukan.</p>
            <Link to="/" className="back-link">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="genre-page">
      {/* Header Section */}
      <motion.section
        className="genre-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container">
          <div className="genre-header-content">
            <motion.div
              className="genre-icon"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Music2 size={60} />
            </motion.div>
            <h1 className="genre-title">{genreData.name}</h1>
            <p className="genre-description">{genreData.description}</p>{" "}
            <div className="genre-stats">
              <div className="stat">
                <span className="stat-number">{genreData.artists.length}</span>
                <span className="stat-label">Artis Unggulan</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Artists Grid */}
      <motion.section
        className="artists-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          {" "}
          <motion.h2 className="section-title" variants={itemVariants}>
            Artis Unggulan
          </motion.h2>
          <div className="artists-grid">
            {genreData.artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                className="artist-card"
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {" "}
                <Link to={`/${genreId}/${artist.id}`} className="artist-link">
                  <div className="artist-image">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="artist-photo"
                    />
                    <div className="artist-overlay">
                      <ArrowRight size={24} />
                    </div>
                  </div>

                  <div className="artist-content">
                    <h3 className="artist-name">{artist.name}</h3>
                    <div className="artist-meta">
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>{artist.birthDate}</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={16} />
                        <span>{artist.birthPlace}</span>
                      </div>
                    </div>
                    <p className="artist-bio">
                      {artist.biography.substring(0, 120)}...
                    </p>{" "}
                    <div className="popular-songs">
                      <h4>Lagu Populer:</h4>
                      <ul>
                        {artist.popularSongs
                          .slice(0, 2)
                          .map((song, songIndex) => (
                            <li key={songIndex}>{song}</li>
                          ))}
                        {artist.popularSongs.length > 2 && (
                          <li className="more-songs">
                            +{artist.popularSongs.length - 2} lainnya
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default GenrePage;
