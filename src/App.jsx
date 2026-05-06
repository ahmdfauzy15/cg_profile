import { useState, useCallback, useEffect } from "react";
import MasterData from "./components/MasterData";
import ProgressForm from "./components/ProgressForm";
import ProgressTable from "./components/ProgressTable";
import Statistics from "./components/Statistics";
import DashboardSummary from "./components/DashboardSummary";
import { supabase, testConnection } from "./lib/supabaseClient";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [dbInfo, setDbInfo] = useState({});

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await testConnection();
      setConnectionStatus(isConnected);
      
      const tables = ['master_kategori_pksi', 'master_apps', 'master_kategori_pengerjaan', 'master_progres', 'master_pksi'];
      const counts = {};
      for (const table of tables) {
        const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
        if (!error) counts[table] = count;
      }
      setDbInfo(counts);
    };
    checkConnection();
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-b from-red-800 to-red-900 shadow-lg">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                MONITORING PROGRES PKSI
              </h1>
              <p className="text-red-200 mt-1 text-sm sm:text-base">
                Program Kerja Sistem Informasi
              </p>
            </div>
            
            <div className="bg-red-700/50 backdrop-blur-sm rounded-lg px-5 py-2 border border-red-500">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${connectionStatus ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {connectionStatus ? "Database Terhubung" : "Gagal Koneksi"}
                  </p>
                  <p className="text-red-200 text-xs">
                    {dbInfo.master_pksi ? `${dbInfo.master_pksi} Program Kerja` : 'Memuat...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <DashboardSummary refreshTrigger={refreshTrigger} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProgressForm onSuccess={handleRefresh} />
          </div>
          <div className="lg:col-span-2">
            <Statistics key={`stats-${refreshTrigger}`} refreshTrigger={refreshTrigger} />
          </div>
        </div>
        <MasterData refreshTrigger={refreshTrigger} />
        <ProgressTable key={`table-${refreshTrigger}`} refreshTrigger={refreshTrigger} />
      </main>

      <footer className="bg-gray-900 text-white py-5 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">Sistem Monitoring Progres PKSI</p>
          <p className="text-gray-500 text-xs mt-1">Data per Desember 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;