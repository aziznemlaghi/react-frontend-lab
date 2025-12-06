import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Erreur lors du chargement des utilisateurs');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers(); // Recharger la liste
      } catch (err) {
        console.error(err);
        alert('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👥 Liste des utilisateurs</h2>
        <Link to="/form" className="btn btn-primary">
          + Ajouter un utilisateur
        </Link>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">
          {error}
        </div>
      ) : users.length === 0 ? (
        <div className="alert alert-info">
          Aucun utilisateur trouvé. <Link to="/form">Ajouter le premier utilisateur</Link>
        </div>
      ) : (
        <div className="row">
          {users.map(user => (
            <div key={user.id} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title">{user.name}</h5>
                      <p className="card-text mb-1">
                        <strong>📧 Email:</strong> {user.email}
                      </p>
                      <p className="card-text mb-1">
                        <strong>🎂 Âge:</strong> {user.age} ans
                      </p>
                      <p className="card-text mb-2">
                        <strong>💬 Message:</strong> {user.message}
                      </p>
                      <span className="badge bg-primary">ID: {user.id}</span>
                    </div>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;