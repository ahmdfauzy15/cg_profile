import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Certifications = ({ certifications }) => {
  const [filter, setFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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
      <section id="certifications" className="py-28 px-6 max-w-7xl mx-auto relative" ref={ref}>
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
              <span className="text-purple-600 text-sm font-medium">Certifications</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-secondary">
              Professional Certifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {issuers.map((issuer) => (
              <button
                key={issuer}
                onClick={() => setFilter(issuer)}
                className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  filter === issuer
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'glass-card text-gray-600 hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                {issuer === 'all' ? 'All Certificates' : issuer}
              </button>
            ))}
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-5 cursor-pointer group animate-fade-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
                onClick={() => openModal(cert)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 text-white text-2xl font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-blue-500 text-sm mt-1 font-medium">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs mt-1">Issued {cert.date}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cert.skills.slice(0, 2).map((skill, i) => (
                        <span key={i} className="text-[10px] bg-blue-50 px-2 py-0.5 rounded-full text-blue-600">
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 2 && (
                        <span className="text-[10px] bg-cyan-50 px-2 py-0.5 rounded-full text-cyan-600">
                          +{cert.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap gap-8 glass-card px-8 py-5">
              <div className="group">
                <div className="text-3xl font-bold gradient-text-primary group-hover:scale-110 transition-transform">
                  {certifications.length}
                </div>
                <div className="text-xs text-gray-500 mt-1">Certifications</div>
              </div>
              <div className="w-px bg-blue-200 my-auto"></div>
              <div className="group">
                <div className="text-3xl font-bold gradient-text-secondary group-hover:scale-110 transition-transform">
                  {certifications.reduce((acc, cert) => acc + cert.skills.length, 0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Skills Acquired</div>
              </div>
              <div className="w-px bg-blue-200 my-auto"></div>
              <div className="group">
                <div className="text-3xl font-bold gradient-text-accent group-hover:scale-110 transition-transform">
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
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
              <div>
                <h3 className="font-bold text-gray-800">{selectedCert.name}</h3>
                <p className="text-sm text-blue-600">{selectedCert.issuer} • {selectedCert.date}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={selectedCert.file}
                  download
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Download
                </a>
                <button onClick={closeModal} className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-2 bg-gray-50 overflow-auto max-h-[calc(90vh-80px)]">
              {selectedCert.file?.endsWith('.pdf') ? (
                <iframe
                  src={`${selectedCert.file}#toolbar=1&navpanes=1`}
                  className="w-full h-[75vh] rounded-lg"
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
      `}</style>
    </>
  );
};

export default Certifications;