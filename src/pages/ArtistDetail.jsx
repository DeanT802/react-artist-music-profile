import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  Music2,
  Calendar,
  MapPin,
  Award,
  ArrowLeft,
  Music,
} from "lucide-react";
import { getGenreData, getArtistData } from "../data/artistsData";
import "./ArtistDetail.css";

const ArtistDetail = () => {
  const { genreId, artistId } = useParams();
  const genreData = getGenreData(genreId);
  const artist = getArtistData(genreId, artistId);

  if (!artist || !genreData) {
    return (
      <div className="artist-detail">
        <div className="container">
          {" "}
          <div className="error-message">
            <h1>Artis Tidak Ditemukan</h1>
            <p>Artis yang diminta tidak dapat ditemukan.</p>
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <div className="artist-detail">
      {/* Navigation Breadcrumb */}
      <motion.div
        className="breadcrumb"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          {" "}
          <Link to="/" className="breadcrumb-link">
            Beranda
          </Link>
          <span className="breadcrumb-separator">→</span>
          <Link to={`/${genreId}`} className="breadcrumb-link">
            {genreData.name}
          </Link>
          <span className="breadcrumb-separator">→</span>
          <span className="breadcrumb-current">{artist.name}</span>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="artist-hero"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container">
          <div className="artist-hero-content">
            {" "}
            <div className="artist-image-section">
              <div className="artist-main-image">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="artist-main-photo"
                />
                <motion.div
                  className="floating-icon"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Music size={24} />
                </motion.div>
              </div>
            </div>
            <div className="artist-info-section">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {" "}
                <h1 className="artist-name">{artist.name}</h1>
                <p className="artist-genre">Artis {genreData.name}</p>
                <div className="artist-basic-info">
                  <div className="info-item">
                    <Calendar size={20} />
                    <span>Lahir: {artist.birthDate}</span>
                  </div>
                  <div className="info-item">
                    <MapPin size={20} />
                    <span>{artist.birthPlace}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <motion.div
        className="artist-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <div className="content-grid">
            {/* Biography Section */}
            <motion.section
              className="biography-section"
              variants={itemVariants}
            >
              {" "}
              <div className="section-card">
                <h2 className="section-title">Biografi</h2>
                <p className="biography-text">{artist.biography}</p>
              </div>
            </motion.section>

            {/* Popular Songs Section */}
            <motion.section className="songs-section" variants={itemVariants}>
              <div className="section-card">
                {" "}
                <h2 className="section-title">Lagu Populer</h2>
                <div className="songs-grid">
                  {artist.popularSongs.map((song, index) => (
                    <motion.div
                      key={index}
                      className="song-item"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="song-icon">
                        <Music size={20} />
                      </div>
                      <span className="song-title">{song}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Achievements Section */}
            <motion.section
              className="achievements-section"
              variants={itemVariants}
            >
              {" "}
              <div className="section-card">
                <h2 className="section-title">Prestasi Utama</h2>
                <div className="achievements-list">
                  {artist.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="achievement-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="achievement-icon">
                        <Award size={20} />
                      </div>
                      <span className="achievement-text">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>

          {/* Back Navigation */}
          <motion.div className="back-navigation" variants={itemVariants}>
            {" "}
            <Link to={`/${genreId}`} className="back-button">
              <ArrowLeft size={20} />
              Kembali ke Artis {genreData.name}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistDetail;
