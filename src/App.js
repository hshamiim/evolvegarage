import React from 'react';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <section>
          <h2>Our Services</h2>
          <ul>
            <li>Oil Change</li>
            <li>Brake Repair</li>
            <li>Engine Tune-Up</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;