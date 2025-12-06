import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light p-5 rounded mb-4">
        <h1 className="display-4">Bienvenue sur notre application React</h1>
        <p className="lead">Ceci est la page d'accueil.</p>
        <hr className="my-4" />
        <p>Explorez les différentes fonctionnalités de notre application ci-dessous.</p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <Link to="/counter" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="mb-3">
                  <span className="display-4">🔢</span>
                </div>
                <h5 className="card-title">Compteur</h5>
                <p className="card-text text-muted">Testez le compteur interactif.</p>
                <span className="btn btn-primary btn-sm">Accéder →</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/form" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="mb-3">
                  <span className="display-4">📝</span>
                </div>
                <h5 className="card-title">Formulaire</h5>
                <p className="card-text text-muted">Remplissez le formulaire de test.</p>
                <span className="btn btn-success btn-sm">Accéder →</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/users" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="mb-3">
                  <span className="display-4">👥</span>
                </div>
                <h5 className="card-title">Utilisateurs</h5>
                <p className="card-text text-muted">Voir la liste des utilisateurs.</p>
                <span className="btn btn-info btn-sm">Accéder →</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="alert alert-info mt-5">
        <h5>ℹ️ À propos de cette application</h5>
        <p className="mb-0">
          Cette application démontre l'utilisation de <strong>React</strong>, <strong>React Router</strong>, 
          <strong> Bootstrap</strong>, et <strong>Node.js/Express</strong> pour créer une application web moderne.
        </p>
      </div>
    </div>
  );
};

export default Home;