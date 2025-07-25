import { useState } from 'react'

function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isSignUp) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        alert('Please fill in all fields.')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match.')
        return
      }
      onLogin({ 
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email 
      })
    } else {
      if (!formData.email || !formData.password) {
        alert('Please fill in all fields.')
        return
      }
      onLogin({ 
        username: formData.email.split('@')[0],
        email: formData.email 
      })
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>DataHalo Drive</h1>
          <p>{isSignUp ? 'Create your account' : 'Welcome back'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </>
          )}
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          )}
          
          <button type="submit" className="btn-primary">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-switch">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button 
            type="button" 
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth