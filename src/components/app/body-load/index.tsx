'use client';
import { useAuthStore } from '@/store';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './body-load.css';

export default function BodyLoad() {
  const { loading } = useAuthStore();

  useEffect(() => {
    if (!loading) {
      document.body.style.overflowY = 'auto';
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className='page-loading-wrapper'
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='page-loading'>
            <div>
              <ul>
                {[...Array(7)].map((_, i) => (
                  <li key={i}>
                    <svg fill='currentColor' viewBox='0 0 90 120'>
                      <path d='M90,0 L90,120 L11,120 C4.9,120 0,115.1 0,109 L0,11 C0,4.9 4.9,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1,81 16,82.1 16,83.5 C16,84.8 17,85.9 18.3,86 L71.5,86 C72.9,86 74,84.9 74,83.5 C74,82.2 73,81.1 71.7,81 Z M71.5,57 L18.5,57 C17.1,57 16,58.1 16,59.5 C16,60.8 17,61.9 18.3,62 L71.5,62 C72.9,62 74,60.9 74,59.5 C74,58.1 72.9,57 71.5,57 Z M71.5,33 L18.5,33 C17.1,33 16,34.1 16,35.5 C16,36.8 17,37.9 18.3,38 L71.5,38 C72.9,38 74,36.9 74,35.5 C74,34.1 72.9,33 71.5,33 Z'></path>
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
