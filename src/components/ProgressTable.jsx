// components/ProgressTable.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProgressTable({ refreshTrigger }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    sektor: "",
    kategori: "",
    fase: "",
    tahun: "",
    iku: ""
  });
  
  // Options for filters
  const [filterOptions, setFilterOptions] = useState({
    sektorList: [],
    kategoriList: [],
    faseList: [],
    tahunList: []
  });
  
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data: detailData, error: detailError } = await supabase
          .from("detail_progres_pksi")
          .select(`
            id,
            tanggal,
            keterangan,
            bulan_tahun,
            status_text,
            id_pksi,
            id_progres_fk
          `)
          .order("tanggal", { ascending: false });
        
        if (detailError) throw new Error(detailError.message);
        
        if (!detailData || detailData.length === 0) {
          setData([]);
          setFilteredData([]);
          setLoading(false);
          return;
        }

        const pksiIds = [...new Set(detailData.map(item => item.id_pksi).filter(Boolean))];
        const progresIds = [...new Set(detailData.map(item => item.id_progres_fk).filter(Boolean))];

        const [pksiResult, progresResult, sektorResult, kategoriResult] = await Promise.all([
          pksiIds.length > 0 
            ? supabase.from("master_pksi").select("id, nama_pksi, iku, tahun_mulai, sektor_id, id_kategori_pksi").in("id", pksiIds)
            : { data: [] },
          progresIds.length > 0
            ? supabase.from("master_progres").select("id, fase, urutan").in("id", progresIds)
            : { data: [] },
          supabase.from("master_sektor").select("id, nama"),
          supabase.from("master_kategori_pksi").select("id, nama")
        ]);

        if (pksiResult.error) throw new Error(pksiResult.error.message);
        if (progresResult.error) throw new Error(progresResult.error.message);

        const pksiMap = new Map();
        (pksiResult.data || []).forEach(item => {
          pksiMap.set(item.id, { 
            nama: item.nama_pksi, 
            iku: item.iku, 
            tahun: item.tahun_mulai,
            sektor_id: item.sektor_id,
            kategori_id: item.id_kategori_pksi
          });
        });

        const progresMap = new Map();
        (progresResult.data || []).forEach(item => {
          progresMap.set(item.id, { fase: item.fase, urutan: item.urutan });
        });

        const sektorMap = new Map();
        (sektorResult.data || []).forEach(item => {
          sektorMap.set(item.id, item.nama);
        });

        const kategoriMap = new Map();
        (kategoriResult.data || []).forEach(item => {
          kategoriMap.set(item.id, item.nama);
        });

        const mergedData = detailData.map(item => {
          const pksiInfo = pksiMap.get(item.id_pksi) || { nama: "Tidak diketahui", iku: false, tahun: null, sektor_id: null, kategori_id: null };
          return {
            ...item,
            pksi_info: pksiInfo,
            progres_info: progresMap.get(item.id_progres_fk) || { fase: "-", urutan: 0 },
            sektor: sektorMap.get(pksiInfo.sektor_id) || "-",
            kategori: kategoriMap.get(pksiInfo.kategori_id) || "-"
          };
        });

        setData(mergedData);
        setFilteredData(mergedData);
        
        // Build filter options
        const uniqueSektors = [...new Set(mergedData.map(item => item.sektor).filter(s => s !== "-"))];
        const uniqueKategoris = [...new Set(mergedData.map(item => item.kategori).filter(k => k !== "-"))];
        const uniqueFases = [...new Set(mergedData.map(item => item.progres_info.fase).filter(f => f !== "-"))];
        const uniqueTahuns = [...new Set(mergedData.map(item => item.pksi_info.tahun).filter(t => t != null))];
        
        setFilterOptions({
          sektorList: uniqueSektors,
          kategoriList: uniqueKategoris,
          faseList: uniqueFases,
          tahunList: uniqueTahuns.sort((a, b) => b - a)
        });
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProgress();
  }, [refreshTrigger]);

  // Apply filters
  useEffect(() => {
    let result = [...data];
    
    // Search filter (nama PKSI)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(item => 
        item.pksi_info.nama.toLowerCase().includes(searchLower)
      );
    }
    
    // Sektor filter
    if (filters.sektor) {
      result = result.filter(item => item.sektor === filters.sektor);
    }
    
    // Kategori filter
    if (filters.kategori) {
      result = result.filter(item => item.kategori === filters.kategori);
    }
    
    // Fase filter
    if (filters.fase) {
      result = result.filter(item => item.progres_info.fase === filters.fase);
    }
    
    // Tahun filter
    if (filters.tahun) {
      result = result.filter(item => item.pksi_info.tahun === parseInt(filters.tahun));
    }
    
    // IKU filter
    if (filters.iku) {
      const isIku = filters.iku === "true";
      result = result.filter(item => item.pksi_info.iku === isIku);
    }
    
    setFilteredData(result);
  }, [filters, data]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      sektor: "",
      kategori: "",
      fase: "",
      tahun: "",
      iku: ""
    });
  };

  const getStatusBadge = (fase, urutan) => {
    const baseClass = "inline-block px-2 py-0.5 rounded text-xs font-medium";
    if (fase === 'Go-Live') return <span className={`${baseClass} bg-green-100 text-green-700`}>Go-Live</span>;
    if (fase === 'Deployment') return <span className={`${baseClass} bg-blue-100 text-blue-700`}>Deployment</span>;
    if (fase === 'UAT') return <span className={`${baseClass} bg-orange-100 text-orange-700`}>UAT</span>;
    if (fase === 'SIT') return <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>SIT</span>;
    if (fase === 'Pemrograman') return <span className={`${baseClass} bg-cyan-100 text-cyan-700`}>Pemrograman</span>;
    if (fase === 'Desain') return <span className={`${baseClass} bg-purple-100 text-purple-700`}>Desain</span>;
    if (fase === 'PDKK') return <span className={`${baseClass} bg-pink-100 text-pink-700`}>PDKK</span>;
    return <span className={`${baseClass} bg-gray-100 text-gray-600`}>{fase}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== "").length;

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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-red-700 px-5 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-white font-semibold">Monitoring Update Progres</h2>
            <p className="text-red-200 text-xs mt-0.5">
              Menampilkan {filteredData.length} dari {data.length} update progres
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-2"
          >
            {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
            {activeFilterCount > 0 && (
              <span className="bg-white text-red-700 rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Cari PKSI</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Nama program kerja..."
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Sektor</label>
              <select
                value={filters.sektor}
                onChange={(e) => handleFilterChange("sektor", e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-red-500"
              >
                <option value="">Semua Sektor</option>
                {filterOptions.sektorList.map(sektor => (
                  <option key={sektor} value={sektor}>{sektor}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori PKSI</label>
              <select
                value={filters.kategori}
                onChange={(e) => handleFilterChange("kategori", e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-red-500"
              >
                <option value="">Semua Kategori</option>
                {filterOptions.kategoriList.map(kategori => (
                  <option key={kategori} value={kategori}>{kategori}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Fase Progres</label>
              <select
                value={filters.fase}
                onChange={(e) => handleFilterChange("fase", e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-red-500"
              >
                <option value="">Semua Fase</option>
                {filterOptions.faseList.map(fase => (
                  <option key={fase} value={fase}>{fase}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Tahun</label>
              <select
                value={filters.tahun}
                onChange={(e) => handleFilterChange("tahun", e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-red-500"
              >
                <option value="">Semua Tahun</option>
                {filterOptions.tahunList.map(tahun => (
                  <option key={tahun} value={tahun}>{tahun}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Status IKU</label>
              <select
                value={filters.iku}
                onChange={(e) => handleFilterChange("iku", e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-red-500"
              >
                <option value="">Semua</option>
                <option value="true">IKU</option>
                <option value="false">Non-IKU</option>
              </select>
            </div>
          </div>
          
          {activeFilterCount > 0 && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama PKSI</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sektor</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fase</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Bulan/Tahun</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Keterangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-400 text-sm">
                  Tidak ada data yang sesuai dengan filter
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={`row-${row.id}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5 whitespace-nowrap text-xs font-medium text-gray-700">
                    {formatDate(row.tanggal)}
                  </td>
                  <td className="px-4 py-2.5 text-sm font-medium text-gray-800">
                    {row.pksi_info.nama}
                    {row.pksi_info.iku && (
                      <span className="ml-2 text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">IKU</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-500">
                    {row.sektor}
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    {getStatusBadge(row.progres_info.fase, row.progres_info.urutan)}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-500">
                    {row.bulan_tahun || '-'}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-600 max-w-md break-words">
                    {row.keterangan || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}