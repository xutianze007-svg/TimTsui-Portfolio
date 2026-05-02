import React, { useState, useEffect, useRef } from 'react';

interface ShuffleProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
  triggerOnHover?: boolean;
  // Props from the user's snippet for compatibility
  shuffleDirection?: 'left' | 'right' | 'center';
  animationMode?: 'every' | 'evenodd';
  shuffleTimes?: number;
  ease?: string;
  stagger?: number;
  threshold?: number;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  duration = 0.5,
  triggerOnHover = true,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef(false);

  const startShuffle = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Calculate speed based on duration and text length
    // Total steps = text.length / increment
    // Total time = steps * 30ms
    // We want Total time ~= duration * 1000
    // steps = (duration * 1000) / 30
    // increment = text.length / steps
    
    const steps = (duration * 1000) / 30;
    const increment = text.length / steps;

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text); // Ensure final text is correct
      }

      iteration += Math.max(increment, 1/5); // ensure at least some progress
    }, 30);
  };

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      isHovering.current = true;
      startShuffle();
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span 
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
};

export default Shuffle;
