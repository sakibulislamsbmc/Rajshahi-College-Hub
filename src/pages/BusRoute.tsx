import { useState } from 'react';
import { motion } from 'motion/react';
import { Bus, MapPin, Calendar, Map, Zap, Info, Phone, ArrowRight, Circle } from 'lucide-react';

export default function BusRoute() {
  const [activeTab, setActiveTab] = useState('schedule');

  const scheduleData = [
    { 
      id: 1, 
      fromCollege: "সকাল ০৭:০০ টা", 
      fromRoute: "সকাল ০৭:৩০ টা", 
      routeName: "বানেশ্বর, বেলপুকুর, হরিয়ান, কাশিয়া ডাঙ্গা, নওহাটা" 
    },
    { 
      id: 2, 
      fromCollege: "সকাল ০৮:০০ টা", 
      fromRoute: "সকাল ০৮:৩০ টা", 
      routeName: "ঐ" 
    },
    { 
      id: 3, 
      fromCollege: "সকাল ০৯:০০ টা", 
      fromRoute: "সকাল ০৯:৩০ টা", 
      routeName: "ঐ" 
    },
    { 
      id: 4, 
      fromCollege: "দুপুর ০১:২০ টা", 
      fromRoute: "দুপুর ০১:৫০ টা", 
      routeName: "ঐ" 
    },
    { 
      id: 5, 
      fromCollege: "দুপুর ০২:২০ টা", 
      fromRoute: "দুপুর ০২:৫০ টা", 
      routeName: "ঐ" 
    },
    { 
      id: 6, 
      fromCollege: "বিকাল ০৩:২০ টা", 
      fromRoute: "বিকাল ০৩:৫০ টা", 
      routeName: "ঐ" 
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#b91c1c]/10 text-[#b91c1c] p-3 rounded-2xl">
                <Bus className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">বাসের সময়সূচী</h1>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground ml-2">
              <MapPin className="h-4 w-4 text-[#b91c1c]" />
              <span className="text-lg">রাজশাহী কলেজ — রাজশাহী</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="bg-card border border-border rounded-full px-5 py-3 flex flex-col items-start shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1">Status</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-foreground">সরাসরি আপডেট চলছে</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-card border border-border p-1.5 rounded-full w-fit shadow-sm">
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === 'schedule' 
                ? 'bg-[#b91c1c]/10 text-[#b91c1c]' 
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <Calendar className="h-4 w-4" /> সময়সূচী
          </button>
          <button 
            onClick={() => setActiveTab('routes')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === 'routes' 
                ? 'bg-[#b91c1c]/10 text-[#b91c1c]' 
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <Map className="h-4 w-4" /> রুট সমূহ
          </button>
          <button 
            onClick={() => setActiveTab('extra')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === 'extra' 
                ? 'bg-[#b91c1c]/10 text-[#b91c1c]' 
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <Zap className="h-4 w-4" /> এক্সট্রা
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Table & Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Table Card */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#b91c1c] text-white">
                      <th className="p-5 font-semibold text-center border-r border-white/10">
                        <div className="text-lg">কলেজ থেকে</div>
                        <div className="text-xs font-normal text-white/80 mt-1">(ছেড়ে যাবে)</div>
                      </th>
                      <th className="p-5 font-semibold text-center border-r border-white/10">
                        <div className="text-lg">বিভিন্ন রুট থেকে</div>
                        <div className="text-xs font-normal text-white/80 mt-1">(কলেজ অভিমুখে)</div>
                      </th>
                      <th className="p-5 font-semibold text-center">
                        <div className="text-lg">রুট নাম</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {scheduleData.map((row) => (
                      <tr key={row.id} className="hover:bg-accent/50 transition-colors">
                        <td className="p-5 border-r border-border text-center">
                          <div className="font-semibold text-[#b91c1c] text-lg whitespace-nowrap">{row.fromCollege}</div>
                        </td>
                        <td className="p-5 border-r border-border text-center">
                          <div className="font-semibold text-foreground text-lg whitespace-nowrap">{row.fromRoute}</div>
                        </td>
                        <td className="p-5 text-center">
                          <div className="text-sm text-muted-foreground font-medium">{row.routeName}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
              <div className="bg-blue-500/10 p-2 rounded-full shrink-0 mt-0.5">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                সময়সূচীটি কলেজ কর্তৃপক্ষের সাধারণ নির্দেশনানুযায়ী তৈরি। নিয়মিত শুক্রবার ও ছুটির দিন ব্যতীত অন্যান্য দিনগুলোতে বাস এই সময় অনুযায়ী চলাচল করে। পরিস্থিতি সাপেক্ষে সময়ের কিছুটা পরিবর্তন হতে পারে।
              </p>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="space-y-6">
            
            {/* Next Bus Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-[#c0392b] to-[#900C3F] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
            >
              {/* Decorative Elements */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 right-4 opacity-10">
                <Bus className="w-32 h-32 transform rotate-12" />
              </div>
              <div className="absolute top-1/2 left-8 w-12 h-20 border-2 border-white/20 rounded-full opacity-50"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">পরবর্তী বাস</span>
                </div>
                
                <h3 className="text-4xl font-bold leading-tight mb-8">
                  আজকের সব ট্রিপ<br/>শেষ
                </h3>
                
                <button className="bg-white/20 hover:bg-white/30 transition-colors p-3 rounded-full backdrop-blur-sm">
                  <ArrowRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </motion.div>

            {/* Helpline Section */}
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 ml-1">বাস হেল্পলাইন</h4>
              <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#b91c1c]/10 p-3 rounded-xl shrink-0">
                  <Bus className="h-6 w-6 text-[#b91c1c]" />
                </div>
                <div>
                  <h5 className="font-bold text-foreground">ট্রান্সপোর্ট ইনচার্জ</h5>
                  <p className="text-sm text-muted-foreground mt-0.5">—</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
