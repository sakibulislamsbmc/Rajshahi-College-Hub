/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Bell, Newspaper, MessageSquare, Search, Calendar, Users, Droplets, Bus, 
  Calculator, HelpCircle, Menu, X, Plus, Heart, Info, ExternalLink, 
  MapPin, Clock, Phone, Moon, Sun, ArrowRight, GraduationCap, Award, BookOpen, 
  ChevronRight, LogIn, Megaphone, Facebook, Linkedin, Globe, Home, User
} from 'lucide-react';
import { 
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, 
  increment, serverTimestamp 
} from 'firebase/firestore';
import { db, auth, signIn, logOut } from './firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

import Home from './pages/Home';
import NoticesPage from './pages/Notices';
import Routine from './pages/Routine';
import Department from './pages/Department';
import DepartmentDetails from './pages/DepartmentDetails';
import SubjectDetails from './pages/SubjectDetails';
import Teachers from './pages/Teachers';
import BusRoute from './pages/BusRoute';
import BloodDonation from './pages/BloodDonation';
import Confession from './pages/Confession';
import Profile from './pages/Profile';
import NotFound from './NotFound';

import CgpaCalculator from './pages/CgpaCalculator';

// --- Types ---
interface Notice { id: string; title: string; content: string; date: any; category: string; }
interface News { id: string; title: string; content: string; date: any; imageUrl?: string; }
interface Confession { id: string; content: string; date: any; likes: number; }
interface LostItem { id: string; item: string; description: string; contact: string; date: any; type: 'Lost' | 'Found'; uid: string; }

// --- Dummy Data ---
const TEACHERS = [
  { id: 1, name: "Tasnia Nasrin", role: "Lecturer", dept: "Islamic History and Culture", img: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Most. Afshara Tasnim Ritu", role: "Lecturer", dept: "Islamic History and Culture", img: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Mst. Somapti Akter", role: "Lecturer", dept: "Islamic History and Culture", img: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Syed Naimur Rahman Sohel", role: "Lecturer", dept: "Islamic History and Culture", img: "https://i.pravatar.cc/150?u=4" },
];

const CLUBS = [
  { id: 1, name: "Photographic Society", icon: "📷" },
  { id: 2, name: "Business Club", icon: "💼" },
  { id: 3, name: "Chhotto Swapna", icon: "🌟" },
  { id: 4, name: "Cultural Club", icon: "🎭" },
  { id: 5, name: "D-Aid Club", icon: "🤝" },
  { id: 6, name: "E-Club", icon: "💻" },
];

const SERVICES = [
  { id: 1, name: "ক্যান্টিন", sub: "মেন্যু ও দাম", icon: <Droplets className="h-6 w-6 text-blue-500" /> },
  { id: 2, name: "ক্যালেন্ডার", sub: "একাডেমিক", icon: <Calendar className="h-6 w-6 text-blue-500" /> },
  { id: 3, name: "ইভেন্ট", sub: "আসন্ন অনুষ্ঠান", icon: <Bell className="h-6 w-6 text-orange-500" /> },
  { id: 4, name: "হারিয়েছেন?", sub: "খুঁজে দেখুন", icon: <Search className="h-6 w-6 text-blue-500" /> },
  { id: 5, name: "বাস রুট", sub: "যাতায়াত", icon: <Bus className="h-6 w-6 text-blue-500" /> },
  { id: 6, name: "CGPA", sub: "ক্যালকুলেটর", icon: <Calculator className="h-6 w-6 text-green-500" /> },
  { id: 7, name: "হেল্প ডেস্ক", sub: "সহযোগিতা", icon: <HelpCircle className="h-6 w-6 text-red-500" /> },
];

// --- Components ---
const SectionHeader = ({ icon: Icon, title, subtitle, actionText }: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
    <div className="flex items-start gap-4">
      <div className="mt-1">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </div>
    {actionText && (
      <Button variant="ghost" className="text-primary hover:bg-primary/10 font-bold shrink-0">
        {actionText} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    )}
  </div>
);

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 2000;
          const startTime = performance.now();
          
          const updateCounter = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(easeOutQuart * value));
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };
          requestAnimationFrame(updateCounter);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count.toLocaleString('en-US')}</span>;
}

function TypewriterText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const chars = Array.from(text);
    let timeout: NodeJS.Timeout;
    
    const startTyping = () => {
      timeout = setInterval(() => {
        setDisplayedText(chars.slice(0, i + 1).join(''));
        i++;
        if (i >= chars.length) {
          clearInterval(timeout);
          setIsComplete(true);
        }
      }, 80);
    };

    const initialDelay = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(initialDelay);
      clearInterval(timeout);
    };
  }, [text, delay]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="animate-pulse border-r-4 border-primary ml-1 inline-block h-[1em] translate-y-2"></span>}
    </span>
  );
}

function DeveloperCard() {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const profileImgUrl = "https://www.image2url.com/r2/default/images/1776236146026-8f397165-e1a0-4d63-83c9-0a9e17f36778.jpeg";

  return (
    <>
      <motion.div
        ref={cardRef}
        layoutId="dev-card"
        onClick={() => setIsOpen(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="cursor-pointer group relative w-full max-w-sm mx-auto"
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-b from-white/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" style={{ transform: "translateZ(-20px)" }}></div>
        <Card 
          className="bg-[#1a1a1a]/80 backdrop-blur-xl text-white border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent"></div>
          
          <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
            <motion.div 
              className="w-28 h-28 mx-auto mb-6 rounded-2xl overflow-hidden border border-white/20 shadow-xl relative"
              whileHover={{ rotateY: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img src={profileImgUrl} alt="Sakibul Islam Sabbir" className="w-full h-full object-cover" />
              <div className="absolute -bottom-2 -right-2 bg-white text-black rounded-full p-1.5 shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-2 tracking-tight">SAKIBUL ISLAM SABBIR</h3>
            <Badge className="bg-white/5 text-white/80 hover:bg-white/10 border border-white/10 mb-6 px-3 py-1 text-xs tracking-wider">
              <span className="text-primary mr-1">✦</span> LEAD DEVELOPER
            </Badge>
            
            <p className="text-sm text-gray-400 italic mb-8 font-medium">
              "Team leader and main developer of the RC Hub portal..."
            </p>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-white/40 transition-colors">
                <Info className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-300 transition-colors">View Dossier</span>
            </div>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-2xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              layoutId="dev-card"
              className="bg-[#1a1a1a]/90 backdrop-blur-3xl text-white border border-white/10 rounded-[2.5rem] p-8 sm:p-12 w-full max-w-2xl relative overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#e74c3c]/20 via-white/5 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <motion.div 
                  className="w-40 h-40 shrink-0 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
                  initial={{ rotateY: 180 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <img src={profileImgUrl} alt="Sakibul Islam Sabbir" className="w-full h-full object-cover" />
                </motion.div>
                
                <div>
                  <h3 className="text-4xl font-black mb-2 tracking-tight">SAKIBUL ISLAM SABBIR</h3>
                  <Badge className="bg-[#e74c3c]/20 text-[#e74c3c] hover:bg-[#e74c3c]/30 border-none mb-6 px-4 py-1.5 text-sm tracking-wider">
                    LEAD DEVELOPER & ARCHITECT
                  </Badge>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Visionary software engineer with a passion for creating seamless, intuitive, and high-performance web applications. Architect of the RC HUB ecosystem, blending cutting-edge technology with beautiful design.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
                    {['React', 'TypeScript', 'Node.js', 'Firebase', 'Tailwind CSS'].map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center md:justify-start">
                    <a href="https://www.facebook.com/sakibulislamrc1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 hover:scale-110">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/sakibulislamsbmc/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300 hover:scale-110">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://bismahsoftbd.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#e74c3c] hover:border-[#e74c3c] transition-all duration-300 hover:scale-110">
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname;

  // Form states
  const [newConfession, setNewConfession] = useState('');
  const [isSubmittingConfession, setIsSubmittingConfession] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsAdmin(user?.email === 'sakibulislamsbmc@gmail.com');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubNotices = onSnapshot(query(collection(db, 'notices'), orderBy('date', 'desc')), (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice)));
    });
    const unsubNews = onSnapshot(query(collection(db, 'news'), orderBy('date', 'desc')), (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as News)));
    });
    const unsubConfessions = onSnapshot(query(collection(db, 'confessions'), orderBy('date', 'desc')), (snapshot) => {
      setConfessions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Confession)));
    });
    const unsubLostItems = onSnapshot(query(collection(db, 'lostAndFound'), orderBy('date', 'desc')), (snapshot) => {
      setLostItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LostItem)));
    });

    return () => { unsubNotices(); unsubNews(); unsubConfessions(); unsubLostItems(); };
  }, []);

  const formatDate = (date: any) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return format(d, 'MMM dd, yyyy');
  };

  const handleAddConfession = async () => {
    if (!newConfession.trim()) return;
    setIsSubmittingConfession(true);
    try {
      await addDoc(collection(db, 'confessions'), {
        content: newConfession,
        date: serverTimestamp(),
        likes: 0
      });
      setNewConfession('');
    } catch (error) {
      console.error("Error adding confession: ", error);
    } finally {
      setIsSubmittingConfession(false);
    }
  };

  const handleLikeConfession = async (id: string) => {
    try {
      await updateDoc(doc(db, 'confessions', id), { likes: increment(1) });
    } catch (error) {
      console.error("Error liking confession: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip pb-16 md:pb-0">
      
      {/* Top Announcement Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 flex justify-center items-center relative text-sm font-medium">
        <span>সবাইকে RC HUB টিমে যুক্ত হতে স্বাগতম!</span>
        <button className="absolute right-4 hover:bg-white/20 rounded-full p-1 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white font-bold p-2 rounded-md flex items-center justify-center">
              RC
            </div>
            <span className="font-bold text-xl tracking-tight">RC HUB</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" className={`transition-colors ${activeTab === '/' ? 'text-primary font-bold' : 'hover:text-primary'}`}>হোম</Link>
            <Link to="/notices" className={`transition-colors ${activeTab === '/notices' ? 'text-primary font-bold' : 'hover:text-primary'}`}>নোটিশ</Link>
            <Link to="/routine" className={`transition-colors ${activeTab === '/routine' ? 'text-primary font-bold' : 'hover:text-primary'}`}>রুটিন</Link>
            <Link to="/department" className={`transition-colors ${activeTab === '/department' ? 'text-primary font-bold' : 'hover:text-primary'}`}>ডিপার্টমেন্ট</Link>
            <Link to="/teachers" className={`transition-colors ${activeTab === '/teachers' ? 'text-primary font-bold' : 'hover:text-primary'}`}>শিক্ষক</Link>
            <Link to="/bus-route" className={`transition-colors ${activeTab === '/bus-route' ? 'text-primary font-bold' : 'hover:text-primary'}`}>বাস রুট</Link>
            <Link to="/blood-donation" className={`transition-colors ${activeTab === '/blood-donation' ? 'text-primary font-bold' : 'hover:text-primary'}`}>রক্তদান</Link>
            
            {/* Dropdown for "আরও" */}
            <div className="relative group">
              <button className="hover:text-primary transition-colors flex items-center gap-1 py-2">
                আরও <ChevronRight className="h-3 w-3 rotate-90" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link to="/cgpa-calculator" className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary">CGPA ক্যালকুলেটর</Link>
                  {/* Add more dropdown items here in the future */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={user.photoURL} />
                  <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="destructive" size="sm" onClick={logOut} className="hidden sm:flex">লগআউট</Button>
              </div>
            ) : (
              <Button onClick={signIn} className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 gap-2">
                <LogIn className="h-4 w-4" /> লগইন
              </Button>
            )}
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Ticker */}
      <div className="bg-card border-b border-border py-2 flex items-center overflow-hidden">
        <div className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-r-full z-10 shrink-0 flex items-center gap-2">
          <Megaphone className="h-3 w-3" /> সর্বশেষ
        </div>
        <div className="flex-1 overflow-hidden relative h-6">
          <div className="absolute whitespace-nowrap animate-marquee text-sm font-medium text-muted-foreground flex items-center h-full">
            <span className="mx-4">• April 14, 2026 বর্ষবরণ আয়োজনে বাংলা নববর্ষ ১৪৩৩ উদযাপন করল রাজশাহী কলেজ</span>
            <span className="mx-4">• April 09, 2026 রাজশাহী কলেজে নবীন শিক্ষার্থীদের সম্মাননা প্রদান</span>
            <span className="mx-4">• April 07, 2026 রাজশাহী কলেজে Quality Assurance Committee (QAC) সভা অনুষ্ঠিত</span>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            >
              <GraduationCap className="h-4 w-4" /> রাজশাহী কলেজ • রাজশাহী
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight leading-tight flex flex-col items-center justify-center gap-4 min-h-[140px] md:min-h-[180px]">
              <div className="flex flex-wrap justify-center">
                <TypewriterText text="রাজশাহী কলেজের সবকিছু," delay={300} />
              </div>
              <motion.span 
                initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 2.2 }}
                className="text-primary inline-block"
              >
                এক জায়গায়!
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 0.8 }}
              className="text-xl text-muted-foreground font-medium"
            >
              Rajshahi College established in 1873
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 text-lg h-14 shadow-lg shadow-primary/25">
                  শুরু করুন <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-primary text-primary hover:bg-primary/5 bg-transparent">
                  <HelpCircle className="mr-2 h-5 w-5" /> হেল্প ডেস্ক
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.0, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12"
            >
              <motion.div whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }} className="bg-card border border-border rounded-[2rem] p-8 shadow-sm flex flex-col items-center justify-center gap-4 transition-all duration-300">
                <div className="bg-blue-500/10 p-5 rounded-2xl text-blue-500 mb-2">
                  <Bell className="h-10 w-10" />
                </div>
                <div className="text-5xl font-extrabold text-foreground tracking-tight">
                  <AnimatedNumber value={900} />+
                </div>
                <div className="text-lg font-semibold text-muted-foreground">নোটিশ</div>
              </motion.div>
              
              <motion.div whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }} className="bg-card border border-border rounded-[2rem] p-8 shadow-sm flex flex-col items-center justify-center gap-4 transition-all duration-300">
                <div className="bg-emerald-500/10 p-5 rounded-2xl text-emerald-500 mb-2">
                  <User className="h-10 w-10" />
                </div>
                <div className="text-5xl font-extrabold text-foreground tracking-tight">
                  <AnimatedNumber value={500} />+
                </div>
                <div className="text-lg font-semibold text-muted-foreground">শিক্ষক</div>
              </motion.div>
              
              <motion.div whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }} className="bg-card border border-border rounded-[2rem] p-8 shadow-sm flex flex-col items-center justify-center gap-4 transition-all duration-300">
                <div className="bg-orange-500/10 p-5 rounded-2xl text-orange-500 mb-2">
                  <Users className="h-10 w-10" />
                </div>
                <div className="text-5xl font-extrabold text-foreground tracking-tight">
                  <AnimatedNumber value={10000} />+
                </div>
                <div className="text-lg font-semibold text-muted-foreground">শিক্ষার্থী</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="container mx-auto px-4 py-12 space-y-24">
        
        {/* Notices Section */}
        <section>
          <SectionHeader 
            icon={Bell} 
            title="সর্বশেষ নোটিশ" 
            subtitle="rc.edu.bd থেকে সরাসরি" 
            actionText="সব নোটিশ" 
          />
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x">
            {notices.map((notice, idx) => (
              <Card key={notice.id || idx} className="sleek-card min-w-[300px] max-w-[350px] shrink-0 snap-start flex flex-col">
                <Badge className="w-fit mb-4 bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 border-none">{notice.category || 'General'}</Badge>
                <h3 className="font-bold text-lg mb-2 line-clamp-3 flex-grow">{notice.title}</h3>
                <p className="text-sm text-muted-foreground mt-4">{formatDate(notice.date)}</p>
              </Card>
            ))}
            {notices.length === 0 && <p className="text-muted-foreground">No notices available.</p>}
          </div>
        </section>

        {/* News Section */}
        <section>
          <SectionHeader 
            icon={Newspaper} 
            title="ক্যাম্পাস সংবাদ" 
            subtitle="রাজশাহী কলেজের আপডেট" 
            actionText="সব সংবাদ" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, idx) => (
              <Card key={item.id || idx} className="sleek-card p-0 overflow-hidden flex flex-col group cursor-pointer">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={item.imageUrl || `https://picsum.photos/seed/${item.id || idx}/800/450`} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <Badge className="absolute bottom-4 left-4 bg-primary text-white border-none">ক্যাম্পাস</Badge>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-4 line-clamp-2 flex-grow group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1"><Info className="h-4 w-4"/> 0</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4"/> 0</span>
                  </div>
                </div>
              </Card>
            ))}
            {news.length === 0 && <p className="text-muted-foreground">No news available.</p>}
          </div>
        </section>

        {/* Confession Wall */}
        <section>
          <SectionHeader 
            icon={MessageSquare} 
            title="কনফেশন ওয়াল" 
            subtitle="বেনামে মনের কথা বলুন" 
            actionText="সব কনফেশন" 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="sleek-card bg-card flex flex-col md:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6"><AvatarFallback>A</AvatarFallback></Avatar>
                  <span>বেনামীয়</span>
                </div>
                <span className="text-xs text-muted-foreground">#001</span>
              </div>
              <p className="text-lg font-medium mb-6 flex-grow">Testing my application</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> ২৯/৪/২০২৬
              </div>
            </Card>
            <div className="md:col-span-2 flex items-center justify-center bg-card rounded-2xl border border-border shadow-sleek p-8">
              <div className="text-center max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">আপনার গল্প বলুন</h3>
                <Textarea 
                  placeholder="What's on your mind?" 
                  className="min-h-[100px] mb-4 bg-background border-border"
                  value={newConfession}
                  onChange={(e) => setNewConfession(e.target.value)}
                />
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 w-full"
                  onClick={handleAddConfession} 
                  disabled={isSubmittingConfession || !newConfession.trim()}
                >
                  {isSubmittingConfession ? 'Posting...' : 'আপনার গল্প বলুন'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Class Routine */}
        <section>
          <SectionHeader 
            icon={Calendar} 
            title="ক্লাস রুটিন" 
            subtitle="আজকের ক্লাস দেখুন" 
          />
          <Card className="sleek-card text-center py-12">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['Computer Science and Engineering', 'Business Administration', 'Electrical and Electronic Engineering', 'English', 'Pharmacy'].map(dept => (
                <Badge key={dept} variant="outline" className="px-4 py-2 text-sm font-normal border-primary/20 text-foreground hover:bg-primary/5 cursor-pointer">
                  {dept}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground mb-6">আপনার Department select করে অথবা সার্চ করে auto দেখুন</p>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
              <Calendar className="mr-2 h-4 w-4" /> পুরো রুটিন দেখুন <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </section>

        {/* Teachers */}
        <section>
          <SectionHeader 
            icon={Users} 
            title="শিক্ষক তথ্য" 
            subtitle="Department-wise faculty directory" 
            actionText="সব শিক্ষক" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEACHERS.map(teacher => (
              <Card key={teacher.id} className="sleek-card text-center flex flex-col items-center pt-8">
                <Avatar className="h-24 w-24 mb-4 border-4 border-background shadow-md">
                  <AvatarImage src={teacher.img} />
                  <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg mb-1">{teacher.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{teacher.role}</p>
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none mt-auto">
                  {teacher.dept}
                </Badge>
              </Card>
            ))}
          </div>
        </section>

        {/* Blood Donation */}
        <section>
          <Card className="sleek-card bg-card border-none shadow-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full text-primary">
                  <Droplets className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">রক্তদান তথ্য</h3>
                  <p className="text-muted-foreground">1+ জন donor সক্রিয় আছেন</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <Badge key={bg} variant="outline" className="w-10 h-10 flex items-center justify-center rounded-full border-primary/30 text-primary font-bold hover:bg-primary hover:text-white cursor-pointer transition-colors">
                    {bg}
                  </Badge>
                ))}
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-lg shrink-0">
                Donor হোন
              </Button>
            </div>
          </Card>
        </section>

        {/* Clubs */}
        <section>
          <SectionHeader 
            icon={Award} 
            title="ক্লাব সমূহ" 
            actionText="সব ক্লাব" 
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CLUBS.map(club => (
              <Card key={club.id} className="sleek-card text-center py-8 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="text-4xl mb-4">{club.icon}</div>
                <h4 className="font-medium text-sm">{club.name}</h4>
              </Card>
            ))}
          </div>
        </section>

        {/* Split Section: Help Desk & Canteen/Calendar */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader icon={HelpCircle} title="হেল্প ডেস্ক" subtitle="সাধারণ প্রশ্ন ও সাহায্য" />
            <div className="space-y-4">
              {['Student ID card কীভাবে পাবো?', 'Tuition fee কীভাবে পরিশোধ করবো?', 'বৃত্তির জন্য আবেদন কীভাবে করবো?', 'Result কোথায় পাবো?'].map((q, i) => (
                <Card key={i} className="p-4 flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors bg-card rounded-xl shadow-sm border border-border">
                  <span className="font-medium flex items-center gap-2"><span className="text-primary font-bold">?</span> {q}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Card>
              ))}
              <Button variant="link" className="text-primary px-0 font-bold">টিকিট করুন <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
          <div className="space-y-12">
            <div>
              <SectionHeader icon={Droplets} title="ক্যান্টিন মেন্যু" actionText="সব দেখুন" />
              <Card className="sleek-card bg-card h-32 flex items-center justify-center text-muted-foreground">
                মেন্যু আপডেট করা হচ্ছে...
              </Card>
            </div>
            <div>
              <SectionHeader icon={Calendar} title="একাডেমিক ক্যালেন্ডার" actionText="সব দেখুন" />
              <Card className="sleek-card bg-card h-32 flex items-center justify-center text-muted-foreground">
                ক্যালেন্ডার আপডেট করা হচ্ছে...
              </Card>
            </div>
          </div>
        </section>

        {/* Lost and Found */}
        <section>
          <SectionHeader 
            icon={Search} 
            title="হারিয়েছেন/পেয়েছেন?" 
            subtitle="হারানো ও পাওয়া জিনিসের তালিকা" 
            actionText="সব দেখুন" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostItems.map(item => (
              <Card key={item.id} className="sleek-card p-0 overflow-hidden flex flex-col group cursor-pointer">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${item.id}/800/450`} 
                    alt={item.item}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <Badge className={`absolute bottom-4 left-4 text-white border-none ${item.type === 'Lost' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {item.type === 'Lost' ? 'হারানো' : 'পাওয়া'}
                  </Badge>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2">{item.item}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <Phone className="h-3 w-3" /> {item.contact}
                  </div>
                </div>
              </Card>
            ))}
            {lostItems.length === 0 && (
              <Card className="sleek-card p-0 overflow-hidden flex flex-col group cursor-pointer col-span-1">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/lost1/800/450" 
                    alt="Sample"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <Badge className="absolute bottom-4 left-4 bg-red-500 text-white border-none">হারানো</Badge>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2">Sample Item</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">This is a sample lost item.</p>
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* Explore Services */}
        <section>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 px-4 py-1 rounded-full uppercase tracking-widest text-xs">Explore</Badge>
            <h2 className="text-3xl font-bold mb-2">আরও সেবাসমূহ</h2>
            <p className="text-muted-foreground">আপনার পকেটে ক্যাম্পাসের সকল সেবা</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {SERVICES.map(service => (
              <Card key={service.id} className="sleek-card text-center py-6 hover:-translate-y-1 transition-transform cursor-pointer flex flex-col items-center justify-center gap-3">
                <div className="bg-secondary p-3 rounded-2xl">
                  {service.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{service.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{service.sub}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </main>

      {/* Stats Banner */}
      <section className="bg-gradient-to-r from-[#c0392b] to-[#e74c3c] text-white py-20 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl transition-transform hover:-translate-y-1">
              <div className="text-4xl mb-4">📣</div>
              <div className="text-4xl font-bold mb-2"><AnimatedNumber value={900} />+</div>
              <div className="text-sm font-medium opacity-90">নোটিস সংরক্ষিত</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl transition-transform hover:-translate-y-1">
              <div className="text-4xl mb-4">👩‍🏫</div>
              <div className="text-4xl font-bold mb-2"><AnimatedNumber value={500} />+</div>
              <div className="text-sm font-medium opacity-90">শিক্ষকের তথ্য</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl transition-transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🏆</div>
              <div className="text-4xl font-bold mb-2"><AnimatedNumber value={20} />+</div>
              <div className="text-sm font-medium opacity-90">সক্রিয় ক্লাব</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl transition-transform hover:-translate-y-1">
              <div className="text-4xl mb-4">👥</div>
              <div className="text-4xl font-bold mb-2"><AnimatedNumber value={10000} />+</div>
              <div className="text-sm font-medium opacity-90">নিবন্ধিত শিক্ষার্থী</div>
            </div>

          </div>
        </div>
      </section>

      {/* Minds Behind */}
      <section className="py-24 bg-[#111111] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-4 inline-block border border-[#e74c3c]/20 rounded-full px-4 py-1 text-xs font-bold tracking-widest text-[#e74c3c] uppercase">Engineering Excellence</div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white">
            THE <span className="text-[#e74c3c] drop-shadow-[0_0_25px_rgba(231,76,60,0.6)]">MINDS</span> BEHIND
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16">
            Meet the architects of the RC HUB ecosystem. We combine visionary design with hardened engineering to build the future of campus life.
          </p>
          <div className="flex justify-center">
            <DeveloperCard />
          </div>
        </div>
      </section>
          </>
        } />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/department" element={<Department />} />
        <Route path="/department/:id" element={<DepartmentDetails />} />
        <Route path="/subject/:id" element={<SubjectDetails />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/bus-route" element={<BusRoute />} />
        <Route path="/blood-donation" element={<BloodDonation />} />
        <Route path="/cgpa-calculator" element={<CgpaCalculator />} />
        <Route path="/confession" element={<Confession />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 text-white font-bold p-2 rounded-md flex items-center justify-center">
                  RC
                </div>
                <span className="font-bold text-xl text-white tracking-tight">RC HUB</span>
              </div>
              <p className="text-sm text-gray-400">Where Leaders are Created.</p>
              <div className="flex gap-2">
                {['FB', 'YT', 'LN', 'GH', 'TG'].map(social => (
                  <div key={social} className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-xs hover:bg-primary hover:border-primary hover:text-white cursor-pointer transition-colors">
                    {social}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">দ্রুত লিংক</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-primary cursor-pointer transition-colors">নোটিশ</li>
                <li className="hover:text-primary cursor-pointer transition-colors">রুটিন</li>
                <li className="hover:text-primary cursor-pointer transition-colors">শিক্ষক</li>
                <li className="hover:text-primary cursor-pointer transition-colors">কনফেশন</li>
                <li className="hover:text-primary cursor-pointer transition-colors">রক্তদান</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">সেবাসমূহ</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-primary cursor-pointer transition-colors">ক্যান্টিন</li>
                <li className="hover:text-primary cursor-pointer transition-colors">ক্যালেন্ডার</li>
                <li className="hover:text-primary cursor-pointer transition-colors">ক্লাবসমূহ</li>
                <li className="hover:text-primary cursor-pointer transition-colors">হারানো-পাওয়া</li>
                <li className="hover:text-primary cursor-pointer transition-colors">CGPA</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">যোগাযোগ ও মতামত</h4>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-sm italic mb-4 text-gray-400">"আপনার যেকোনো পরামর্শ বা সমস্যার কথা আমাদের লেট-বক্সে টিকেট ওপেন করুন।"</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full">
                  প্রশ্ন করুন <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="bg-gray-800 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} RC HUB TEAM. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-1">
              MADE WITH <Heart className="h-3 w-3 text-primary fill-current mx-1" /> FOR RC STUDENTS
            </div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
              <span className="hover:text-white cursor-pointer">TERMS OF SERVICE</span>
              <span className="hover:text-white cursor-pointer">SITEMAP</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/5 z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {[
            { id: '/', label: 'হোম', icon: Home },
            { id: '/notices', label: 'নোটিস', icon: Bell },
            { id: '/routine', label: 'রুটিন', icon: Calendar },
            { id: '/confession', label: 'কনফেশন', icon: MessageSquare },
            { id: '/profile', label: 'প্রোফাইল', icon: User },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                to={item.id}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-[#e74c3c]' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-[#e74c3c]/20' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
