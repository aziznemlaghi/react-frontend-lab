import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2>Compteur</h2>
              <h1 className="text-primary mb-4">{count}</h1>
              <div>
                <button 
                  className="btn btn-success me-2" 
                  onClick={() => setCount(count + 1)}
                >
                  + Incrémenter
                </button>
                <button 
                  className="btn btn-danger me-2" 
                  onClick={() => setCount(count > 0 ? count - 1 : 0)}
                >
                  - Décrémenter
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setCount(0)}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;