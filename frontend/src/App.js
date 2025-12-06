import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/form" element={<UserForm />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;