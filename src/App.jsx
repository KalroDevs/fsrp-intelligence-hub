import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/public/HomePage.jsx';
import CooperativesHomePage from "./pages/public/CooperativesHomePage.jsx";
import SaccoDashboard from "./pages/public/SaccoDashboard.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import BeneficiariesHomePage from "./pages/public/BeneficiariesHomePage.jsx"; 
import OmfpDashboard from './pages/public/OmfpDashboard.jsx';
import SoilSamplingDashboard from './pages/public/SoilSamplingDashboard.jsx';
import FlidDashboard from './pages/public/FlidDashboard.jsx';
import CigDashboard from './pages/public/CigDashboard.jsx';
import TimpsDashboard from './pages/public/TimpsDashboard.jsx';
import VaccinationDashboard from './pages/public/VaccinationDashboard.jsx';
import ClimateAdvisoryDashboard from './pages/public/ClimateAdvisoryDashboard.jsx';
import FertilizerSubsidyDashboard from './pages/public/FertilizerSubsidyDashboard.jsx';
import AgripreneurDashboard from './pages/public/AgripreneurDashboard.jsx';
import DigitalProductsPage from './pages/public/DigitalProductsPage.jsx';


function App() {
  const [lang, setLang] = React.useState('en');
  const t = (key) => key;

  return (
    <Routes>
      <Route path="/" element={<HomePage lang={lang} onLangChange={setLang} t={t} />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/beneficiaries/home" element={<BeneficiariesHomePage lang={lang} onLangChange={setLang} />} />
      <Route path="/cooperatives/home" element={<CooperativesHomePage lang={lang} onLangChange={setLang} />} />
      <Route path="/cooperatives/sacco" element={<SaccoDashboard lang={lang} onLangChange={setLang} />} />
      <Route path="/soil-sampling/home" element={<SoilSamplingDashboard lang={lang} onLangChange={setLang} />} />
      <Route path="/flid/home" element={<FlidDashboard lang={lang} onLangChange={setLang} />} />
      <Route path="/timps/home" element={<TimpsDashboard lang={lang} onLangChange={setLang} />} />
      <Route path="/vaccinantion/home" element={<VaccinationDashboard lang={lang} onLangChange={setLang} />} />
      <Route path="/cig/home" element={<CigDashboard lang={lang} onLangChange={setLang} />} /> 
      <Route path="/omfp/dashboard" element={<OmfpDashboard lang={lang} onLangChange={setLang} />} />

      <Route path="/advisory/dashboard" element={<ClimateAdvisoryDashboard lang={lang} onLangChange={setLang} />} />
      <Route path="/fertilizer/dashboard" element={<FertilizerSubsidyDashboard lang={lang} onLangChange={setLang} />} />
      <Route path="/agripreneur/dashboard" element={<AgripreneurDashboard lang={lang} onLangChange={setLang} />} />
      <Route path="/digital-products/dashboard" element={<DigitalProductsPage lang={lang} onLangChange={setLang} />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;