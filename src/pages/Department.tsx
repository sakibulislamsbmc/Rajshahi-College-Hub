import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, FlaskConical, Users, Briefcase } from 'lucide-react';

export default function Department() {
  const faculties = [
    { id: 'degree', name: 'DEGREE', icon: GraduationCap },
    { id: 'arts', name: 'ARTS', icon: BookOpen },
    { id: 'science', name: 'SCIENCE', icon: FlaskConical },
    { id: 'social-science', name: 'SOCIAL SCIENCE', icon: Users },
    { id: 'business-studies', name: 'BUSINESS STUDIES', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">ডিপার্টমেন্ট সমূহ</h1>
          <p className="text-muted-foreground">রাজশাহী কলেজের বিভিন্ন অনুষদ ও বিভাগসমূহ</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculties.map((faculty) => {
            const Icon = faculty.icon;

            return (
              <Link key={faculty.id} to={`/department/${faculty.id}`}>
                <motion.div 
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-48 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#c0392b] to-[#900C3F] text-white flex flex-col items-center justify-center p-6 relative group cursor-pointer"
                >
                  {/* Decorative background elements */}
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors"></div>
                  <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
                  
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-inner mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-10 w-10" />
                  </div>
                  <span className="text-xl font-bold tracking-wider text-center relative z-10">{faculty.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
