import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/beneficiaries/home");
    }, 1500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registration successful! Please check your email.");
    setView("login");
  };

  const handleForgot = (e) => {
    e.preventDefault();
    alert("Password reset link sent!");
    setView("login");
  };

  const viewConfig = {
    login: {
      cardHeader: "FSRP Intelligence Hub",
      cardSubheader: "_",
      title: "Log In",
      instructions: "Enter your credentials to access the system.",
    },
    register: {
      cardHeader: "NEW ACCOUNT",
      cardSubheader: "Join the Intelligence Hub",
      title: "Register",
      instructions: "Fill in your details to create an account.",
    },
    forgot: {
      cardHeader: "ACCOUNT RECOVERY",
      cardSubheader: "FSRP Intelligence Hub",
      title: "Reset Password",
      instructions: "Recover access to your account.",
    },
  };

  const currentConfig = viewConfig[view];

  const inputClasses = "w-full bg-[#0f172a]/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:bg-[#0f172a]/80 focus:border-[#80c4cb] focus:ring-2 focus:ring-[#80c4cb]/20";
  const iconClasses = "fas absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none transition-colors peer-focus:text-[#80c4cb]";

  return (
    <div className="min-h-screen w-full bg-[#0b1329] flex p-2 sm:p-4 font-sans">
      
      {/* Outer Frame Container */}
      <div 
        className="flex-1 relative flex flex-col rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden bg-cover bg-center shadow-2xl"
        style={{ 
          // Removed the green gradient overlay, keeping only a very subtle dark tint so the white text is readable.
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/fsrp_bg3.png')` 
        }}
      >
        
        {/* Top Bar: Logo & Brand */}
        <div className="absolute top-6 left-6 md:top-8 md:left-10 z-30 flex items-center space-x-3.5">
          <div className="bg-white p-2 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <img src="/images/fsrp.jpg" width="50" height="50" alt="FSRP Logo" className="object-contain rounded-md" />
          </div>
          <div className="hidden sm:flex flex-col text-white drop-shadow-md">
            <span className="text-xl font-extrabold leading-none tracking-tight">FSRP Kenya</span>
            <span className="text-[11px] font-medium tracking-wide text-[#80c4cb] mt-1 uppercase">Intelligence Hub</span>
          </div>
        </div>

        {/* Main Layout: Split Screen */}
        {/* justify-end and lg:pr-24 pushes everything to the right side of the container */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-end px-6 md:px-12 lg:pr-24 lg:pl-12 py-16 relative z-10 w-full max-w-[1600px] mx-auto mt-16 lg:mt-0">
          
          {/* Right Side: Auth Card */}
          {/* Added lg:ml-auto to ensure it snaps to the far right */}
          <div className="w-full max-w-[440px] bg-[#1e293b]/95 backdrop-blur-2xl rounded-[1.25rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col border border-white/10 lg:ml-auto">
            
            {/* Card Header */}
            <div className="px-8 pt-8 pb-5 relative border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
              
              {/* Top Right Controls */}
              <div className="absolute top-6 right-6 flex items-center space-x-2">
                {view !== "login" && (
                  <button 
                    onClick={() => setView("login")}
                    className="text-gray-400 hover:text-white transition-colors text-[11px] font-semibold flex items-center bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/10"
                  >
                    <i className="fas fa-arrow-left mr-1.5"></i> Back
                  </button>
                )}
                <button 
                  onClick={() => navigate("/")}
                  className="text-gray-400 hover:text-white transition-colors text-[11px] font-semibold flex items-center bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/10"
                  title="Return to Home"
                >
                  <i className="fas fa-home"></i>
                </button>
              </div>

              <div className="text-[#80c4cb] text-[11px] font-bold tracking-[0.15em] uppercase mb-1">
                {currentConfig.cardHeader}
              </div>
              <div className="text-gray-400 text-xs mb-6 font-medium">
                {currentConfig.cardSubheader}
              </div>
              
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">
                {currentConfig.title}
              </h3>
              
              <p className="text-gray-400 text-[13px]">{currentConfig.instructions}</p>
            </div>

            {/* Card Body / Forms */}
            <div className="px-8 py-6">
              
              {/* LOGIN */}
              {view === "login" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative group">
                    <input type="text" placeholder="Email or National ID Number" className={`${inputClasses} peer`} required />
                    <i className={`fas fa-id-card ${iconClasses}`}></i>
                  </div>
                  
                  <div className="relative group">
                    <input type="password" placeholder="Password" className={`${inputClasses} peer`} required />
                    <i className={`fas fa-lock ${iconClasses}`}></i>
                  </div>
                  
                  <div className="flex justify-between items-center pt-1 pb-2">
                    <label className="flex items-center text-[13px] text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                      <input type="checkbox" className="mr-2.5 rounded border-gray-600 bg-gray-700 text-[#80c4cb] focus:ring-0 w-4 h-4" />
                      Remember me
                    </label>
                    <button type="button" onClick={() => setView("forgot")} className="text-[13px] font-semibold text-[#80c4cb] hover:text-white transition-colors">
                      Forgot Password?
                    </button>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full bg-[#80c4cb] hover:bg-[#6aaeb5] text-[#0f172a] rounded-xl py-3.5 font-bold text-[15px] transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-[0_4px_15px_rgba(128,196,203,0.3)] hover:shadow-[0_6px_20px_rgba(128,196,203,0.4)] hover:-translate-y-0.5"
                  >
                    {isLoading ? (
                      <><i className="fas fa-spinner fa-spin mr-2"></i> Authenticating...</>
                    ) : (
                      <>Log In <i className="fas fa-arrow-right ml-2 text-sm"></i></>
                    )}
                  </button>
                </form>
              )}

              {/* REGISTER */}
              {view === "register" && (
                <form onSubmit={handleRegister} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="First Name" className={inputClasses.replace('pl-11', 'pl-4')} required />
                    <input type="text" placeholder="Last Name" className={inputClasses.replace('pl-11', 'pl-4')} required />
                  </div>
                  
                  <div className="relative group">
                    <input type="email" placeholder="Email Address" className={`${inputClasses} peer`} required />
                    <i className={`fas fa-envelope ${iconClasses}`}></i>
                  </div>
                  <div className="relative group">
                    <input type="tel" placeholder="Phone Number" className={`${inputClasses} peer`} required />
                    <i className={`fas fa-phone-alt ${iconClasses}`}></i>
                  </div>
                  
                  <div className="relative group">
                    <select className={`${inputClasses} appearance-none pr-10 peer`} required defaultValue="">
                      <option value="" disabled className="bg-[#1e293b] text-white">Select User Level...</option>
                      <option value="moald" className="bg-[#1e293b] text-white">MoALD</option>
                      <option value="npcu" className="bg-[#1e293b] text-white">NPCU</option>
                      <option value="kalro" className="bg-[#1e293b] text-white">KALRO</option>
                      <option value="kadic" className="bg-[#1e293b] text-white">KADIC</option>
                      <option value="cpc" className="bg-[#1e293b] text-white">CPCU</option>
                      <option value="sacco" className="bg-[#1e293b] text-white">SACCO/FPO/CIG</option>
                    </select>
                    <i className={`fas fa-users ${iconClasses}`}></i>
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                  </div>

                  <div className="relative group">
                    <input type="text" placeholder="National ID Number" className={`${inputClasses} peer`} required />
                    <i className={`fas fa-id-card ${iconClasses}`}></i>
                  </div>
                  <div className="relative group">
                    <input type="password" placeholder="Create Password" className={`${inputClasses} peer`} required />
                    <i className={`fas fa-lock ${iconClasses}`}></i>
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="w-full bg-[#80c4cb] hover:bg-[#6aaeb5] text-[#0f172a] rounded-xl py-3 font-bold text-[14px] transition-all duration-200 flex justify-center shadow-[0_4px_15px_rgba(128,196,203,0.3)] hover:-translate-y-0.5">
                      Create Account
                    </button>
                  </div>
                  
                  <div className="text-center pt-2">
                    <button type="button" onClick={() => setView("login")} className="text-[12px] font-semibold text-gray-400 hover:text-white transition-colors flex items-center justify-center mx-auto">
                      <i className="fas fa-arrow-left mr-1.5"></i> Already have an account? Log In
                    </button>
                  </div>
                </form>
              )}

              {/* FORGOT PASSWORD */}
              {view === "forgot" && (
                <form onSubmit={handleForgot} className="space-y-4">
                  <div className="bg-[#1e3a8a]/40 border border-blue-800/50 p-4 rounded-xl mb-4">
                    <p className="text-[12px] text-blue-200 leading-relaxed font-medium">
                      Enter the email or National ID associated with your account to receive a secure reset link.
                    </p>
                  </div>
                  
                  <div className="relative group">
                    <input type="text" placeholder="Email or National ID Number" className={`${inputClasses} peer`} required />
                    <i className={`fas fa-id-card ${iconClasses}`}></i>
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="w-full bg-[#80c4cb] hover:bg-[#6aaeb5] text-[#0f172a] rounded-xl py-3.5 font-bold text-[15px] transition-all duration-200 flex justify-center shadow-[0_4px_15px_rgba(128,196,203,0.3)] hover:-translate-y-0.5">
                      Reset Password
                    </button>
                  </div>
                  
                  <div className="text-center pt-2">
                    <button type="button" onClick={() => setView("login")} className="text-[13px] font-semibold text-gray-400 hover:text-white transition-colors flex items-center justify-center mx-auto">
                      <i className="fas fa-arrow-left mr-1.5"></i> Return to Log In
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* Bottom Toggle Bar */}
            {view === "login" && (
              <div 
                className="bg-[#1e293b] border-t border-white/5 text-center py-5 cursor-pointer hover:bg-white/[0.08] transition-colors group"
                onClick={() => setView("register")}
              >
                <span className="text-gray-400 text-[13px] font-medium group-hover:text-white transition-colors">
                  Don't have an account? <span className="text-[#80c4cb] font-bold ml-1">Register here</span>
                </span>
              </div>
            )}

          </div>
        </div>

        {/* Bottom Partners Bar */}
        <div className="bg-white w-full py-4 px-6 md:px-12 flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-10 z-20 mt-auto shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
          <div className="text-[#1e293b] font-black text-xs uppercase tracking-[0.2em] hidden md:block border-r pr-8 border-gray-200">
            PARTNERS
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-90 hover:opacity-100 transition-opacity">
            <div className="flex items-center space-x-3">
              <img src="/images/moald.png" alt="MoALD" className="h-[40px] md:h-[48px] object-contain" />
              <div className="text-[9px] leading-tight text-[#1e293b] font-bold uppercase text-left hidden sm:block tracking-wide">
                Ministry of Agriculture<br />and Livestock<br />Development
              </div>
            </div>
            <img src="/images/cog.png" alt="CoG" className="h-[35px] md:h-[42px] object-contain" />
            <img src="/images/kalro.png" alt="KALRO" className="h-[35px] md:h-[42px] object-contain" />
            <img src="/images/kadic.jpg" alt="KADIC" className="h-[35px] md:h-[42px] object-contain" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;