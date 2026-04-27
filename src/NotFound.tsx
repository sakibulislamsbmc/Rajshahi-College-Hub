import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const [text, setText] = useState('');
  const fullText = "দুঃখিত! আপনি যে পেজটি খুঁজছেন তা মহাকাশে হারিয়ে গেছে... 🚀";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background stars/dots for space effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center flex flex-col items-center">
        {/* Waving Alien */}
        <motion.div
          animate={{ 
            rotate: [0, 20, -20, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl mb-8 drop-shadow-2xl"
        >
          👽
        </motion.div>

        {/* Floating 404 */}
        <div className="flex gap-4 text-9xl font-extrabold text-primary mb-8 drop-shadow-lg">
          <motion.span
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          >
            4
          </motion.span>
          <motion.span
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            0
          </motion.span>
          <motion.span
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            4
          </motion.span>
        </div>

        {/* Typing Text */}
        <div className="h-20 mb-8 flex items-center justify-center">
          <p className="text-xl md:text-2xl font-medium text-foreground max-w-md mx-auto">
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-6 bg-primary ml-1 align-middle"
            />
          </p>
        </div>

        {/* Back to Home Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 text-lg h-14 shadow-lg shadow-primary/20">
              <ArrowLeft className="mr-2 h-5 w-5" /> ফিরে যান
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
