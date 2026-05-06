// components/Statistics.jsx (dengan filter)
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Statistics({ refreshTrigger }) {
  const [stats, setStats] = useState({
    total: 0,
    perFase: [],
    perBulan: [],
    perSektor: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter untuk statistik
  const [filterTahun, setFilterTahun] = useState("");
  const [tahunOptions, setTahunOptions] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Build query dengan filter
        let query = supabase
          .from("detail_progres_pksi")
          .select("id, id_progres_fk, tanggal, id_pksi");
        
        let pksiQuery = supabase.from("master_pksi").select("id, tahun_mulai");
        const { data: allPksi } = await pksiQuery;
        
        const tahunMap = new Map();
        (allPksi || []).forEach(p => {
          tahunMap.set(p.id, p.tahun_mulai);
        });
        
        const { data: allData, error: fetchError } = await query;
        
        if (fetchError) throw new Error(fetchError.message);
        
        // Filter berdasarkan tahun jika ada
        let filteredData = allData || [];
        if (filterTahun) {
          filteredData = filteredData.filter(item => {
            const tahunPksi = tahunMap.get(item.id_pksi);
            return tahunPksi === parseInt(filterTahun);
          });
        }
        
        if (!filteredData || filteredData.length === 0) {
          setStats({ total: 0, perFase: [], perBulan: [], perSektor: [] });
          setLoading(false);
          return;
        }

        const progresIds = [...new Set(filteredData.map(item => item.id_progres_fk).filter(Boolean))];
        
        const { data: progresData } = await supabase
          .from("master_progres")
          .select("id, fase, urutan")
          .in("id", progresIds)
          .order("urutan");

        const faseMap = new Map();
        (progresData || []).forEach(item => {
          faseMap.set(item.id, item.fase);
        });

        // Statistik per Fase
        const countMap = new Map();
        filteredData.forEach(item => {
          const faseName = faseMap.get(item.id_progres_fk) || "Unknown";
          countMap.set(faseName, (countMap.get(faseName) || 0) + 1);
        });

        const perFaseArray = Array.from(countMap.entries())
          .map(([fase, count]) => ({
            fase: fase,
            count: count,
            percentage: (count / filteredData.length) * 100
          }))
          .sort((a, b) => b.count - a.count);

        // Statistik per Bulan
        const perBulanMap = new Map();
        filteredData.forEach(item => {
          if (item.tanggal) {
            const date = new Date(item.tanggal);
            const bulanTahun = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
            perBulanMap.set(bulanTahun, (perBulanMap.get(bulanTahun) || 0) + 1);
          }
        });

        const perBulanArray = Array.from(perBulanMap.entries())
          .map(([bulan, count]) => ({ bulan, count }))
          .slice(0, 6);

        // Statistik per Sektor
        const pksiIds = [...new Set(filteredData.map(item => item.id_pksi).filter(Boolean))];
        const { data: pksiWithSektor } = await supabase
          .from("master_pksi")
          .select("id, sektor_id")
          .in("id", pksiIds);
        
        const { data: sektorData } = await supabase
          .from("master_sektor")
          .select("id, nama");
        
        const pksiSektorMap = new Map();
        (pksiWithSektor || []).forEach(p => {
          pksiSektorMap.set(p.id, p.sektor_id);
        });
        
        const sektorNameMap = new Map();
        (sektorData || []).forEach(s => {
          sektorNameMap.set(s.id, s.nama);
        });
        
        const perSektorMap = new Map();
        filteredData.forEach(item => {
          const sektorId = pksiSektorMap.get(item.id_pksi);
          const sektorName = sektorNameMap.get(sektorId) || "Tidak Terdefinisi";
          perSektorMap.set(sektorName, (perSektorMap.get(sektorName) || 0) + 1);
        });
        
        const perSektorArray = Array.from(perSektorMap.entries())
          .map(([sektor, count]) => ({ sektor, count }))
          .sort((a, b) => b.count - a.count);

        setStats({
          total: filteredData.length,
          perFase: perFaseArray,
          perBulan: perBulanArray,
          perSektor: perSektorArray
        });
        
        // Set tahun options untuk filter
        const uniqueTahuns = [...new Set((allPksi || []).map(p => p.tahun_mulai).filter(t => t != null))];
        setTahunOptions(uniqueTahuns.sort((a, b) => b - a));
        
      } catch (err) {
        console.error("Stats error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    getStats();
  }, [refreshTrigger, filterTahun]);

  const getBarColor = (fase) => {
    if (fase === 'Go-Live') return 'bg-green-500';
    if (fase === 'Deployment') return 'bg-blue-500';
    if (fase === 'UAT') return 'bg-orange-500';
    if (fase === 'SIT') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-red-600 text-sm text-center">Error: {error}</p>
      </div>
    );
  }

  if (stats.total === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-red-700 px-5 py-3">
          <h2 className="text-white font-semibold">Statistik Progres</h2>
        </div>
        <div className="p-8 text-center text-gray-400 text-sm">
          Belum ada data progres untuk ditampilkan
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-red-700 px-5 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-white font-semibold">Statistik Progres</h2>
            <p className="text-red-200 text-xs mt-0.5">Analisis perkembangan program kerja</p>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-white text-xs">Filter Tahun:</label>
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="bg-red-600 text-white border border-red-500 rounded px-2 py-1 text-xs focus:outline-none"
            >
              <option value="">Semua Tahun</option>
              {tahunOptions.map(tahun => (
                <option key={tahun} value={tahun}>{tahun}</option>
              ))}
            </select>
            {filterTahun && (
              <button
                onClick={() => setFilterTahun("")}
                className="text-red-200 hover:text-white text-xs underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ringkasan Total */}
          <div>
            <div className="bg-red-50 rounded-lg p-4 text-center mb-4 border border-red-100">
              <div className="text-3xl font-bold text-red-700">{stats.total}</div>
              <div className="text-gray-600 text-sm font-medium mt-1">Total Update Progress</div>
              {filterTahun && (
                <div className="text-xs text-gray-500 mt-1">Tahun {filterTahun}</div>
              )}
            </div>
            
            {/* Statistik per Sektor */}
            {stats.perSektor.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-700 text-sm mb-3">Per Sektor</h3>
                <div className="space-y-2">
                  {stats.perSektor.map((item, idx) => (
                    <div key={`sektor-${idx}`} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{item.sektor}</span>
                      <span className="font-semibold text-red-600">{item.count} update</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Statistik per Bulan */}
            {stats.perBulan.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 text-sm mb-3">Trend 6 Bulan Terakhir</h3>
                <div className="space-y-3">
                  {stats.perBulan.map((item, idx) => (
                    <div key={`bulan-${idx}`} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">{item.bulan}</span>
                        <span className="font-semibold text-red-600">{item.count} update</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-red-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(item.count / stats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Distribusi per Fase */}
          <div>
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Distribusi per Fase</h3>
            <div className="space-y-3">
              {stats.perFase.map((item, idx) => (
                <div key={`fase-${idx}`} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-gray-700">{item.fase}</span>
                    <div className="flex gap-2">
                      <span className="font-semibold text-red-600">{item.count}</span>
                      <span className="text-gray-400">({Math.round(item.percentage)}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`${getBarColor(item.fase)} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Ringkasan Ringkas */}
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-between text-center">
          {stats.perFase.slice(0, 4).map((item, idx) => (
            <div key={idx} className="flex-1 min-w-[80px]">
              <div className="text-lg font-bold text-red-600">{item.count}</div>
              <div className="text-[10px] text-gray-500 uppercase">{item.fase}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}