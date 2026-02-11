import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-dark-bg transition-colors">
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full rounded-full"
        >
        
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ x: [-2, 2, -2], y: [-2, 2, -2] }} 
              transition={{ duration: 0.2, repeat: Infinity }}
              className="text-4xl transform rotate-90"
              style={{ rotate: 90 }} 
            >
              🐝
            </motion.div>
          </div>
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-bottom-center"
            style={{ 
              height: '50%', 
              transformOrigin: 'bottom center', 
              transform: 'rotate(-45deg)'
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ rotate: [-10, 10, -10] }} 
                transition={{ duration: 0.4, repeat: Infinity }}
                className="text-5xl"
                style={{ rotate: 90 }} 
              >
                🐻
              </motion.div>
            </div>
          </div>

        </motion.div>

        <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full border-dashed opacity-50"></div>
        
        <div className="absolute flex flex-col items-center">
             <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-bold text-slate-400 text-sm tracking-widest"
            >
              LOADING...
            </motion.p>
        </div>

      </div>
    </div>
  );
}