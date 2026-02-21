const Loading = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex flex-col items-center justify-center min-h-screen m-0 p-0 overflow-hidden">
      {/* <!-- Main Splash Container --> */}
      <div className="relative w-full max-w-md px-8 flex flex-col items-center justify-center space-y-12">
        {/* <!-- Brand Logo Container --> */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 mb-6 flex items-center justify-center bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-primary/5">
            <img
              alt="Minimalist Brand Logo"
              className="w-16 h-16 object-contain rounded-lg"
              data-alt="Abstract minimalist indigo brand logo icon"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0Gp4BLvO6kPnI5ndpN9-yIcznl-h0aRFIijKWBdmlwMJ4k3Hh1R_kE1sb1WLrJQHipKKaGdoJORgZ4_BTH5D7j0V7pGvklWQ_Cfoagk8XxHy17dqbcIpyL0uReDbHB62MDWJ01sMmWclTcPSDKrbX6chlnMDc2Ar1nA8MVB7uzxk44KFc-IBoOfkemxLp2QuF2brwQ7I8LLNGuAfr_CivJQF_rBsQZlehSywdhAL-0jWOINzV8W4qKQoZzylRZSo2dEd3FeIFd1iN"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            K<span className="text-primary">SHOP</span>
          </h1>
        </div>
        {/* <!-- Progress Section --> */}
        <div className="w-full flex flex-col items-center space-y-6">
          {/* <!-- Progress Bar Track --> */}
          <div className="w-full h-2 bg-primary/10 dark:bg-primary/20 rounded-full overflow-hidden">
            {/* <!-- Progress Bar Fill --> */}
            <div className="h-full bg-primary animate-progress rounded-full"></div>
          </div>
          {/* <!-- Loading Status Typography --> */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Preparing your shopping experience...
            </p>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold">
              <span className="material-symbols-outlined text-xs">lock</span>
              <span>Secure Connection Established</span>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Background Accents (Subtle) --> */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
      </div>
      {/* <!-- Footer Branding (Optional/Subtle) --> */}
      <div className="absolute bottom-10 flex flex-col items-center">
        <div className="text-[11px] text-center font-medium text-gray-400 dark:text-gray-600 tracking-widest uppercase">
          © 2026 KSHOP GLOBAL
        </div>

        <div className="mt-2 flex space-x-1">
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <div className="w-1 h-1 rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
