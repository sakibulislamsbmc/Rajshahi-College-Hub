import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Megaphone, User, Phone, Mail, BookOpen, Calendar, Users, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

// --- Data ---
const degreeTeachers = [
  { sl: "01.", name: "Md. Alauddin (008822)", designation: "Professor", batch: "18", merit: "15", phone: "01717290288" },
  { sl: "02.", name: "Md. Mahafuz Hasan (009059) Professor", designation: "Associate Professor", batch: "18", merit: "37", phone: "01716731968" },
  { sl: "03.", name: "Md. Abdul Hadi (012126) Professor", designation: "Associate Professor", batch: "", merit: "", phone: "01716200042" },
  { sl: "04.", name: "Md. Abdul Malek (014449)", designation: "Associate Professor", batch: "24", merit: "64", phone: "01540065400" },
  { sl: "05.", name: "Prodip Kumar Mohontto (013917)", designation: "Associate Professor (Attachment)", batch: "24", merit: "89", phone: "01716961489" },
  { sl: "06.", name: "Md. Atiquzzaman (014179) (Associate Professor)", designation: "Assistant Professor", batch: "24", merit: "92", phone: "01740925688" },
  { sl: "07.", name: "Mostafa Nasirul Azam (14525) (Associate Professor)", designation: "Assistant Professor", batch: "24", merit: "135", phone: "01717672747" },
  { sl: "08.", name: "Md. Abdul Momin (15884) (Associate Professor)", designation: "Assistant Professor", batch: "26", merit: "22", phone: "01718824412" },
  { sl: "09.", name: "Md. Barik Mridha (23031)", designation: "Assistant Professor", batch: "30", merit: "17", phone: "01712789817" },
  { sl: "10.", name: "Jesmine Ferdaus (25905)", designation: "Lecturer", batch: "", merit: "", phone: "01715122814" },
  { sl: "11.", name: "Mst. jannati Akhtar (25925) (Assistant Professor)", designation: "Lecturer", batch: "", merit: "", phone: "01723760101" },
  { sl: "12.", name: "Dipak Sarkar (17135128031) (Assistant Professor)", designation: "Lecturer", batch: "35", merit: "31", phone: "01748056600" },
  { sl: "13.", name: "Md. Ateque Ali (21138128019)", designation: "Lecturer", batch: "44", merit: "19", phone: "01723308209" },
  { sl: "14.", name: "", designation: "Demonstrator", batch: "", merit: "", phone: "" },
  { sl: "15.", name: "", designation: "Demonstrator", batch: "", merit: "", phone: "" },
];

const departmentData: Record<string, any> = {
  degree: {
    name: "DEGREE",
    established: "1873",
    description: "The Degree (Pass) course at Rajshahi College offers a comprehensive foundational education across various disciplines. It is designed to equip students with broad knowledge and critical thinking skills essential for higher studies and professional careers.",
    courses: ['B.A. (Pass)', 'B.S.S. (Pass)', 'B.Sc. (Pass)', 'B.B.S. (Pass)'],
    head: {
      name: "Prof. Dr. Example Name",
      designation: "Head of the Department",
      image: "https://picsum.photos/seed/head/200/200"
    },
    teachers: degreeTeachers,
    notices: [
      "Degree 1st Year Form Fill-up Notice 2026",
      "In-course Examination Schedule for Degree 2nd Year",
    ]
  },
  // Placeholders for other departments
  arts: { name: "ARTS", established: "1873", description: "Arts faculty information.", courses: ['Bengali', 'English', 'History'], head: { name: "Prof. Arts Head", designation: "Head", image: "https://picsum.photos/seed/arts/200/200" }, teachers: [], notices: [] },
  science: { name: "SCIENCE", established: "1873", description: "Science faculty information.", courses: ['Physics', 'Chemistry', 'Mathematics'], head: { name: "Prof. Science Head", designation: "Head", image: "https://picsum.photos/seed/science/200/200" }, teachers: [], notices: [] },
  'social-science': { name: "SOCIAL SCIENCE", established: "1873", description: "Social Science faculty information.", courses: ['Economics', 'Political Science'], head: { name: "Prof. Social Head", designation: "Head", image: "https://picsum.photos/seed/social/200/200" }, teachers: [], notices: [] },
  'business-studies': { name: "BUSINESS STUDIES", established: "1873", description: "Business Studies faculty information.", courses: ['Accounting', 'Management'], head: { name: "Prof. Business Head", designation: "Head", image: "https://picsum.photos/seed/business/200/200" }, teachers: [], notices: [] },
};

export default function DepartmentDetails() {
  const { id } = useParams<{ id: string }>();
  const data = id ? departmentData[id] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Department not found</h1>
        <Link to="/department" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Departments
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Notice Bar */}
      {data.notices.length > 0 && (
        <div className="bg-[#b91c1c] text-white py-2 flex items-center overflow-hidden">
          <div className="px-4 font-bold text-sm z-10 shrink-0 flex items-center gap-2 bg-[#b91c1c]">
            <Megaphone className="h-4 w-4" /> Department Notice
          </div>
          <div className="flex-1 overflow-hidden relative h-6">
            <div className="absolute whitespace-nowrap animate-marquee text-sm flex items-center h-full">
              {data.notices.map((notice: string, idx: number) => (
                <span key={idx} className="mx-8">• {notice}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link to="/department" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#c0392b] to-[#900C3F] p-4 rounded-2xl text-white shadow-lg">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">{data.name}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Info & Courses */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <section className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#b91c1c]" /> About the Department
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {data.description}
              </p>
              <div className="flex items-center gap-3 text-sm font-medium bg-accent/50 p-4 rounded-xl w-fit border border-border">
                <Calendar className="h-5 w-5 text-[#b91c1c]" />
                <span>Established in: <span className="font-bold text-foreground">{data.established}</span></span>
              </div>
            </section>

            {/* Courses Section */}
            <section className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-[#b91c1c]" /> Courses Offered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.courses.map((course: any, idx: number) => {
                  const courseName = typeof course === 'string' ? course : course.name;
                  const courseSlug = typeof course === 'string' ? course.toLowerCase().replace(/[^a-z0-9]+/g, '-') : course.slug;
                  
                  return (
                    <Link 
                      key={idx} 
                      to={`/subject/${courseSlug}`}
                      className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-[#b91c1c]/50 hover:shadow-md transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#b91c1c] group-hover:scale-150 transition-transform"></div>
                      <span className="font-semibold group-hover:text-[#b91c1c] transition-colors">{courseName}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: Head of Department */}
          <div className="space-y-8">
            <section className="bg-card border border-border rounded-3xl p-8 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#c0392b]/10 to-transparent"></div>
              <h2 className="text-xl font-bold mb-6 relative z-10">Head of Department</h2>
              
              <div className="relative w-32 h-32 mx-auto mb-4 z-10">
                <img 
                  src={data.head.image} 
                  alt={data.head.name} 
                  className="w-full h-full object-cover rounded-full border-4 border-background shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 right-0 bg-[#b91c1c] text-white p-2 rounded-full border-2 border-background">
                  <User className="h-4 w-4" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground relative z-10">{data.head.name}</h3>
              <p className="text-muted-foreground text-sm font-medium mb-6 relative z-10">{data.head.designation}</p>
              
              <div className="flex justify-center gap-3 relative z-10">
                <button className="bg-accent hover:bg-accent/80 p-3 rounded-full transition-colors text-foreground">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="bg-accent hover:bg-accent/80 p-3 rounded-full transition-colors text-foreground">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Teachers List Section */}
        <section className="mt-12 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          <div className="p-8 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-[#b91c1c]" /> Department Teachers List
              </h2>
              <p className="text-muted-foreground mt-1">Total Teachers: {data.teachers.length}</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-accent/50 text-muted-foreground text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-border">SL</th>
                  <th className="p-4 font-semibold border-b border-border">Teachers' Name</th>
                  <th className="p-4 font-semibold border-b border-border">Designation</th>
                  <th className="p-4 font-semibold border-b border-border">Batch</th>
                  <th className="p-4 font-semibold border-b border-border">Merit</th>
                  <th className="p-4 font-semibold border-b border-border">Phone / Joining</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.teachers.map((teacher: any, idx: number) => (
                  <tr key={idx} className="hover:bg-accent/30 transition-colors">
                    <td className="p-4 text-muted-foreground font-medium">{teacher.sl}</td>
                    <td className="p-4 font-semibold text-foreground">{teacher.name || "—"}</td>
                    <td className="p-4 text-muted-foreground">{teacher.designation || "—"}</td>
                    <td className="p-4 text-muted-foreground">{teacher.batch || "—"}</td>
                    <td className="p-4 text-muted-foreground">{teacher.merit || "—"}</td>
                    <td className="p-4 font-mono text-sm">
                    {teacher.phone ? (
                      <a href={`tel:${teacher.phone}`} className="text-primary hover:underline inline-flex items-center gap-1.5">
                        <Phone className="h-3 w-3" /> {teacher.phone}
                      </a>
                    ) : "—"}
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {data.teachers.length > 0 && (
            <div className="p-4 border-t border-border text-center bg-accent/10">
              <button className="text-[#b91c1c] font-semibold hover:underline text-sm">View All</button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
