import React, { memo } from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { id: 1, title: 'Check Eligibility', date: 'Anytime', description: 'Ensure you meet the age and citizenship requirements.' },
  { id: 2, title: 'Register to Vote', date: '30 Days Before', description: 'Complete your voter registration before the deadline.' },
  { id: 3, title: 'Primary Election', date: 'Varies by State', description: 'Vote to select the final candidates for the general election.' },
  { id: 4, title: 'General Election', date: 'First Tuesday in Nov', description: 'Cast your final ballot for local, state, and federal offices.' }
];

const Timeline = memo(function Timeline() {
  return (
    <div className="timeline-container" style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '2rem' }} aria-label="Election Timeline">
      {timelineEvents.map((event, index) => (
        <motion.article
          key={event.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="liquid-glass timeline-card"
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', willChange: 'transform, opacity' }}
        >
          <div style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-purple)', boxShadow: '0 0 10px var(--accent-purple)' }} aria-hidden="true"></div>
          <h3 style={{ color: 'var(--accent-blue)', margin: 0 }}>{event.date}</h3>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{event.title}</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{event.description}</p>
        </motion.article>
      ))}
    </div>
  );
});

export default Timeline;
