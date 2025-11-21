"use client";

import React from 'react';

const NoticeScroller = () => {
  const notices = [
    "5K+ Clients Served Successfully",
    "50+ Years Combined Experience",
    "$50M+ Assets Under Management",
    "98% Client Satisfaction Rate",
    "Comprehensive Tax Solutions",
    "Strategic Business Planning"
  ];

  return (
    <div className="w-full overflow-hidden border-t border-b border-white/10 py-6 relative">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] -z-10" />
      
      {/* Scroller wrapper */}
      <div className="w-full overflow-hidden max-w-none">
        <div className="inline-flex items-center animate-scroll will-change-transform whitespace-nowrap">
          {notices.map((notice, index) => (
            <React.Fragment key={`first-${index}`}>
              <span className="text-white/90 shadow-[0_1px_3px_rgba(0,0,0,0.3)] px-1" style={{ fontSize: '1.25rem', fontWeight: 300, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                {notice}
              </span>
              <span className="mx-6 text-white/50 text-2xl font-light">·</span>
            </React.Fragment>
          ))}
          {notices.map((notice, index) => (
            <React.Fragment key={`second-${index}`}>
              <span className="text-white/90 shadow-[0_1px_3px_rgba(0,0,0,0.3)] px-1" style={{ fontSize: '1.25rem', fontWeight: 300, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                {notice}
              </span>
              {index < notices.length - 1 && (
                <span className="mx-6 text-white/50 text-2xl font-light">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeScroller;