import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Users from './components/Users';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
