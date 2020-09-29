import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useRoutes } from './routes';

const App: React.FC = () => {
  const routes = useRoutes({});

  return (
    <Router>
      <header className="header">
        <div className="container">
          <div className="row">
            <Navbar />
          </div>
        </div>
      </header>
      <section className="content">
        <div className="container">
          <div className="row">
            {routes}
          </div>
        </div>
      </section>
      <div className="footer">
        <div className="container">
          <div className="row">
            <span className="author">Created by Nikita N. Sheremeta</span>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
