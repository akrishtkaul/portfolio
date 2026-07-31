import { useCallback, useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import content from '../data/content.json';
import { isPlaceholder } from '../utils/placeholder';
import logo from '../assets/ak-logo.png';
import profilePhoto from '../assets/akrisht_profile.jpg';
import Typewriter from './Typewriter';

export default function ProfessionalView() {
  const [open, setOpen] = useState(false);
  const [flippedId, setFlippedId] = useState(null);
  const { about } = content;
  const firstName = about.name.split(' ')[0];
  const bioParas = (about.bio || []).filter((p) => !isPlaceholder(p));
  const personalNote = isPlaceholder(about.personalNote) ? null : about.personalNote;
  const taglineWords = (about.taglineWords || []).filter((w) => !isPlaceholder(w));
  const education = content.education.find((e) => e.id === 'columbia');
  const experienceItems = content.items.filter((i) => i.type.includes('experience') && i.professional);
  const projectItems = content.items.filter((i) => i.type.includes('project') && i.professional);

  const handleOpen = useCallback(() => {
    // Dismiss the boot screen if it's still showing — without this, closing
    // the overlay would drop the visitor back on the boot screen instead of
    // the desk scene. This button is a sibling of the boot screen in the
    // component tree (not nested inside it), so the click can't bubble into
    // its own "click anywhere to continue" handler; no stopPropagation needed.
    window.dispatchEvent(new Event('pixel-desk-enter-silent'));
    // This is a real user gesture, so it also satisfies the browser's
    // autoplay-with-sound requirement for BackgroundMusic.
    window.dispatchEvent(new Event('pixel-desk-entered'));
    // Collapse the pixel-desk's expanded modal first, so closing this view
    // returns to the small scene instead of leaving it stuck expanded.
    window.dispatchEvent(new Event('pixel-desk-collapse'));
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setFlippedId(null);
  };

  // LoadingScreen's boot-screen countdown dispatches this to auto-open the
  // professional view the same way the logo button does.
  useEffect(() => {
    window.addEventListener('pixel-desk-open-professional', handleOpen);
    return () => window.removeEventListener('pixel-desk-open-professional', handleOpen);
  }, [handleOpen]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open recruiter-friendly view"
        className="hidden min-[901px]:block fixed top-6 left-6 z-[150] w-32 h-32 rounded-full overflow-hidden border-2 border-transparent hover:border-[#F0854A] hover:scale-105 transition-all duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
      >
        <img src={logo} alt="Akrisht Kaul logo" className="w-full h-full object-cover" />
      </button>

      {/* Mobile: the desk scene isn't rendered below 900px, so the logo above
          is hidden. This sits in the icon column's own reserved strip (the
          same width DeskTop keeps clear of its app windows), below the last
          icon, where nothing else ever renders. */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open recruiter-friendly view"
        className="block min-[901px]:hidden fixed z-[150] rounded-lg border border-[#1E2532] bg-[#0B0F1B] text-[#8A99AE] hover:text-[#F0854A] hover:border-[#2A3242] transition-colors text-[9px] leading-tight text-center"
        style={{ bottom: 10, left: 8, width: 62, padding: '6px 2px' }}
      >
        resume<br />view
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] overflow-y-auto"
          data-scroll="1"
          style={{
            background: 'rgba(6, 8, 16, 0.9)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="Back to desk"
            className="fixed top-5 right-5 z-[210] flex items-center gap-2 h-10 px-4 rounded-full border border-[#1E2532] bg-[#0B0F1B] text-[#8A99AE] hover:text-[#F0854A] hover:border-[#2A3242] transition-colors text-sm font-medium"
          >
            <FaArrowLeft className="text-xs" />
            Back to desk
          </button>

          <div className="w-full max-w-5xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 md:gap-14 items-center">
              <div>
                <div className="rounded-3xl border border-[#232B3A] bg-[#0B0F1B] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <img
                    src={profilePhoto}
                    alt={about.name}
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                </div>
                <div className="flex justify-center gap-3 mt-5">
                  <a
                    href={about.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-11 h-11 rounded-full border border-[#232B3A] bg-[#0B0F1B] text-[#8A99AE] hover:text-[#F0854A] hover:border-[#2A3242] flex items-center justify-center transition-colors"
                  >
                    <FaGithub className="text-lg" />
                  </a>
                  <a
                    href={about.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-11 h-11 rounded-full border border-[#232B3A] bg-[#0B0F1B] text-[#8A99AE] hover:text-[#F0854A] hover:border-[#2A3242] flex items-center justify-center transition-colors"
                  >
                    <FaLinkedin className="text-lg" />
                  </a>
                  <a
                    href={`mailto:${about.contact.email}`}
                    aria-label="Email"
                    className="w-11 h-11 rounded-full border border-[#232B3A] bg-[#0B0F1B] text-[#8A99AE] hover:text-[#F0854A] hover:border-[#2A3242] flex items-center justify-center transition-colors"
                  >
                    <FaEnvelope className="text-lg" />
                  </a>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-[#E7EDF5]">
                    Hey, I&apos;m <span className="text-[#F0854A]">{firstName}</span>
                  </h1>
                  {taglineWords.length > 0 && (
                    <div className="h-8 mt-2">
                      <Typewriter words={taglineWords} className="text-xl md:text-2xl font-bold text-[#F0854A]" />
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-[#B8C4D4] text-base md:text-lg leading-relaxed">
                  {bioParas.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {personalNote && <p className="text-[#7C8CA3] italic">{personalNote}</p>}
                </div>

                {education && (
                  <div className="pt-5 border-t border-[#1E2532]">
                    <span className="text-[#67788F] uppercase tracking-widest text-xs">Education</span>
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base md:text-lg">
                      <span className="text-[#E7EDF5] font-semibold">{education.school}</span>
                      <span className="text-[#B8C4D4]">{education.degree}</span>
                      <span className="text-[#67788F] text-sm md:text-base">{education.dates}</span>
                      {education.honors?.length > 0 && (
                        <span className="text-[#F2B94A] font-medium">{education.honors.join(' · ')}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-[#E7EDF5] mb-6">Recent Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {experienceItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col h-full rounded-2xl border border-[#232B3A] bg-[#0B0F1B] p-5"
                  >
                    <h3 className="text-lg font-semibold text-[#E7EDF5]">{item.org}</h3>
                    <p className="text-[#F0854A] font-medium text-sm mt-0.5">{item.role}</p>
                    {!isPlaceholder(item.dates) && <p className="text-[#67788F] text-xs mt-1">{item.dates}</p>}
                    {!isPlaceholder(item.description) && (
                      <p className="mt-3 text-[#B8C4D4] text-sm leading-relaxed">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-[#E7EDF5]">Projects</h2>
                <a
                  href={about.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="text-[#67788F] hover:text-[#F0854A] transition-colors"
                >
                  <FaGithub className="text-2xl" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {projectItems.map((item) => {
                  const isFlipped = flippedId === item.id;
                  const dates = isPlaceholder(item.dates) ? null : item.dates;
                  const description = isPlaceholder(item.description) ? null : item.description;
                  const details = (item.details || []).filter((d) => !isPlaceholder(d));

                  return (
                    <div
                      key={item.id}
                      onClick={() => setFlippedId(isFlipped ? null : item.id)}
                      className="h-72 cursor-pointer"
                      style={{ perspective: 1000 }}
                    >
                      <div
                        className="relative w-full h-full transition-transform duration-500"
                        style={{
                          transformStyle: 'preserve-3d',
                          WebkitTransformStyle: 'preserve-3d',
                          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}
                      >
                        {/* Front */}
                        <div
                          className="absolute inset-0 rounded-2xl border border-[#232B3A] bg-[#0B0F1B] p-5 flex flex-col"
                          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                        >
                          <h3 className="text-lg font-semibold text-[#E7EDF5]">{item.name}</h3>
                          {dates && <p className="text-[#67788F] text-xs mt-1">{dates}</p>}
                          {description && (
                            <p className="mt-3 text-[#B8C4D4] text-sm leading-relaxed flex-grow">{description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#0D1220] text-[#F0854A] border border-[#232B3A]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Back */}
                        <div
                          className="absolute inset-0 rounded-2xl border border-[#232B3A] bg-[#0B0F1B] p-5 flex flex-col overflow-y-auto"
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                          }}
                        >
                          <h3 className="text-lg font-semibold text-[#E7EDF5]">{item.name}</h3>
                          {dates && <p className="text-[#67788F] text-xs mt-1 mb-3">{dates}</p>}
                          <ul className="space-y-2">
                            {details.map((d, i) => (
                              <li key={i} className="flex gap-2 text-sm text-[#96A3B6] leading-relaxed">
                                <span className="text-[#F0854A] mt-1 flex-shrink-0">•</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
