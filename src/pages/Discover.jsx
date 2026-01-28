import { useEffect, useState } from 'react';
import { useTalent } from '../contexts/TalentContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Discover() {
  const { talents = [] } = useTalent();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({ duration: 900, easing: 'ease-out-cubic' });
  }, []);

  // Filter talents based on search
  const filteredTalents = talents.filter((talent) =>
    talent.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4">
      <h1
        className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg"
        data-aos="fade-down"
      >
        Discover Talent
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10" data-aos="fade-down">
        <input
          type="text"
          placeholder="Search by talent bio (e.g., dancer, developer, artist)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl px-4 py-2 rounded-lg border border-white/20 bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
        />
      </div>

      {/* Talent Cards or Empty Message */}
      {talents.length === 0 ? (
        <p className="text-gray-200 text-center text-lg" data-aos="zoom-in">
          No talents uploaded yet. Be the first to showcase your talent! 
        </p>
      ) : filteredTalents.length === 0 ? (
        <p className="text-gray-200 text-center text-lg" data-aos="zoom-in">
          No matching talents found. Try another keyword.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTalents.map((t, idx) => (
            <article
              key={t.id}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col border border-white/10"
            >
              {t.photo ? (
                <img
                  src={t.photo}
                  alt={`${t.name} profile`}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {t.name?.charAt(0)}
                </div>
              )}

              <div className="flex flex-col flex-1 p-4 space-y-2">
                <h3 className="text-lg font-bold text-indigo-900">{t.name}</h3>
                <p className="text-sm text-slate-800 flex-1 whitespace-pre-line line-clamp-4">
                  {t.bio}
                </p>

                {t.contact && (
                  <p className="text-xs text-slate-700 break-all">
                    <strong>Contact:</strong> {t.contact}
                  </p>
                )}

                {t.url && (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 text-sm font-semibold hover:underline"
                  >
                    View Showcase
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
