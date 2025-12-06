import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Mon App</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Accueil</Link>
          <Link className="nav-link" to="/about">À propos</Link>
          <Link className="nav-link" to="/counter">Compteur</Link>
          <Link className="nav-link" to="/form">Formulaire</Link>
          <Link className="nav-link" to="/users">Utilisateurs</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;