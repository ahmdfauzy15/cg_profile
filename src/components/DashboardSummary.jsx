// components/DashboardSummary.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DashboardSummary({ refreshTrigger }) {
  const [summary, setSummary] = useState({
    totalPksi: 0,
    totalIku: 0,
    goLive: 0,
    deployment: 0,
    uat: 0,
    sit: 0,
    desain: 0,
    pemrograman: 0,
    perSektor: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      
      try {
        const { data: pksiData, error: pksiError } = await supabase
          .from("master_pksi")
          .select("id, iku, sektor_id");
        
        if (pksiError) throw pksiError;
        
        const { data: progresData, error: progresError } = await supabase
          .from("detail_progres_pksi")
          .select("id_pksi, id_progres_fk")
          .order("tanggal", { ascending: false });
        
        if (progresError) throw progresError;
        
        const { data: sektorData, error: sektorError } = await supabase
          .from("master_sektor")
          .select("*");
        
        if (sektorError) throw sektorError;
        
        const { data: masterProgres, error: masterProgresError } = await supabase
          .from("master_progres")
          .select("*");
        
        if (masterProgresError) throw masterProgresError;
        
        const latestProgressPerPksi = {};
        progresData.forEach(item => {
          if (!latestProgressPerPksi[item.id_pksi]) {
            latestProgressPerPksi[item.id_pksi] = item.id_progres_fk;
          }
        });
        
        const progresMap = {};
        masterProgres.forEach(p => {
          progresMap[p.id] = p.fase;
        });
        
        let goLive = 0, deployment = 0, uat = 0, sit = 0, desain = 0, pemrograman = 0;
        
        Object.values(latestProgressPerPksi).forEach(progresId => {
          const fase = progresMap[progresId];
          if (fase === 'Go-Live') goLive++;
          else if (fase === 'Deployment') deployment++;
          else if (fase === 'UAT') uat++;
          else if (fase === 'SIT') sit++;
          else if (fase === 'Desain') desain++;
          else if (fase === 'Pemrograman') pemrograman++;
        });
        
        const totalIku = pksiData.filter(p => p.iku === true).length;
        
        const sektorMap = {};
        sektorData.forEach(s => {
          sektorMap[s.id] = s.nama;
        });
        
        const perSektorTemp = {};
        pksiData.forEach(p => {
          const sektorName = sektorMap[p.sektor_id] || 'Tidak Terdefinisi';
          if (!perSektorTemp[sektorName]) {
            perSektorTemp[sektorName] = { total: 0, iku: 0 };
          }
          perSektorTemp[sektorName].total++;
          if (p.iku) perSektorTemp[sektorName].iku++;
        });
        
        const perSektor = Object.entries(perSektorTemp).map(([nama, data]) => ({
          nama,
          total: data.total,
          iku: data.iku
        }));
        
        setSummary({
          totalPksi: pksiData.length,
          totalIku: totalIku,
          goLive,
          deployment,
          uat,
          sit,
          desain,
          pemrograman,
          perSektor
        });
        
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSummary();
  }, [refreshTrigger]);
  
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }
  
  const statCards = [
    { label: "Total PKSI", value: summary.totalPksi, color: "from-red-600 to-red-700" },
    { label: "Target IKU", value: summary.totalIku, color: "from-red-500 to-red-600" },
    { label: "Go-Live", value: summary.goLive, color: "from-green-600 to-green-700" },
    { label: "Deployment", value: summary.deployment, color: "from-blue-600 to-blue-700" },
    { label: "UAT", value: summary.uat, color: "from-orange-500 to-orange-600" },
    { label: "SIT", value: summary.sit, color: "from-yellow-500 to-yellow-600" },
    { label: "Desain/Pemrograman", value: summary.desain + summary.pemrograman, color: "from-gray-600 to-gray-700" }
  ];
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {statCards.map((card, idx) => (
          <div key={idx} className={`bg-gradient-to-r ${card.color} rounded-lg shadow p-4 text-center`}>
            <p className="text-white/80 text-xs uppercase tracking-wide font-medium">{card.label}</p>
            <p className="text-white text-2xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-red-700 px-5 py-3">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Ringkasan per Sektor</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Sektor</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Total PKSI</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">IKU</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Non-IKU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {summary.perSektor.map((sektor, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">{sektor.nama}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-600">{sektor.total}</td>
                  <td className="px-4 py-2 text-center">
                    <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">{sektor.iku}</span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">{sektor.total - sektor.iku}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}