import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    
    switch(name) {
      case 'name':
        if (!value.trim()) {
          error = 'Le nom est requis';
        } else if (value.trim().length < 3) {
          error = 'Le nom doit contenir au moins 3 caractères';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Format d\'email invalide';
        }
        break;
        
      case 'age':
        if (!value) {
          error = 'L\'âge est requis';
        } else if (value < 1 || value > 120) {
          error = 'L\'âge doit être entre 1 et 120';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          error = 'Le message est requis';
        } else if (value.trim().length < 10) {
          error = 'Le message doit contenir au moins 10 caractères';
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (submitted) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // Envoyer au backend
        const response = await axios.post('http://localhost:5000/api/users', formData);
        
        if (response.data.success) {
          setSuccessMessage(`✅ Utilisateur ajouté avec succès ! Redirection vers la liste...`);
          
          // Rediriger vers la page des utilisateurs après 2 secondes
          setTimeout(() => {
            navigate('/users');
          }, 2000);
        }
      } catch (error) {
        console.error('Erreur:', error);
        setSuccessMessage('');
        setErrors({ submit: 'Erreur lors de l\'envoi des données au serveur' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">📝 Ajouter un utilisateur</h2>
              
              {successMessage && (
                <div className="alert alert-success">
                  {successMessage}
                </div>
              )}
              
              {errors.submit && (
                <div className="alert alert-danger">
                  {errors.submit}
                </div>
              )}
              
              <form onSubmit={handleSubmit} noValidate>
                {/* Nom */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nom complet <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${submitted ? (errors.name ? 'is-invalid' : 'is-valid') : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Entrez votre nom"
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${submitted ? (errors.email ? 'is-invalid' : 'is-valid') : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemple@email.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Âge */}
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Âge <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className={`form-control ${submitted ? (errors.age ? 'is-invalid' : 'is-valid') : ''}`}
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Votre âge"
                    min="1"
                    max="120"
                    disabled={isLoading}
                  />
                  {errors.age && (
                    <div className="invalid-feedback d-block">
                      {errors.age}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${submitted ? (errors.message ? 'is-invalid' : 'is-valid') : ''}`}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Votre message (minimum 10 caractères)"
                    disabled={isLoading}
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback d-block">
                      {errors.message}
                    </div>
                  )}
                  <small className="text-muted">
                    {formData.message.length} / 10 caractères minimum
                  </small>
                </div>

                {/* Boutons */}
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Envoi en cours...
                      </>
                    ) : (
                      'Ajouter l\'utilisateur'
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormData({ name: '', email: '', age: '', message: '' });
                      setErrors({});
                      setSubmitted(false);
                      setSuccessMessage('');
                    }}
                    disabled={isLoading}
                  >
                    Réinitialiser
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;