import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/invoices" replace />} />
        <Route path="invoices" element={<Dashboard />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
  );
}

export default App;
