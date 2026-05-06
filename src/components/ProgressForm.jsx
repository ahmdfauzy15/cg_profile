// components/ProgressForm.jsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProgressForm({ onSuccess }) {
  const [pksiList, setPksiList] = useState([]);
  const [progresList, setProgresList] = useState([]);
  const [selectedPksiDetail, setSelectedPksiDetail] = useState(null);
  const [form, setForm] = useState({
    id_pksi: "",
    id_progres_fk: "",
    keterangan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pksiRes, progresRes] = await Promise.all([
          supabase.from("master_pksi").select("id, nama_pksi, tahun_mulai, tahun_selesai, iku").order("nama_pksi"),
          supabase.from("master_progres").select("id, fase, urutan").order("urutan")
        ]);
        
        if (pksiRes.error) throw new Error(pksiRes.error.message);
        if (progresRes.error) throw new Error(progresRes.error.message);
        
        setPksiList(pksiRes.data || []);
        setProgresList(progresRes.data || []);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage({ type: "error", text: "Gagal memuat data: " + error.message });
      }
    };
    fetchData();
  }, []);

  const fetchPksiDetail = async (pksiId) => {
    if (!pksiId) {
      setSelectedPksiDetail(null);
      return;
    }
    
    const { data, error } = await supabase
      .from("master_pksi")
      .select(`
        *,
        master_kategori_pksi (nama),
        master_apps (nama),
        master_kategori_pengerjaan (jenis),
        master_sektor (nama)
      `)
      .eq("id", pksiId)
      .single();
      
    if (!error && data) {
      setSelectedPksiDetail(data);
    }
  };

  const handlePksiChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, id_pksi: value });
    fetchPksiDetail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.id_pksi || !form.id_progres_fk) {
      setMessage({ type: "error", text: "Silakan pilih PKSI dan Fase Progres" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    
    try {
      const today = new Date().toISOString().split("T")[0];
      const bulanTahun = new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' });
      
      const selectedProgres = progresList.find(p => p.id === parseInt(form.id_progres_fk));
      
      const { error } = await supabase.from("detail_progres_pksi").insert({
        id_pksi: parseInt(form.id_pksi),
        id_progres_fk: parseInt(form.id_progres_fk),
        keterangan: form.keterangan.trim() || null,
        tanggal: today,
        bulan_tahun: bulanTahun,
        status_text: selectedProgres?.fase || null
      });
      
      if (error) throw new Error(error.message);
      
      setMessage({ type: "success", text: "Progress berhasil diupdate" });
      setForm({ id_pksi: "", id_progres_fk: "", keterangan: "" });
      setSelectedPksiDetail(null);
      onSuccess();
      
    } catch (error) {
      console.error("Submit error:", error);
      setMessage({ type: "error", text: "Gagal: " + error.message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const getStatusColor = (urutan) => {
    if (urutan >= 7) return "border-green-500 bg-green-50";
    if (urutan >= 6) return "border-blue-500 bg-blue-50";
    if (urutan >= 4) return "border-orange-500 bg-orange-50";
    if (urutan >= 2) return "border-yellow-500 bg-yellow-50";
    return "border-gray-300 bg-gray-50";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-red-700 px-5 py-3">
        <h2 className="text-white font-semibold text-lg">Update Progres PKSI</h2>
        <p className="text-red-200 text-xs mt-0.5">Input perkembangan terbaru program kerja</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {message.text && (
          <div className={`p-3 rounded border ${
            message.type === "success" 
              ? "bg-green-50 border-green-400 text-green-700" 
              : message.type === "warning"
              ? "bg-yellow-50 border-yellow-400 text-yellow-700"
              : "bg-red-50 border-red-400 text-red-700"
          } text-sm`}>
            {message.text}
          </div>
        )}
        
        <div className="space-y-1">
          <label className="block font-semibold text-gray-700 text-sm">Nama PKSI</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            value={form.id_pksi}
            onChange={handlePksiChange}
            required
          >
            <option value="">Pilih Program Kerja</option>
            {pksiList.map((p) => (
              <option key={`pksi-${p.id}`} value={p.id}>
                {p.nama_pksi} {p.iku ? '(IKU)' : ''} - {p.tahun_mulai}
              </option>
            ))}
          </select>
        </div>
        
        {selectedPksiDetail && (
          <div className="bg-gray-50 rounded-md p-3 space-y-1 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Detail Program Kerja</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div>
                <span className="text-gray-500">Sektor:</span>
                <span className="ml-2 font-medium text-gray-800">{selectedPksiDetail.master_sektor?.nama || '-'}</span>
              </div>
              <div>
                <span className="text-gray-500">Kategori:</span>
                <span className="ml-2 font-medium text-gray-800">{selectedPksiDetail.master_kategori_pksi?.nama || '-'}</span>
              </div>
              <div>
                <span className="text-gray-500">Aplikasi:</span>
                <span className="ml-2 font-medium text-gray-800">{selectedPksiDetail.master_apps?.nama || '-'}</span>
              </div>
              <div>
                <span className="text-gray-500">Jenis Pengerjaan:</span>
                <span className="ml-2 font-medium text-gray-800">{selectedPksiDetail.master_kategori_pengerjaan?.jenis || '-'}</span>
              </div>
              <div>
                <span className="text-gray-500">Tahun:</span>
                <span className="ml-2 font-medium text-gray-800">{selectedPksiDetail.tahun_mulai} - {selectedPksiDetail.tahun_selesai}</span>
              </div>
              <div>
                <span className="text-gray-500">IKU:</span>
                <span className={`ml-2 font-medium ${selectedPksiDetail.iku ? 'text-red-600' : 'text-gray-500'}`}>
                  {selectedPksiDetail.iku ? 'Ya' : 'Tidak'}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-1">
          <label className="block font-semibold text-gray-700 text-sm">Fase Progres</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            value={form.id_progres_fk}
            onChange={(e) => setForm({ ...form, id_progres_fk: e.target.value })}
            required
          >
            <option value="">Pilih Fase</option>
            {progresList.map((p) => (
              <option key={`progres-${p.id}`} value={p.id}>
                {p.fase}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-1">
          <label className="block font-semibold text-gray-700 text-sm">Keterangan</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
            rows="3"
            value={form.keterangan}
            onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
            placeholder="Deskripsikan progres yang telah dicapai..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || pksiList.length === 0}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isSubmitting ? "Memproses..." : "Kirim Update Progres"}
        </button>
      </form>
    </div>
  );
}