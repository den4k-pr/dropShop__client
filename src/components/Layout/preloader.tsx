'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export const Loading = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const loadingPageRef = useRef(null);
  const logoNameRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    const loadingTimeout = setTimeout(() => {
      tl.to(loadingPageRef.current, {
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
          setLoading(false);
        },
      }).fromTo(
        logoNameRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          delay: 0.5,
        },
      );
    }, 4000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <>
      {loading ? (
        <section className='preloader'>
            <div ref={loadingPageRef} className="preloader-spinear">
                <svg viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="big-circle" d="M101 51C101 78.6142 78.6142 101 51 101C23.3858 101 1 78.6142 1 51" stroke="#252525" strokeWidth="2"/>
                    <path className="small-circle" d="M91 51C91 28.9086 73.0914 11 51 11C28.9086 11 11 28.9086 11 51" stroke="#252525" strokeWidth="2"/>
                </svg>
            </div>
        </section>
      ) : (
        children
      )}
    </>
  );
};
