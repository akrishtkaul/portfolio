import { useState } from 'react';
import content from '../data/content.json';
import { isPlaceholder } from '../utils/placeholder';
import profilePhoto from '../assets/akrisht_profile.jpg';
import Assistant from './Assistant';

function stripUrl(url) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

function StatusView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 11 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontSize: 11, borderBottom: '1px dotted #1A202C', paddingBottom: 5 }}>
        <span style={{ color: '#67788F' }}>visitor@akrisht</span>
        <span style={{ color: '#3D4658' }}>:</span>
        <span style={{ color: '#67788F' }}>~$</span>
        <span style={{ color: '#F2B94A' }}>ask --live</span>
      </div>

      <Assistant />
    </div>
  );
}

function AboutView({ about }) {
  const bioParas = (about.bio || []).filter((p) => !isPlaceholder(p));
  const personalNote = isPlaceholder(about.personalNote) ? null : about.personalNote;
  const tagline = (about.taglineWords || []).filter((w) => !isPlaceholder(w)).join(' / ');

  const contacts = [
    { key: '@', label: about.contact.email, href: `mailto:${about.contact.email}` },
    { key: 'gh', label: stripUrl(about.contact.github), href: about.contact.github },
    { key: 'in', label: stripUrl(about.contact.linkedin), href: about.contact.linkedin },
  ];

  const skillRows = Object.entries(about.skills || {})
    .map(([label, items]) => ({ label, items: (items || []).filter((i) => !isPlaceholder(i)).join(' · ') }))
    .filter((row) => row.items);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <img
          src={profilePhoto}
          alt={about.name}
          style={{ width: 108, height: 108, flex: 'none', objectFit: 'cover', border: '1px solid #202836', display: 'block' }}
        />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 2 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 22, color: '#E7EDF5', lineHeight: 1.15 }}>{about.name}</div>
          <div style={{ fontSize: 12, color: '#67788F' }}>{about.location}</div>
          {tagline && <div style={{ fontSize: 12, color: '#B9832F', overflowWrap: 'anywhere' }}>{tagline}</div>}
        </div>
      </div>

      {bioParas.map((p, i) => (
        <div key={i} style={{ color: '#C6D0DD', fontSize: 13, lineHeight: 1.55, textWrap: 'pretty' }}>{p}</div>
      ))}
      {personalNote && <div style={{ color: '#7C8CA3', fontSize: 12, lineHeight: 1.5, textWrap: 'pretty' }}>{personalNote}</div>}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 5, borderTop: '1px dotted #1A202C' }}>
        {contacts.map((c) => (
          <a
            key={c.key}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F2B94A] transition-colors"
            style={{ fontSize: 11, color: '#F0854A', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <span style={{ color: '#4E5C72' }}>{c.key}</span>
            <span>{c.label}</span>
          </a>
        ))}
      </div>

      {skillRows.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 5, borderTop: '1px dotted #1A202C' }}>
          {skillRows.map((row) => (
            <div key={row.label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ width: 62, flex: 'none', color: '#67788F', fontSize: 10, letterSpacing: '0.04em' }}>{row.label}</span>
              <span style={{ flex: 1, minWidth: 0, color: '#B8C4D4', fontSize: 11, overflowWrap: 'anywhere' }}>{row.items}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkView({ items }) {
  const [open, setOpen] = useState({});
  const projects = items.filter((i) => i.type.includes('project'));
  const ordered = [...projects.filter((i) => i.featured), ...projects.filter((i) => !i.featured)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontSize: 10, color: '#6D7D95', paddingBottom: 5, borderBottom: '1px dotted #1A202C' }}>
        <span>{ordered.length} entries</span>
        <span style={{ color: '#2F3849' }}>|</span>
        <span style={{ color: '#B9832F' }}>featured first</span>
        <span style={{ color: '#2F3849' }}>|</span>
        <span>click to expand</span>
      </div>

      {ordered.map((it) => {
        const isOpen = !!open[it.id];
        const dates = isPlaceholder(it.dates) ? null : it.dates;
        const description = isPlaceholder(it.description) ? null : it.description;
        const details = (it.details || []).filter((d) => !isPlaceholder(d));

        return (
          <div key={it.id} style={{ borderBottom: '1px dotted #171D28', padding: '6px 0' }}>
            <div
              onClick={() => setOpen((s) => ({ ...s, [it.id]: !s[it.id] }))}
              style={{ display: 'flex', alignItems: 'baseline', gap: 6, cursor: 'pointer', userSelect: 'none' }}
            >
              <span style={{ flex: 'none', width: 9, color: it.featured ? '#F0854A' : '#4E5C72', fontSize: 11 }}>{isOpen ? '-' : '+'}</span>
              <span style={{ flex: 1, minWidth: 0, color: it.featured ? '#E7EDF5' : '#AEBBCB', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                {it.name}
              </span>
              {dates && <span style={{ flex: 'none', color: '#6D7D95', fontSize: 10 }}>{dates}</span>}
            </div>

            {description && (
              <div style={{ paddingLeft: 15, color: '#96A3B6', fontSize: 11, lineHeight: 1.45, textWrap: 'pretty' }}>{description}</div>
            )}

            <div style={{ paddingLeft: 15, display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 3 }}>
              {it.tags.map((t) => (
                <span key={t} style={{ fontSize: 9, color: '#7C8CA3', border: '1px solid #1E2532', padding: '0 3px', lineHeight: 1.6 }}>{t}</span>
              ))}
            </div>

            {isOpen && (
              <div style={{ paddingLeft: 15, marginTop: 5, display: 'flex', flexDirection: 'column', gap: 3, borderLeft: '1px solid #202836', marginLeft: 4, paddingTop: 1 }}>
                {details.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: 5, alignItems: 'flex-start' }}>
                    <span style={{ flex: 'none', color: '#B9832F', fontSize: 10 }}>-</span>
                    <span style={{ flex: 1, minWidth: 0, color: '#AEBBCB', fontSize: 11, lineHeight: 1.45, textWrap: 'pretty' }}>{d}</span>
                  </div>
                ))}
                {it.url && (
                  <a href={it.url} target="_blank" rel="noreferrer" className="hover:text-[#F2B94A] transition-colors" style={{ fontSize: 10, color: '#F0854A' }}>
                    {stripUrl(it.url)}
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ExperienceView({ items }) {
  const exp = items.filter((i) => i.type.includes('experience'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {exp.map((it) => {
        const bullets = (it.details || []).slice(0, 2).filter((d) => !isPlaceholder(d));
        return (
          <div key={it.id} style={{ borderBottom: '1px dotted #171D28', padding: '6px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ flex: 1, minWidth: 0, color: '#E7EDF5', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{it.org}</span>
              {!isPlaceholder(it.dates) && <span style={{ flex: 'none', color: '#6D7D95', fontSize: 10 }}>{it.dates}</span>}
            </div>
            <div style={{ color: '#F0854A', fontSize: 11 }}>{it.role}</div>
            {bullets.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
                {bullets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 5, alignItems: 'flex-start' }}>
                    <span style={{ flex: 'none', color: '#3D4658', fontSize: 10 }}>-</span>
                    <span style={{ flex: 1, minWidth: 0, color: '#96A3B6', fontSize: 11, lineHeight: 1.45, textWrap: 'pretty' }}>{b}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function EducationView({ education }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {education.map((e) => {
        const honors = (e.honors || []).filter((h) => !isPlaceholder(h));
        const detail = isPlaceholder(e.detail) ? null : e.detail;
        return (
          <div key={e.id} style={{ borderBottom: '1px dotted #171D28', padding: '7px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ flex: 1, minWidth: 0, color: '#E7EDF5', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{e.school}</span>
              {!isPlaceholder(e.dates) && <span style={{ flex: 'none', color: '#6D7D95', fontSize: 10 }}>{e.dates}</span>}
            </div>
            <div style={{ color: '#F0854A', fontSize: 11 }}>{e.degree}</div>
            {detail && <div style={{ color: '#67788F', fontSize: 10 }}>{detail}</div>}
            {honors.length > 0 && <div style={{ color: '#B9832F', fontSize: 10 }}>{honors.join(' · ')}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default function PanelBody({ view }) {
  let body = null;
  if (view === 'status') body = <StatusView status={content.status} syncedAt={content.syncedAt} />;
  else if (view === 'about') body = <AboutView about={content.about} />;
  else if (view === 'work') body = <WorkView items={content.items} />;
  else if (view === 'experience') body = <ExperienceView items={content.items} />;
  else if (view === 'education') body = <EducationView education={content.education} />;

  return (
    <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace", color: '#C6D0DD', fontSize: 12, lineHeight: 1.38 }}>
      {body}
    </div>
  );
}
