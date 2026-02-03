import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';
import { ShopStatusContext } from '../context/ShopStatusContext';

function CustomerDetails() {
  const { isLoggedIn } = useContext(AuthContext);
  const { savedOrders, addOrder, deleteOrder } = useContext(OrderContext);
  const { isOpen, toggleShopStatus } = useContext(ShopStatusContext);
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    productName: '',
    price: '',
    paymentStatus: false,
  });

  const [productImage, setProductImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [collectionImages, setCollectionImages] = useState([]);
  const [showCollectionSection, setShowCollectionSection] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Validation functions
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  };

  const validatePrice = (price) => {
    return !isNaN(price) && price > 0;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product Name is required';
    }

    if (!productImage) {
      newErrors.productImage = 'Product Image is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (!validatePrice(formData.price)) {
      newErrors.price = 'Price must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImage(event.target.result);
        if (errors.productImage) {
          setErrors((prev) => ({
            ...prev,
            productImage: '',
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessMessage('Customer details saved successfully!');
      
      // Save order to context
      addOrder({
        ...formData,
        productImage,
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          phone: '',
          address: '',
          productName: '',
          price: '',
          paymentStatus: false,
        });
        setProductImage(null);
        setSuccessMessage('');
        setShowForm(false);
      }, 2000);
    }
  };

  const handleCollectionImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setCollectionImages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              src: event.target.result,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const deleteCollectionImage = (id) => {
    setCollectionImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      productName: '',
      price: '',
      paymentStatus: false,
    });
    setProductImage(null);
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Customer Orders</h1>
        <p style={styles.subtitle}>Manage customer and order information</p>
      </div>

      {/* Shop Status Management */}
      <section style={styles.shopStatusSection}>
        <div style={styles.shopStatusContent}>
          <div style={styles.shopStatusInfo}>
            <h3 style={styles.shopStatusTitle}>Shop Status</h3>
            <p style={{...styles.shopStatusLabel, color: isOpen ? '#155724' : '#721c24'}}>
              {isOpen ? '✅ Currently OPEN' : '🔒 Currently CLOSED'}
            </p>
          </div>
          <button
            onClick={toggleShopStatus}
            style={{
              ...styles.toggleStatusBtn,
              backgroundColor: isOpen ? '#ff7eb3' : '#28a745',
            }}
          >
            {isOpen ? 'Close Shop' : 'Open Shop'}
          </button>
        </div>
      </section>

      {successMessage && (
        <div style={styles.successMessage}>{successMessage}</div>
      )}

      {/* Saved Orders Section */}
      {savedOrders.length > 0 && (
        <section style={styles.ordersSection}>
          <h2 style={styles.sectionTitle}>Saved Orders ({savedOrders.length})</h2>
          <div style={styles.ordersList}>
            {savedOrders.map((order) => (
              <div key={order.id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <h3 style={styles.orderCustomerName}>{order.fullName}</h3>
                  <span style={styles.orderDate}>{order.createdAt}</span>
                </div>

                <div style={styles.orderContent}>
                  <div style={styles.orderInfo}>
                    <p>
                      <strong>Phone:</strong> {order.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.address}
                    </p>
                    <p>
                      <strong>Product:</strong> {order.productName}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{parseFloat(order.price).toFixed(2)}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>
                      <span
                        style={{
                          ...styles.paymentStatusBadge,
                          backgroundColor: order.paymentStatus ? '#28a745' : '#ffc107',
                        }}
                      >
                        {order.paymentStatus ? '✓ Paid' : 'Pending'}
                      </span>
                    </p>
                  </div>

                  {order.productImage && (
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      style={styles.orderProductImage}
                    />
                  )}
                </div>

                <button
                  onClick={() => deleteOrder(order.id)}
                  style={styles.deleteOrderBtn}
                >
                  🗑️ Delete Order
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Add Order Button */}
      {!showForm && !showCollectionSection && (
        <div style={styles.buttonContainer}>
          <button
            onClick={() => setShowForm(true)}
            style={styles.addOrderBtn}
          >
            + Add New Order
          </button>
          <button
            onClick={() => setShowCollectionSection(true)}
            style={styles.collectionBtn}
          >
            🖼️ Manage Collection
          </button>
        </div>
      )}

      {/* Product Collection Section */}
      {showCollectionSection && (
        <section style={styles.collectionSection}>
          <div style={styles.collectionHeader}>
            <h2>Manage Product Collection</h2>
            <button
              type="button"
              onClick={() => setShowCollectionSection(false)}
              style={styles.closeBtn}
            >
              ✕
            </button>
          </div>

          <div style={styles.uploadCollectionArea}>
            <h3 style={styles.uploadTitle}>Add Product Images</h3>
            <div style={styles.imageUploadContainer}>
              <input
                type="file"
                id="collectionImages"
                multiple
                accept="image/*"
                onChange={handleCollectionImageUpload}
                style={styles.fileInput}
              />
              <label htmlFor="collectionImages" style={styles.fileLabel}>
                <span style={styles.uploadIcon}>📷</span>
                <span>Click to upload multiple images</span>
                <span style={styles.uploadHint}>(Select one or multiple images)</span>
              </label>
            </div>
          </div>

          {collectionImages.length > 0 && (
            <div style={styles.collectionGallery}>
              <h3 style={styles.galleryTitle}>Product Gallery ({collectionImages.length})</h3>
              <div style={styles.galleryGrid}>
                {collectionImages.map((image) => (
                  <div key={image.id} style={styles.galleryItem}>
                    <img src={image.src} alt="Collection" style={styles.galleryImage} />
                    <button
                      type="button"
                      onClick={() => deleteCollectionImage(image.id)}
                      style={styles.deleteImageBtn}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={styles.collectionActions}>
            <button
              type="button"
              onClick={() => setShowCollectionSection(false)}
              style={styles.doneBtn}
            >
              Done
            </button>
          </div>
        </section>
      )}

      {/* Form Section */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formHeader}>
            <h2>Add Customer Details</h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={styles.closeFormBtn}
            >
              ✕
            </button>
          </div>

          {/* Customer Information Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Customer Information</h2>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="fullName">
              Full Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter customer's full name"
              style={{
                ...styles.input,
                borderColor: errors.fullName ? '#dc3545' : '#ddd',
              }}
            />
            {errors.fullName && (
              <span style={styles.error}>{errors.fullName}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="phone">
              Phone Number <span style={styles.required}>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter 10-digit phone number"
              style={{
                ...styles.input,
                borderColor: errors.phone ? '#dc3545' : '#ddd',
              }}
            />
            {errors.phone && (
              <span style={styles.error}>{errors.phone}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="address">
              Address <span style={styles.required}>*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter complete address including street, city, postal code"
              rows="4"
              style={{
                ...styles.textarea,
                borderColor: errors.address ? '#dc3545' : '#ddd',
              }}
            />
            {errors.address && (
              <span style={styles.error}>{errors.address}</span>
            )}
          </div>
        </section>

        {/* Product Information Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Product Information</h2>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="productName">
              Product Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="e.g., Bridal Lehenga, Party Dress, etc."
              style={{
                ...styles.input,
                borderColor: errors.productName ? '#dc3545' : '#ddd',
              }}
            />
            {errors.productName && (
              <span style={styles.error}>{errors.productName}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="productImage">
              Product Image <span style={styles.required}>*</span>
            </label>
            <div style={styles.imageUploadContainer}>
              <input
                type="file"
                id="productImage"
                accept="image/*"
                onChange={handleImageUpload}
                style={styles.fileInput}
              />
              <label htmlFor="productImage" style={styles.fileLabel}>
                <span style={styles.uploadIcon}>📷</span>
                <span>Click to upload product image</span>
              </label>
            </div>
            {errors.productImage && (
              <span style={styles.error}>{errors.productImage}</span>
            )}

            {productImage && (
              <div style={styles.imagePreviewContainer}>
                <img
                  src={productImage}
                  alt="Product Preview"
                  style={styles.imagePreview}
                />
                <button
                  type="button"
                  onClick={() => setProductImage(null)}
                  style={styles.removeImageBtn}
                >
                  ✕ Remove Image
                </button>
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="price">
              Price <span style={styles.required}>*</span>
            </label>
            <div style={styles.priceInputWrapper}>
              <span style={styles.currencySymbol}>₹</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                style={{
                  ...styles.priceInput,
                  borderColor: errors.price ? '#dc3545' : '#ddd',
                }}
              />
            </div>
            {errors.price && (
              <span style={styles.error}>{errors.price}</span>
            )}
          </div>
        </section>

        {/* Payment Status Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Payment Status</h2>

          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="paymentStatus"
              name="paymentStatus"
              checked={formData.paymentStatus}
              onChange={handleInputChange}
              style={styles.checkbox}
            />
            <label style={styles.checkboxLabel} htmlFor="paymentStatus">
              Payment Received / Paid
            </label>
          </div>

          <div style={styles.paymentStatusIndicator}>
            <span style={styles.statusLabel}>Current Status:</span>
            <span
              style={{
                ...styles.statusBadge,
                backgroundColor: formData.paymentStatus ? '#28a745' : '#ffc107',
              }}
            >
              {formData.paymentStatus ? '✓ Paid' : 'Pending'}
            </span>
          </div>
        </section>

        {/* Form Actions */}
        <div style={styles.formActions}>
          <button type="submit" style={styles.submitBtn}>
            Save Customer Details
          </button>
          <button 
            type="button" 
            onClick={() => {
              handleReset();
              setShowForm(false);
            }} 
            style={styles.resetBtn}
          >
            Cancel
          </button>
        </div>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 100px)',
    background: 'linear-gradient(180deg, #fff 0%, #fbf7fb 100%)',
    padding: '30px 20px',
    paddingBottom: '120px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    animation: 'slideInUp 0.6s cubic-bezier(.2,.9,.2,1)',
  },
  pageTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#2c2c2c',
    margin: '0 0 12px 0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#666',
    margin: 0,
    fontWeight: '400',
  },
  shopStatusSection: {
    background: 'linear-gradient(135deg, #f8f9ff 0%, #fff0f6 100%)',
    padding: '20px',
    borderRadius: '14px',
    marginBottom: '24px',
    boxShadow: '0 8px 22px rgba(17,17,17,0.06)',
    border: '1px solid rgba(217, 70, 166, 0.1)',
    animation: 'slideInUp 0.6s ease-out',
    maxWidth: '700px',
    margin: '0 auto 24px',
  },
  shopStatusContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  shopStatusInfo: {
    flex: 1,
    minWidth: '200px',
  },
  shopStatusTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#888',
    margin: '0 0 6px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  shopStatusLabel: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
  },
  toggleStatusBtn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(.2,.9,.2,1)',
    boxShadow: '0 6px 16px rgba(217, 70, 166, 0.3)',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '14px 16px',
    borderRadius: '10px',
    marginBottom: '24px',
    border: '1px solid #c3e6cb',
    textAlign: 'center',
    fontWeight: '500',
    animation: 'slideInUp 0.4s ease-out',
  },
  ordersSection: {
    backgroundColor: '#ffffff',
    padding: '28px',
    marginBottom: '28px',
    borderRadius: '16px',
    boxShadow: '0 12px 28px rgba(17,17,17,0.06)',
    maxWidth: '700px',
    margin: '0 auto 28px',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  orderCard: {
    border: '1px solid #e8e0e8',
    borderRadius: '12px',
    padding: '18px',
    backgroundColor: '#fbf8fb',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    boxShadow: '0 4px 12px rgba(17,17,17,0.04)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(209,107,165,0.1)',
  },
  orderCustomerName: {
    margin: 0,
    fontSize: '17px',
    fontWeight: '700',
    color: '#2c2c2c',
    letterSpacing: '-0.3px',
  },
  orderDate: {
    fontSize: '12px',
    color: '#999',
    fontWeight: '500',
  },
  orderContent: {
    marginBottom: '14px',
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.5',
  },
  orderProductImage: {
    maxWidth: '100px',
    maxHeight: '100px',
    borderRadius: '8px',
    marginTop: '12px',
    boxShadow: '0 4px 12px rgba(17,17,17,0.08)',
  },
  paymentStatusBadge: {
    display: 'inline-block',
    marginLeft: '10px',
    padding: '5px 12px',
    borderRadius: '16px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.3px',
  },
  deleteOrderBtn: {
    width: '100%',
    padding: '10px',
    background: 'linear-gradient(135deg, #ff7eb3, #d16ba5)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    boxShadow: '0 6px 16px rgba(209,107,165,0.12)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2c2c2c',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid rgba(209,107,165,0.1)',
    letterSpacing: '-0.3px',
  },
  buttonContainer: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto',
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  addOrderBtn: {
    padding: '14px 40px',
    background: 'linear-gradient(180deg, #ff7eb3, #d16ba5)',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    boxShadow: '0 12px 30px rgba(209,107,165,0.2)',
  },
  form: {
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '28px',
    borderRadius: '16px',
    boxShadow: '0 12px 28px rgba(17,17,17,0.06)',
    animation: 'slideInUp 0.5s cubic-bezier(.2,.9,.2,1)',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '2px solid rgba(209,107,165,0.08)',
  },
  closeFormBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
    transition: 'all 0.2s ease',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: '24px',
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(17,17,17,0.04)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    letterSpacing: '0.2px',
  },
  required: {
    color: '#dc3545',
    fontWeight: '700',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    backgroundColor: '#fafafa',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    backgroundColor: '#fafafa',
  },
  error: {
    display: 'block',
    color: '#dc2626',
    fontSize: '12px',
    marginTop: '6px',
    fontWeight: '500',
  },
  imageUploadContainer: {
    border: '2px dashed #d16ba5',
    borderRadius: '10px',
    padding: '32px',
    textAlign: 'center',
    backgroundColor: '#faf8fb',
    cursor: 'pointer',
    transition: 'all 0.28s ease',
  },
  fileInput: {
    display: 'none',
  },
  fileLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#666',
  },
  uploadIcon: {
    fontSize: '40px',
    marginBottom: '10px',
  },
  imagePreviewContainer: {
    marginTop: '16px',
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '8px',
    display: 'block',
    margin: '0 auto',
    boxShadow: '0 8px 20px rgba(17,17,17,0.1)',
  },
  removeImageBtn: {
    marginTop: '12px',
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #ff7eb3, #d16ba5)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    width: '100%',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    boxShadow: '0 6px 16px rgba(209,107,165,0.12)',
  },
  priceInputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  currencySymbol: {
    position: 'absolute',
    left: '14px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#999',
    pointerEvents: 'none',
  },
  priceInput: {
    width: '100%',
    padding: '12px 14px 12px 32px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    backgroundColor: '#fafafa',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    marginRight: '10px',
    accentColor: '#d16ba5',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    fontWeight: '500',
  },
  paymentStatusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    backgroundColor: '#fbf8fb',
    borderRadius: '8px',
    border: '1px solid rgba(209,107,165,0.1)',
  },
  statusLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
  },
  statusBadge: {
    padding: '6px 14px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.3px',
  },
  formActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '32px',
  },
  submitBtn: {
    flex: 1,
    padding: '14px',
    background: 'linear-gradient(180deg, #ff7eb3, #d16ba5)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    boxShadow: '0 8px 20px rgba(209,107,165,0.18)',
  },
  resetBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#e9ecef',
    color: '#333',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
  },

  /* Collection Management Styles */
  collectionBtn: {
    padding: '14px 40px',
    background: 'linear-gradient(135deg, rgba(255,126,179,0.15), rgba(209,107,165,0.1))',
    color: '#d16ba5',
    border: '1.5px solid #d16ba5',
    borderRadius: '20px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    marginLeft: '12px',
  },

  collectionSection: {
    maxWidth: '800px',
    margin: '0 auto 28px',
    backgroundColor: '#ffffff',
    padding: '28px',
    borderRadius: '16px',
    boxShadow: '0 12px 28px rgba(17,17,17,0.06)',
    animation: 'slideInUp 0.5s cubic-bezier(.2,.9,.2,1)',
  },

  collectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '2px solid rgba(209,107,165,0.1)',
  },

  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
    transition: 'all 0.2s ease',
  },

  uploadCollectionArea: {
    marginBottom: '28px',
  },

  uploadTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#2c2c2c',
    margin: '0 0 16px 0',
    letterSpacing: '-0.3px',
  },

  uploadHint: {
    display: 'block',
    fontSize: '12px',
    color: '#999',
    marginTop: '4px',
  },

  collectionGallery: {
    marginTop: '28px',
  },

  galleryTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#2c2c2c',
    margin: '0 0 16px 0',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(209,107,165,0.1)',
  },

  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '14px',
    marginBottom: '24px',
  },

  galleryItem: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 6px 16px rgba(17,17,17,0.08)',
    transition: 'all 0.28s ease',
    cursor: 'pointer',
  },

  galleryImage: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.28s ease',
  },

  deleteImageBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'rgba(220,52,69,0.9)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(220,52,69,0.3)',
  },

  collectionActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(209,107,165,0.1)',
  },

  doneBtn: {
    flex: 1,
    padding: '13px',
    background: 'linear-gradient(180deg, #ff7eb3, #d16ba5)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    boxShadow: '0 8px 20px rgba(209,107,165,0.18)',
  },
};

export default CustomerDetails;
