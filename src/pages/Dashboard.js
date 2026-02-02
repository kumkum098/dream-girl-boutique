import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ImageContext } from '../context/ImageContext';

function Dashboard() {
  const { isLoggedIn, ownerName, logout } = useContext(AuthContext);
  const { uploadedImages, addImages, removeImage } = useContext(ImageContext);
  const navigate = useNavigate();
  const [images, setImages] = useState(uploadedImages);

  // Sync with context
  useEffect(() => {
    setImages(uploadedImages);
  }, [uploadedImages]);

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    // Process each file immediately as it loads
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageObj = {
          id: Date.now() + Math.random(),
          src: event.target.result,
          name: file.name,
          size: (file.size / 1024).toFixed(2),
          uploadedAt: new Date().toLocaleString(),
        };
        // Add image immediately instead of waiting for all files
        addImages([imageObj]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = ''; // Reset input
  };

  const handleDeleteImage = (id) => {
    removeImage(id);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome, {ownerName}!</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.uploadSection}>
        <h2 style={styles.sectionTitle}>Add Product Pictures</h2>
        <label style={styles.uploadLabel}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.fileInput}
          />
          <span style={styles.uploadButton}>
            + Add Pictures
          </span>
        </label>
        <p style={styles.uploadHint}>
          You can select multiple images at once
        </p>
      </div>

      <div style={styles.gallerySection}>
        <h2 style={styles.sectionTitle}>
          Uploaded Pictures ({images.length})
        </h2>

        {images.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No pictures uploaded yet</p>
          </div>
        ) : (
          <div style={styles.gallery}>
            {images.map((image) => (
              <div key={image.id} style={styles.imageCard}>
                <img
                  src={image.src}
                  alt={image.name}
                  style={styles.image}
                />
                <div style={styles.imageInfo}>
                  <p style={styles.imageName}>{image.name}</p>
                  <p style={styles.imageDetails}>
                    {image.size} KB • {image.uploadedAt}
                  </p>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 100px)',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    color: '#333',
  },
  logoutBtn: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  uploadSection: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '20px',
    margin: 0,
  },
  fileInput: {
    display: 'none',
  },
  uploadLabel: {
    display: 'block',
    cursor: 'pointer',
  },
  uploadButton: {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  uploadHint: {
    color: '#666',
    fontSize: '14px',
    marginTop: '10px',
    margin: '10px 0 0 0',
  },
  gallerySection: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  emptyText: {
    color: '#999',
    fontSize: '16px',
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
  },
  imageCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    display: 'block',
  },
  imageInfo: {
    padding: '10px',
  },
  imageName: {
    margin: '0 0 5px 0',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#333',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  imageDetails: {
    margin: '0 0 8px 0',
    fontSize: '11px',
    color: '#666',
  },
  deleteBtn: {
    width: '100%',
    padding: '5px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

export default Dashboard;
