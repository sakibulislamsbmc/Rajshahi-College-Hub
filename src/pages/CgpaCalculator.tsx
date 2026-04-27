import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Plus, Trash2, RefreshCw, Save, Info, BookOpen, GraduationCap } from 'lucide-react';

// National University Grading Scale
const GRADING_SCALE = [
  { grade: 'A+', marks: '≥ 80%', point: 4.00, color: 'text-green-500', bg: 'bg-green-500/10' },
  { grade: 'A', marks: '≥ 75%', point: 3.75, color: 'text-green-400', bg: 'bg-green-400/10' },
  { grade: 'A-', marks: '≥ 70%', point: 3.50, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { grade: 'B+', marks: '≥ 65%', point: 3.25, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { grade: 'B', marks: '≥ 60%', point: 3.00, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { grade: 'B-', marks: '≥ 55%', point: 2.75, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { grade: 'C+', marks: '≥ 50%', point: 2.50, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { grade: 'C', marks: '≥ 45%', point: 2.25, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { grade: 'D', marks: '≥ 40%', point: 2.00, color: 'text-red-400', bg: 'bg-red-400/10' },
  { grade: 'F', marks: '≥ 0%', point: 0.00, color: 'text-red-500', bg: 'bg-red-500/10' },
];

interface Course {
  id: string;
  name: string;
  department: string;
  year: string;
  point: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

export default function CgpaCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 'sem-1', name: 'SEMESTER 1', courses: [] }
  ]);
  const [activeSemesterId, setActiveSemesterId] = useState('sem-1');
  const [courseName, setCourseName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [point, setPoint] = useState('');

  const activeSemester = semesters.find(s => s.id === activeSemesterId) || semesters[0];

  const addSemester = () => {
    const newId = `sem-${semesters.length + 1}`;
    setSemesters([...semesters, { id: newId, name: `SEMESTER ${semesters.length + 1}`, courses: [] }]);
    setActiveSemesterId(newId);
  };

  const addCourse = () => {
    if (!department || !year || !point) return;
    
    const newCourse: Course = {
      id: Date.now().toString(),
      name: courseName || `Course ${activeSemester.courses.length + 1}`,
      department,
      year,
      point: parseFloat(point)
    };

    setSemesters(semesters.map(sem => 
      sem.id === activeSemesterId 
        ? { ...sem, courses: [...sem.courses, newCourse] }
        : sem
    ));

    setCourseName('');
    setDepartment('');
    setYear('');
    setPoint('');
  };

  const deleteCourse = (semesterId: string, courseId: string) => {
    setSemesters(semesters.map(sem => 
      sem.id === semesterId 
        ? { ...sem, courses: sem.courses.filter(c => c.id !== courseId) }
        : sem
    ));
  };

  const resetAll = () => {
    if (confirm('Are you sure you want to reset all data?')) {
      setSemesters([{ id: 'sem-1', name: 'SEMESTER 1', courses: [] }]);
      setActiveSemesterId('sem-1');
    }
  };

  // Calculations
  const { totalEntries, totalPoints, cgpa, percentage } = useMemo(() => {
    let tEntries = 0;
    let tPoints = 0;

    semesters.forEach(sem => {
      sem.courses.forEach(course => {
        tEntries += 1;
        tPoints += course.point;
      });
    });

    const calculatedCgpa = tEntries > 0 ? (tPoints / tEntries) : 0;
    // NU Percentage approximation based on CGPA
    let calcPercentage = 0;
    if (calculatedCgpa >= 4.0) calcPercentage = 80;
    else if (calculatedCgpa >= 3.75) calcPercentage = 75 + ((calculatedCgpa - 3.75) / 0.25) * 5;
    else if (calculatedCgpa >= 3.50) calcPercentage = 70 + ((calculatedCgpa - 3.50) / 0.25) * 5;
    else if (calculatedCgpa >= 3.25) calcPercentage = 65 + ((calculatedCgpa - 3.25) / 0.25) * 5;
    else if (calculatedCgpa >= 3.00) calcPercentage = 60 + ((calculatedCgpa - 3.00) / 0.25) * 5;
    else if (calculatedCgpa >= 2.75) calcPercentage = 55 + ((calculatedCgpa - 2.75) / 0.25) * 5;
    else if (calculatedCgpa >= 2.50) calcPercentage = 50 + ((calculatedCgpa - 2.50) / 0.25) * 5;
    else if (calculatedCgpa >= 2.25) calcPercentage = 45 + ((calculatedCgpa - 2.25) / 0.25) * 5;
    else if (calculatedCgpa >= 2.00) calcPercentage = 40 + ((calculatedCgpa - 2.00) / 0.25) * 5;
    else calcPercentage = (calculatedCgpa / 2.0) * 40;

    return {
      totalEntries: tEntries,
      totalPoints: tPoints,
      cgpa: calculatedCgpa.toFixed(2),
      percentage: Math.min(100, Math.max(0, calcPercentage)).toFixed(1)
    };
  }, [semesters]);

  const getStatus = (cgpaVal: number) => {
    if (cgpaVal === 0) return { text: 'Needs Improve', color: 'text-red-500' };
    if (cgpaVal >= 3.75) return { text: 'Outstanding', color: 'text-green-500' };
    if (cgpaVal >= 3.50) return { text: 'Excellent', color: 'text-emerald-400' };
    if (cgpaVal >= 3.00) return { text: 'Very Good', color: 'text-blue-400' };
    if (cgpaVal >= 2.50) return { text: 'Good', color: 'text-orange-400' };
    return { text: 'Pass', color: 'text-yellow-500' };
  };

  const status = getStatus(parseFloat(cgpa));

  // Calculate semester GPA
  const activeSemesterGpa = useMemo(() => {
    let tEntries = 0;
    let tPts = 0;
    activeSemester.courses.forEach(c => {
      tEntries += 1;
      tPts += c.point;
    });
    return tEntries > 0 ? (tPts / tEntries).toFixed(2) : '0.00';
  }, [activeSemester]);

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-200 py-12 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="bg-[#c0392b] p-4 rounded-full mb-6 shadow-lg shadow-[#c0392b]/20">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">CGPA ক্যালকুলেটর</h1>
          <p className="text-slate-400 flex items-center gap-2 text-sm md:text-base">
            জাতীয় বিশ্ববিদ্যালয়ের স্ট্যান্ডার্ড গ্রেডিং সিস্টেম অনুযায়ী
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Calculator */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Semester Tabs */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {semesters.map(sem => (
                <button
                  key={sem.id}
                  onClick={() => setActiveSemesterId(sem.id)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                    activeSemesterId === sem.id 
                      ? 'bg-[#c0392b] text-white shadow-lg shadow-[#c0392b]/20' 
                      : 'bg-[#1a1f2e] text-slate-400 hover:bg-[#23293b] hover:text-slate-200'
                  }`}
                >
                  {sem.name}
                </button>
              ))}
              <button 
                onClick={addSemester}
                className="p-3 rounded-xl bg-[#1a1f2e] text-slate-400 hover:bg-[#23293b] hover:text-white transition-colors flex-shrink-0"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {/* Add Course Form */}
            <div className="bg-[#141824] border border-[#1f2537] rounded-3xl p-6 md:p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-[#c0392b]" /> কোর্স যোগ করুন
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">কোর্সের নাম</label>
                  <input 
                    type="text" 
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Physics"
                    className="w-full bg-[#1a1f2e] border border-[#2a3142] rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#c0392b] focus:ring-1 focus:ring-[#c0392b] transition-all"
                  />
                </div>
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ডিপার্টমেন্ট</label>
                  <select 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#1a1f2e] border border-[#2a3142] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#c0392b] focus:ring-1 focus:ring-[#c0392b] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>বাছাই করুন</option>
                    <option value="Science">Science</option>
                    <option value="Arts">Arts</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Business Studies">Business Studies</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Degree">Degree</option>
                  </select>
                </div>
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">বর্ষ (Year)</label>
                  <select 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#1a1f2e] border border-[#2a3142] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#c0392b] focus:ring-1 focus:ring-[#c0392b] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>বাছাই করুন</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">পয়েন্ট (Points)</label>
                  <input 
                    type="number" 
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                    min="0"
                    max="4"
                    step="0.01"
                    placeholder="e.g. 3.50"
                    className="w-full bg-[#1a1f2e] border border-[#2a3142] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#c0392b] focus:ring-1 focus:ring-[#c0392b] transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={addCourse}
                disabled={!department || !year || !point}
                className="w-full bg-[#c0392b] hover:bg-[#a93226] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#c0392b]/20"
              >
                <Plus className="h-5 w-5" /> ADD COURSE TO {activeSemester.name}
              </button>
            </div>

            {/* Course List */}
            <div className="bg-[#141824] border border-[#1f2537] rounded-3xl p-6 md:p-8 shadow-xl min-h-[300px] flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1f2537]">
                <h2 className="text-xl font-bold text-white">{activeSemester.name} - এর কোর্সসমূহ</h2>
                <div className="text-sm font-semibold text-[#c0392b]">GPA: {activeSemesterGpa}</div>
              </div>

              {activeSemester.courses.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4 py-12">
                  <BookOpen className="h-16 w-16 opacity-20" />
                  <p className="text-sm">এখনও কোনো কোর্স নেই। কোর্স যোগ করতে উপরের ফর্মটি ব্যবহার করুন।</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1f2537]">
                        <th className="pb-4 pl-2">Course Name</th>
                        <th className="pb-4">Department</th>
                        <th className="pb-4">Year</th>
                        <th className="pb-4">Points</th>
                        <th className="pb-4 text-right pr-2">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f2537]/50">
                      <AnimatePresence>
                        {activeSemester.courses.map((course) => (
                          <motion.tr 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            key={course.id} 
                            className="hover:bg-[#1a1f2e] transition-colors group"
                          >
                            <td className="py-4 pl-2 font-medium text-slate-200">{course.name}</td>
                            <td className="py-4 text-slate-400">{course.department}</td>
                            <td className="py-4 text-slate-400">{course.year}</td>
                            <td className="py-4 font-mono text-slate-300">{course.point.toFixed(2)}</td>
                            <td className="py-4 text-right pr-2">
                              <button 
                                onClick={() => deleteCourse(activeSemesterId, course.id)}
                                className="text-slate-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={resetAll}
                className="bg-transparent border border-[#2a3142] hover:bg-[#1a1f2e] text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className="h-4 w-4" /> RESET ALL
              </button>
              <button className="bg-[#1a1f2e] hover:bg-[#23293b] border border-[#2a3142] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Save className="h-4 w-4 text-blue-400" /> সেভ করুন (CLOUD)
              </button>
            </div>

          </div>

          {/* Right Column - Results & Scale */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Overall Result Card */}
            <div className="bg-[#141824] border border-[#1f2537] rounded-3xl p-8 shadow-xl relative overflow-hidden">
              {/* Decorative background glow */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#c0392b]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">সর্বমোট ফলাফল (Overall Result)</h3>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-7xl md:text-8xl font-extrabold text-[#c0392b] tracking-tighter">{cgpa}</span>
                <span className="text-2xl font-bold text-slate-500">/ 4.00</span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-3">
                    <span className="text-slate-400">অগ্রগতি</span>
                    <span className="text-slate-200">{percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#1a1f2e] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#c0392b] to-orange-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#1f2537]">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">মোট এন্ট্রি</div>
                    <div className="text-2xl font-bold text-white">{totalEntries}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">স্ট্যাটাস</div>
                    <div className={`text-xl font-bold ${status.color}`}>{status.text}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grading Scale */}
            <div className="bg-[#141824] border border-[#1f2537] rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Info className="h-5 w-5 text-[#c0392b]" /> NU গ্রেডিং স্কেল
              </h3>
              
              <div className="space-y-3">
                {GRADING_SCALE.map((item) => (
                  <div key={item.grade} className="flex items-center justify-between p-3 rounded-xl bg-[#1a1f2e] border border-[#1f2537] hover:border-[#2a3142] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${item.bg} ${item.color}`}>
                        {item.grade}
                      </div>
                      <span className="text-slate-300 font-medium text-sm">{item.marks}</span>
                    </div>
                    <span className="font-mono font-bold text-white">{item.point.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
