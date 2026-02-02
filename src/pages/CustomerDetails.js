import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';

function CustomerDetails() {
  const { isLoggedIn } = useContext(AuthContext);
  const { savedOrders, addOrder, deleteOrder } = useContext(OrderContext);
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
      {!showForm && (
        <div style={styles.buttonContainer}>
          <button
            onClick={() => setShowForm(true)}
            style={styles.addOrderBtn}
          >
            + Add New Order
          </button>
        </div>
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
    backgroundColor: '#f5f5f5',
    padding: '20px',
    paddingBottom: '100px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2c2c2c',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #c3e6cb',
    textAlign: 'center',
    fontWeight: '500',
  },
  ordersSection: {
    backgroundColor: '#ffffff',
    padding: '25px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    maxWidth: '600px',
    margin: '0 auto 20px',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  orderCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  orderCustomerName: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c2c2c',
  },
  orderDate: {
    fontSize: '12px',
    color: '#999',
  },
  orderContent: {
    marginBottom: '12px',
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  orderInfo: {
    fontSize: '13px',
    color: '#555',
  },
  orderProductImage: {
    maxWidth: '100px',
    maxHeight: '100px',
    borderRadius: '4px',
    marginTop: '10px',
  },
  paymentStatusBadge: {
    display: 'inline-block',
    marginLeft: '8px',
    padding: '4px 8px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '600',
  },
  deleteOrderBtn: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
  buttonContainer: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  addOrderBtn: {
    padding: '14px 40px',
    backgroundColor: '#d16ba5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid #f0f0f0',
  },
  closeFormBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: '25px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f0f0f0',
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
  },
  required: {
    color: '#dc3545',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  error: {
    display: 'block',
    color: '#dc3545',
    fontSize: '12px',
    marginTop: '5px',
    fontWeight: '500',
  },
  imageUploadContainer: {
    border: '2px dashed #d16ba5',
    borderRadius: '8px',
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#faf8fb',
    cursor: 'pointer',
    transition: 'all 0.3s',
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
    marginTop: '15px',
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '6px',
    display: 'block',
    margin: '0 auto',
  },
  removeImageBtn: {
    marginTop: '10px',
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    width: '100%',
    transition: 'background-color 0.3s',
  },
  priceInputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  currencySymbol: {
    position: 'absolute',
    left: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#666',
    pointerEvents: 'none',
  },
  priceInput: {
    width: '100%',
    padding: '12px 12px 12px 30px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    marginRight: '10px',
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
    gap: '10px',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
  },
  statusLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '600',
  },
  formActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '30px',
  },
  submitBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#d16ba5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  resetBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#e9ecef',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

export default CustomerDetails;
