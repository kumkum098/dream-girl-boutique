import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate owner authentication (Replace with actual API call)
    // For demo: dreamgirlboutique14@gmail.com / DREAMGIRL.00
    setTimeout(() => {
      if (email === 'dreamgirlboutique14@gmail.com' && password === 'DREAMGIRL.00') {
        login('Dream Girl Boutique');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Owner Login</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="dreamgirlboutique14@gmail.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 100px)',
    background: 'linear-gradient(180deg, #fff 0%, #fbf7fb 100%)',
    padding: '20px',
  },
  formWrapper: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '18px',
    boxShadow: '0 16px 40px rgba(17,17,17,0.08)',
    width: '100%',
    maxWidth: '420px',
    animation: 'slideInUp 0.6s cubic-bezier(.2,.9,.2,1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '32px',
    color: '#2c2c2c',
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    letterSpacing: '0.2px',
  },
  input: {
    padding: '12px 14px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    backgroundColor: '#fafafa',
  },
  button: {
    padding: '13px',
    background: 'linear-gradient(180deg, #ff7eb3, #d16ba5)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.28s cubic-bezier(.2,.9,.2,1)',
    marginTop: '8px',
    boxShadow: '0 8px 20px rgba(209,107,165,0.18)',
  },
  error: {
    color: '#dc2626',
    fontSize: '14px',
    padding: '12px',
    backgroundColor: '#fee2e2',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: '500',
    border: '1px solid #fecaca',
  },
  demoInfo: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px',
    borderLeft: '4px solid #0284c7',
  },
  demoTitle: {
    margin: '0 0 8px 0',
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
  },
  demoText: {
    margin: '4px 0',
    fontSize: '13px',
    color: '#666',
  },
};

export default LoginForm;
