import { stringToColor } from "@/lib/stringToColor";
import { motion } from "framer-motion";

function FollowPointer({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    avatar: string;
    email: string;
  };
}) {
  const color = stringToColor(info.email || "1");

  return (
    <motion.div
      className="pointer-events-none fixed z-50"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        transform: 'translate(0, 0)',
        willChange: 'transform',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      animate={{
        x: 0,
        y: 0,
        left: x,
        top: y,
        transition: { 
          type: 'spring', 
          damping: 30, 
          stiffness: 1000, 
          mass: 0.5,
          restDelta: 0.001
        }
      }}
      initial={false}
    >
      <div className="relative flex items-center">
        {/* Pointer cursor */}
        <div 
          className="w-3 h-3 border-b-2 border-r-2 border-white"
          style={{
            transform: 'rotate(-45deg)',
            borderColor: color,
            position: 'relative',
            left: '4px',
            top: '2px'
          }}
        />
        
        {/* Tooltip */}
        <motion.div
          className="ml-3 px-2.5 py-1 text-white text-xs font-medium whitespace-nowrap rounded shadow-md"
          style={{
            backgroundColor: color,
            position: 'relative',
            left: '8px',
            top: '0px'
          }}
          initial={{ 
            scale: 0.9, 
            opacity: 0,
            x: 5
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: 10,
            transition: { 
              type: 'spring',
              stiffness: 500,
              damping: 30
            }
          }}
        >
          {info.name || info.email}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default FollowPointer;
