import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Megaphone, User, Phone, Mail, BookOpen, Calendar, Users, FlaskConical, Microscope } from 'lucide-react';

const physicsTeachers = [
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

const chemistryTeachers = [
  { sl: "81.", name: "Professor Md Jahangir Ali", designation: "Professor & Head", batch: "22", merit: "67", phone: "01716076395" },
  { sl: "95.", name: "Shabnam Sultana", designation: "Teacher", batch: "24", merit: "107", phone: "01715844670" },
  { sl: "97.", name: "Dr. Rezina Akhter Banu", designation: "Teacher", batch: "16", merit: "48", phone: "01911137641" },
  { sl: "100.", name: "Md. Mizanur Rahman", designation: "Teacher", batch: "27", merit: "20", phone: "01716099663" },
  { sl: "101.", name: "Md. Hossen Ali", designation: "Teacher", batch: "16", merit: "27", phone: "01716490633" },
  { sl: "102.", name: "Md. Shakilur Zaman Shakil", designation: "Teacher", batch: "", merit: "", phone: "01722307202" },
  { sl: "103.", name: "Md. Enamul Haque", designation: "Teacher", batch: "27", merit: "46", phone: "01716902288" },
  { sl: "104.", name: "Komol Krishna Chakraborty", designation: "Teacher", batch: "18", merit: "21", phone: "01712764527" },
  { sl: "105.", name: "Md. Ehsanul Haque", designation: "Teacher", batch: "27", merit: "27", phone: "01715324101" },
  { sl: "106.", name: "Most Lovely Khatun", designation: "Teacher", batch: "35", merit: "37", phone: "01771600577" },
  { sl: "107.", name: "Abu Zafor Md. Monirul Islam", designation: "Teacher", batch: "16", merit: "19", phone: "01712818364" },
  { sl: "108.", name: "Umama Monira", designation: "Teacher", batch: "34", merit: "21", phone: "01723995804" },
  { sl: "109.", name: "Md. Akhterul Islam", designation: "Teacher", batch: "14", merit: "61", phone: "01715002375" },
  { sl: "110.", name: "Md. Hasan Mahmud Siddique", designation: "Teacher", batch: "36", merit: "14", phone: "01741060482" },
  { sl: "111.", name: "Dr. Mahmud Hasan Tareque", designation: "Teacher", batch: "26", merit: "05", phone: "01750074203" },
  { sl: "112.", name: "Md. Shamim Raton", designation: "Teacher", batch: "36", merit: "64", phone: "01737918175" },
  { sl: "113.", name: "Md. Monirul Islam", designation: "Teacher", batch: "24", merit: "27", phone: "01715007489" },
  { sl: "114.", name: "Md. Kudrot-E-Khuda", designation: "Teacher", batch: "40", merit: "36", phone: "01717622266" },
  { sl: "115.", name: "Fauzia Tabassum", designation: "Teacher", batch: "36", merit: "28", phone: "01715950215" },
  { sl: "116.", name: "Md. Mahbuber Rahman", designation: "Teacher", batch: "27", merit: "54", phone: "01712661436" }
];

const mathTeachers = [
  { sl: "41.", name: "Md. Musharraf Husain", designation: "Teacher", batch: "", merit: "", phone: "01715319001" },
  { sl: "42.", name: "Md. Abdul Latif", designation: "Teacher", batch: "", merit: "", phone: "01792309088" },
  { sl: "46.", name: "Md. Shahidul Alam", designation: "Teacher", batch: "11", merit: "7", phone: "01758508489" },
  { sl: "47.", name: "Md. Amjad Hossain", designation: "Teacher", batch: "", merit: "", phone: "01718677512" },
  { sl: "49.", name: "Md. Kafilar Rahman", designation: "Teacher", batch: "14", merit: "11", phone: "01716386574" },
  { sl: "50.", name: "Md. Shafiq Uddin", designation: "Teacher", batch: "", merit: "", phone: "01552330198" },
  { sl: "58.", name: "S. M. A Hurayra", designation: "Teacher", batch: "", merit: "", phone: "01711359489" },
  { sl: "60.", name: "Dr. Ayesha Nazneen", designation: "Teacher", batch: "22", merit: "10", phone: "01716624202" },
  { sl: "63.", name: "Md. Asaduzzaman", designation: "Teacher", batch: "24", merit: "97", phone: "01718270081" },
  { sl: "65.", name: "Md.Jahangir Alam", designation: "Teacher", batch: "", merit: "", phone: "01732688605" },
  { sl: "66.", name: "Dr. Md. Sirazul Islam", designation: "Teacher", batch: "", merit: "", phone: "01190745820" },
  { sl: "68.", name: "Abu Sufian Md. Mostafa Zaman", designation: "Teacher", batch: "", merit: "", phone: "01717138885" },
  { sl: "69.", name: "Saika Horkil", designation: "Teacher", batch: "24", merit: "146", phone: "01717172302" },
  { sl: "71.", name: "Dr. Akhtara Banu", designation: "Teacher", batch: "10%", merit: "13", phone: "01716726133" },
  { sl: "72.", name: "Md. Nurul Islam", designation: "Teacher", batch: "", merit: "", phone: "01721755339" },
  { sl: "73.", name: "Mst. Lailatul Kadri", designation: "Teacher", batch: "27", merit: "11", phone: "01735675402" },
  { sl: "74.", name: "Shipra Sarker", designation: "Teacher", batch: "", merit: "", phone: "01727227742" },
  { sl: "75.", name: "Dr. Md. Sabur Uddin", designation: "Teacher", batch: "", merit: "", phone: "01720334347" },
  { sl: "76.", name: "Nadira Nazneen", designation: "Teacher", batch: "26", merit: "56", phone: "01724939888" },
  { sl: "77.", name: "Md. Mizanur Rahman", designation: "Teacher", batch: "24", merit: "101", phone: "01815572384" },
  { sl: "78.", name: "Dr. Md. Abdul Aziz", designation: "Teacher", batch: "22", merit: "29", phone: "01716408598" },
  { sl: "79.", name: "Md. Rafikul Islam", designation: "Teacher", batch: "", merit: "", phone: "01718720520" },
  { sl: "81.", name: "Md. Sharwar Jahan", designation: "Teacher", batch: "24", merit: "142", phone: "01725016097" },
  { sl: "81.", name: "Mst. Mafruha Mustari", designation: "Teacher", batch: "27", merit: "74", phone: "01725905474" },
  { sl: "82.", name: "Md. Serajul Islam", designation: "Teacher", batch: "Absorbed", merit: "", phone: "01913648545" },
  { sl: "83.", name: "Md. Yeakub Ali", designation: "Teacher", batch: "24", merit: "78", phone: "01711142679" },
  { sl: "84.", name: "Dr. Mst. Zamilla Khatun", designation: "Teacher", batch: "24", merit: "08", phone: "01712206723" },
  { sl: "85.", name: "Professor Md. Saiful Islam", designation: "Professor & Head", batch: "18", merit: "45", phone: "01712503007" },
  { sl: "86.", name: "Md. Abdus Salam", designation: "Teacher", batch: "29", merit: "17", phone: "01767418584" },
  { sl: "87.", name: "Md. Shahinur Alam", designation: "Teacher", batch: "27", merit: "05", phone: "01735618569" }
];

const subjectData: Record<string, any> = {
  physics: {
    name: "Department of Physics",
    faculty: "Science",
    established: "1878 (B.Sc. classes started)",
    description: [
      "Rajshahi College was established in 1873. The Department of Physics is on of the famous Department in this College. On 1st April of that year, 1st Year and 2nd Year F.A (First Arts) classes started with only 6 students, which continued up to 1908. In 1909, I.Sc. course started.",
      "After having permission in 1877, B.Sc. classes started in Rajshahi College in 1878. According to the sources available, Honours courses started in some of the departments even before 1887. Though Masters Course was initiated in 1893, the permission of running the course was withdrawn in 1909 However, later in 1993 under National University, Masters Course started again.",
      "Though the exact date of the inception of Physics Department at Rajshahi College is unknown, in the light of various available sources, it can be deduced that Physics as a subject was there since the foundation of the college. It is traced out that a student named Syed Abdus Salek achieved Honours degree with distinction from Physics and Chemistry (in those days these two subjects were one). According to available data, in 1912-13 session the number of students having Physics subject was 138; the number of Intermediate students was 86 B.A (Pass Course) students 41, and B.Sc (Pass Course & Honours Students 11. In that session number of teachers was 2 and demonstrators 2. In 1912-13 session Teachers of Physics were Babu Bala Charan Bhattacharya and the then Principal Kumudinikanta Banerjee Bahadur, who is considered the architech of Rajshahi College. He was a Professor of Physics. At his endeavor, the present Physics building was established. After 1930 many famous personalities worked as teachers in this department, of whom some notables are: H C Ganguly (1934), Moulavi Aftabuddin Ahmed, Dr. Abdullah Al-Muti Sarfuddin, Dr. Sadaruddin Ahmed Chowdhury, Dr. Mokbular Rahman. Sarkar."
    ],
    facilities: [
      { title: "Area & Buildings", desc: "Apart form the prestigious Physics building, classes are also conducted in some rooms on the ground floor of the 3rd Science Building." },
      { title: "Class Rooms & Labs", desc: "Gallery-02, Normal Class Room-02, Physics Laboratory-02, Seminar-01, Office Room-01, Store-01, Bathroom-03. One of the two galleries, one is used as the class room for the XI Science ‘A’ group students and the other is used as the class room for the students of third year hons." },
      { title: "Specialized Labs", desc: "On the 1st floor of the said building there are the Optical Lab and the Electricity & Electronics Lab which are being used for the 1st year honours and non-major students, and 2nd Year Degree Pass and 3rd Year students, The Lab on the ground floor of the 3rd Science Building is used as the Lab for the students of 4th Year Hons, Masters Part I and Masters Final Year The labs of this Department are quite rich." },
      { title: "Seminar Library", desc: "Apart from the Central Library, the Physics Department has its Seminar. In the Seminar there are many books on Physics which the students can either study or borrow. A teacher of the Department manages it. To know about in bengali please download the pdf." }
    ],
    head: {
      name: "Prof. Md. Alauddin",
      designation: "Head of the Department",
      image: "https://picsum.photos/seed/physicshead/200/200"
    },
    teachers: physicsTeachers,
    notices: [
      "Physics 1st Year Practical Exam Schedule Published",
      "Seminar Library Book Return Notice"
    ]
  },
  chemistry: {
    name: "Department of Chemistry",
    faculty: "Science",
    established: "1909 (Graduation started)",
    description: [
      "Chemistry, a branch of physical science, is the study of the composition, properties and change of matter. French Chemist, Antoni Lavoesie is the father of modern Chemistry. We have got some world famous Chemists who laid the foundation of Chemistry in our country and made the subject attractive. In this connection we remember with respect Dr. Kudrat-E-Khuda, Prof. Kazi Abdul Latif, Prof. Mokarram Hossain Khundoker, Prof. Ali Nawab, Prof. S. Z. Haider, Prof. Mofiz Uddin Ahmed, Dr. Fazlul Halim Chowdhary, Dr. Mesbahuddin Ahmed, Dr. Syed Safiullah, Prof. Abu Saleh, Prof. Zillur Rahim, Prof. Lutfor Rahman etc.",
      "The century old Rajshahi College founded in 1873 has been playing an active role in the development of educational, social and political culture of the people of this subcontinent. Chemistry Department is its pride. Chemistry is one of the important discipline of this institution where students are awaraded graduation since 1909 and post graduation degrees. Moreover, Chemistry is a compulsory subject for the students of science group in the higher secondary class.",
      "The People’s Republic of Bangladesh opened Honors courses in several subjects in this college in 1972. Chemistry is one of them. Master of Science in Chemistry is being awarded since 1993. National University affiliated the Graduation and Masters Program from the session 1992-1993.",
      "Now Chemistry department enrolls about 370 students under graduation and post graduation program every year. Students passing out from Chemistry department are working with reputation in many fields. Besides glorious academic attainments the members of the teaching staff and the students of this department regularly take part in co-curricular activities and they try to give a good account of themselves.",
      "At present 12 teachers, 4 MLSSS, 1 computer operator and 1 mechanic are serving this department with full enthusiasm. They all are sincere in their respective fields. The first Head to serve this department was Prof. Dr. Panchanone Niogi. M.A. On the other hand, the first Muslim teacher of this department, Mr. Md. Wahed Box served from 1944-1953. We always acknowledge their contribution. The existing departmental Head, Prof. Md. Akhterul Islam has been serving since 09.02.2021. He is our 34th Departmental Head. Under the dynamic leadership of the present Head, the department is marching towards glory.",
      "Let us all hope that the department of chemistry of Rajshahi College will continue to produce efficient and competent good citizens for our beloved country. We all serve for the betterment of our country."
    ],
    facilities: [
      { title: "Building & Classrooms", desc: "Chemistry Department is situated in a unique position in Rajshahi College campus. The three storied department building consists of four class rooms equipped with modern electronic equipments (including smartboard, audio-visual system supported by multimedia projector)." },
      { title: "Laboratories", desc: "One ICT lab, four Chemical Laborateries with sufficient number of scientific instruments, glassware and chemicals." },
      { title: "Power Backup", desc: "To avoid hazard of load shedding the department is equipped with heavy duty generator and Instant Power Supply (IPS)." },
      { title: "Seminar Library", desc: "Moreover, about three thousand books are available in Seminar Library of the department." },
      { title: "Other Amenities", desc: "We have a spacious and furnished teacher’s lounge with essential amenities. There is also a well furnished two guest room for guest teachers and external examiners." }
    ],
    head: {
      name: "Professor Md Jahangir Ali",
      designation: "Head of the Department",
      image: "https://picsum.photos/seed/chemistryhead/200/200"
    },
    teachers: chemistryTeachers,
    notices: [
      "Chemistry Practical Exam Notice",
      "Seminar Library Book Return Notice"
    ]
  },
  mathematics: {
    name: "Department of Mathematics",
    faculty: "Science",
    established: "1878",
    description: [
      "The department of Mathematics started its journey in 1878 short after establishment of the college with only two teachers. Honours and masters courses in Mathematics were introduced in 1881 and 1893 respectively.",
      "In the third decade of the 20th century, the number of teaching staff was four among which two posts for professors and two posts for lectures. This teaching staff pattern was unchanged until 1980. In 1981, the number of teaching staff became seven and twelve in 1997.",
      "The number of students was 40 in 1972 and at present it raises to 180. At present, nearly about 1500 students are studying in this department."
    ],
    facilities: [
      { title: "Classrooms", desc: "The department is running with three class rooms." },
      { title: "Laboratories", desc: "Two modern computer laboratories are available for students." },
      { title: "Seminar Library", desc: "There is one seminar cum library room containing 5000 books." },
      { title: "Other Rooms", desc: "The department also has one teacher's room and a dedicated room for the chairman." }
    ],
    head: {
      name: "Professor Md. Saiful Islam",
      designation: "Head of the Department",
      image: "https://picsum.photos/seed/mathhead/200/200"
    },
    teachers: mathTeachers,
    notices: [
      "Mathematics 1st Year In-course Exam Schedule",
      "Seminar Library Book Return Notice"
    ]
  }
};

export default function SubjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = id ? subjectData[id] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Subject not found</h1>
        <button onClick={() => navigate(-1)} className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Notice Bar */}
      {data.notices && data.notices.length > 0 && (
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
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Faculty
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#c0392b] to-[#900C3F] p-4 rounded-2xl text-white shadow-lg">
              <FlaskConical className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">{data.name}</h1>
              <p className="text-muted-foreground mt-2 text-lg">Faculty of {data.faculty}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Info & Facilities */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <section className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#b91c1c]" /> Department Overview
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
                {data.description.map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium bg-accent/50 p-4 rounded-xl w-fit border border-border">
                <Calendar className="h-5 w-5 text-[#b91c1c]" />
                <span>Established in: <span className="font-bold text-foreground">{data.established}</span></span>
              </div>
            </section>

            {/* Facilities Section */}
            {data.facilities && (
              <section className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Microscope className="h-6 w-6 text-[#b91c1c]" /> Facilities & Infrastructure
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {data.facilities.map((fac: any, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl border border-border bg-background hover:border-[#b91c1c]/30 transition-colors">
                      <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#b91c1c]"></div>
                        {fac.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{fac.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
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
