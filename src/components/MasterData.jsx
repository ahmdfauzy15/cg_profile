// components/MasterData.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function MasterData({ refreshTrigger }) {
  const [pksiList, setPksiList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [appsList, setAppsList] = useState([]);
  const [pengerjaanList, setPengerjaanList] = useState([]);
  const [progresList, setProgresList] = useState([]);
  const [sektorList, setSektorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pksi");

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [pksiRes, kategoriRes, appsRes, pengerjaanRes, progresRes, sektorRes] = await Promise.all([
        supabase.from("master_pksi").select(`
          *,
          master_kategori_pksi (nama),
          master_apps (nama),
          master_kategori_pengerjaan (jenis),
          master_sektor (nama)
        `).order("id"),
        supabase.from("master_kategori_pksi").select("*").order("id"),
        supabase.from("master_apps").select("*").order("id"),
        supabase.from("master_kategori_pengerjaan").select("*").order("id"),
        supabase.from("master_progres").select("*").order("urutan"),
        supabase.from("master_sektor").select("*").order("id")
      ]);

      if (pksiRes.error) throw new Error(pksiRes.error.message);
      if (kategoriRes.error) throw new Error(kategoriRes.error.message);
      if (appsRes.error) throw new Error(appsRes.error.message);
      if (pengerjaanRes.error) throw new Error(pengerjaanRes.error.message);
      if (progresRes.error) throw new Error(progresRes.error.message);
      if (sektorRes.error) throw new Error(sektorRes.error.message);

      setPksiList(pksiRes.data || []);
      setKategoriList(kategoriRes.data || []);
      setAppsList(appsRes.data || []);
      setPengerjaanList(pengerjaanRes.data || []);
      setProgresList(progresRes.data || []);
      setSektorList(sektorRes.data || []);
      
    } catch (error) {
      console.error("Error fetching master data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAllData();
  }, [refreshTrigger]);

  const tabs = [
    { id: "pksi", label: "Program Kerja PKSI", count: pksiList.length },
    { id: "kategori", label: "Kategori PKSI", count: kategoriList.length },
    { id: "sektor", label: "Sektor", count: sektorList.length },
    { id: "apps", label: "Aplikasi", count: appsList.length },
    { id: "pengerjaan", label: "Jenis Pengerjaan", count: pengerjaanList.length },
    { id: "progres", label: "Fase Progres", count: progresList.length }
  ];

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
        <button 
          onClick={fetchAllData}
          className="mt-3 mx-auto block bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-red-700 px-5 py-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white font-semibold">Data Referensi Sistem</h2>
            <p className="text-red-200 text-xs mt-0.5">Master data yang digunakan sebagai referensi</p>
          </div>
          <button 
            onClick={fetchAllData}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-5">
        {activeTab === "pksi" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Nama Program Kerja</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Sektor</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Kategori</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Aplikasi</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Jenis Pengerjaan</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Tahun</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">IKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pksiList.map((pksi) => (
                  <tr key={`pksi-${pksi.id}`} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-800">{pksi.nama_pksi}</td>
                    <td className="px-3 py-2 text-gray-600">{pksi.master_sektor?.nama || '-'}</td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs">{pksi.master_kategori_pksi?.nama || '-'}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-600">{pksi.master_apps?.nama || '-'}</td>
                    <td className="px-3 py-2 text-gray-600">{pksi.master_kategori_pengerjaan?.jenis || '-'}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{pksi.tahun_mulai}</td>
                    <td className="px-3 py-2 text-center">
                      {pksi.iku ? (
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs font-medium">IKU</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === "kategori" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {kategoriList.map((item) => (
              <div key={item.id} className="bg-red-50 p-3 rounded border border-red-100">
                <p className="font-medium text-red-700">{item.nama}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {item.id}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "sektor" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sektorList.map((item) => (
              <div key={item.id} className="bg-blue-50 p-3 rounded border border-blue-100">
                <p className="font-medium text-blue-700">{item.nama}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {item.id}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "apps" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {appsList.map((item) => (
              <div key={item.id} className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="font-medium text-gray-700">{item.nama}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {item.id}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "pengerjaan" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pengerjaanList.map((item) => (
              <div key={item.id} className="bg-green-50 p-3 rounded border border-green-100">
                <p className="font-medium text-green-700">{item.jenis}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {item.id}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "progres" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {progresList.map((item) => (
              <div key={item.id} className="bg-purple-50 p-3 rounded border border-purple-100">
                <p className="font-medium text-purple-700">{item.fase}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">Urutan: {item.urutan}</p>
                  <span className="text-xs bg-purple-200 text-purple-700 px-1.5 py-0.5 rounded">ID: {item.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
          <div>
            <div className="text-xl font-bold text-red-600">{sektorList.length}</div>
            <div className="text-[10px] text-gray-500 uppercase">Sektor</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-600">{kategoriList.length}</div>
            <div className="text-[10px] text-gray-500 uppercase">Kategori</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-600">{appsList.length}</div>
            <div className="text-[10px] text-gray-500 uppercase">Aplikasi</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-600">{pengerjaanList.length}</div>
            <div className="text-[10px] text-gray-500 uppercase">Jenis Pengerjaan</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-600">{progresList.length}</div>
            <div className="text-[10px] text-gray-500 uppercase">Fase Progres</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-600">{pksiList.length}</div>
            <div className="text-[10px] text-gray-500 uppercase">Total Program</div>
          </div>
        </div>
      </div>
    </div>
  );
}