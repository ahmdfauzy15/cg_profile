import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Certifications = ({ certifications }) => {
  const [filter, setFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Check if certificate is new (2025)
  const isNewCert = (cert) => {
    return cert.date.includes('2025');
  };

  const issuers = ['all', ...new Set(certifications.map(cert => cert.issuer))];
  
  const filteredCerts = filter === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.issuer === filter);

  const openModal = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section id="certifications" className="py-20 md:py-28 px-4 md:px-6 max-w-7xl mx-auto relative" ref={ref}>
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
              <span className="text-purple-600 text-sm font-medium">Certifications</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text-secondary">
              Professional Certifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
            {issuers.map((issuer) => (
              <button
                key={issuer}
                onClick={() => setFilter(issuer)}
                className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full transition-all duration-300 text-xs md:text-sm font-medium ${
                  filter === issuer
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'glass-card text-gray-600 hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                {issuer === 'all' ? 'All Certificates' : issuer.length > 20 ? issuer.substring(0, 18) + '...' : issuer}
              </button>
            ))}
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredCerts.map((cert, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-4 md:p-5 group animate-fade-up relative overflow-hidden flex flex-col"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* New Badge */}
                {isNewCert(cert) && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                      NEW
                    </span>
                  </div>
                )}
                
                {/* Header Section */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 text-white text-base md:text-lg font-bold shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-blue-500 text-xs md:text-sm mt-1 truncate">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">Issued {cert.date}</p>
                  </div>
                </div>
                
                {/* Skills Section - Scrollable */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto custom-scroll">
                    {cert.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="inline-block text-[9px] md:text-[10px] bg-blue-50 px-2 py-0.5 rounded-full text-blue-600 border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Buttons Section */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => openModal(cert)}
                    className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 text-xs md:text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-1"
                  >
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </button>
                  <a
                    href={cert.file}
                    download
                    className="flex-1 py-2 rounded-lg bg-green-50 text-green-600 text-xs md:text-sm font-medium hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-1"
                  >
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 glass-card px-6 md:px-8 py-4 md:py-5 rounded-2xl">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text-primary">
                  {certifications.length}
                </div>
                <div className="text-xs text-gray-500 mt-1">Certifications</div>
              </div>
              <div className="w-px bg-blue-200 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text-secondary">
                  {certifications.reduce((acc, cert) => acc + cert.skills.length, 0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Skills Acquired</div>
              </div>
              <div className="w-px bg-blue-200 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text-accent">
                  {new Set(certifications.map(c => c.issuer)).size}
                </div>
                <div className="text-xs text-gray-500 mt-1">Institutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal PDF Viewer */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={closeModal}>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-bold text-gray-800 text-sm md:text-base truncate">{selectedCert.name}</h3>
                <p className="text-xs text-blue-600 truncate">{selectedCert.issuer} • {selectedCert.date}</p>
              </div>
              <div className="flex gap-2">
                <a
                  href={selectedCert.file}
                  download
                  className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-xs md:text-sm hover:shadow-lg transition-all text-center"
                >
                  Download
                </a>
                <button onClick={closeModal} className="p-1.5 md:p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-2 bg-gray-50 overflow-auto max-h-[calc(90vh-80px)]">
              {selectedCert.file?.endsWith('.pdf') ? (
                <iframe
                  src={`${selectedCert.file}#toolbar=1&navpanes=1`}
                  className="w-full h-[60vh] md:h-[70vh] rounded-lg"
                  title={selectedCert.name}
                />
              ) : (
                <img src={selectedCert.file} alt={selectedCert.name} className="w-full rounded-lg" />
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar */
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #93c5fd #e0e7ff;
        }
        
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scroll::-webkit-scrollbar-track {
          background: #e0e7ff;
          border-radius: 10px;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 10px;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #60a5fa;
        }
      `}</style>
    </>
  );
};

export default Certifications;