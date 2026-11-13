import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/public/HomePage.jsx';
import CooperativesHomePage from "./pages/public/CooperativesHomePage.jsx";
import SaccoDashboard from "./pages/public/SaccoDashboard.jsx";

// import LoginPage from "./pages/public/LoginPage.jsx";
import BeneficiariesHomePage from "./pages/public/BeneficiariesHomePage.jsx"; // Add this

function App() {
  const [lang, setLang] = React.useState('en');
  const t = (key) => key;

  return (
    <Routes>
      <Route path="/" element={<HomePage lang={lang} onLangChange={setLang} t={t} />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/beneficiaries/home" element={<BeneficiariesHomePage lang={lang} onLangChange={setLang} />} />
      <Route path="/cooperatives/home" element={<CooperativesHomePage lang={lang} onLangChange={setLang} />} />
      <Route path="/cooperatives/sacco" element={<SaccoDashboard lang={lang} onLangChange={setLang} />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;