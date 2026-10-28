export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  duration: string;
  eligibility: string;
  mode: string;
  modules: string[];
  syllabus?: string[];
  learningOutcomes: string[];
  badge?: string;
  featured?: boolean;
  category?: "students" | "teachers";
}

export const COURSES: Course[] = [
  // ==========================================
  // PROGRAMS FOR STUDENTS
  // ==========================================
  {
    id: "public-speaking-juniors",
    slug: "public-speaking-for-juniors",
    title: "Public Speaking for Juniors",
    badge: "Students (Ages 6–11)",
    featured: true,
    category: "students",
    shortDescription:
      "Nurture natural stage confidence, clear articulation, expressive body language, and creative storytelling in a fun, supportive atmosphere.",
    description:
      "Public Speaking for Juniors empowers young learners to overcome stage fright, discover their unique vocal presence, and express ideas with joy and confidence. Through engaging theatre games, show-and-tell activities, character role-play, and structured storytelling frameworks, students develop clear articulation, positive body language, and empathetic listening habits that stay with them for life.",
    duration: "8 Weeks (Weekend Batches)",
    eligibility: "Students in Grades 1 to 5 (Ages 6–11)",
    mode: "Interactive Live Classes & Weekend Speech Showcase",
    modules: [
      "Vocal Expression, Voice Modulation & Clear Articulation",
      "Body Language, Posture & Eye Contact Confidence",
      "Creative Storytelling & Show-and-Tell Frameworks",
      "Showcase Presentation & Fun Impromptu Speaking",
    ],
    learningOutcomes: [
      "Overcome stage hesitation and speak with natural warmth, clarity, and volume.",
      "Structure simple ideas and stories into compelling beginning, middle, and end formats.",
      "Use expressive facial gestures, confident stance, and active listening skills.",
      "Deliver a self-authored 2-minute showcase presentation in front of peers and family.",
    ],
  },
  {
    id: "public-speaking-seniors",
    slug: "public-speaking-for-seniors",
    title: "Public Speaking for Seniors",
    badge: "Students (Ages 12–18)",
    featured: true,
    category: "students",
    shortDescription:
      "Master parliamentary debate, persuasive rhetoric, TED-style keynote delivery, and compelling on-stage argumentation for teens.",
    description:
      "Designed for middle and high school students, Public Speaking for Seniors transforms teenagers into charismatic, impactful communicators. Students explore Aristotle's classical modes of persuasion (Ethos, Pathos, Logos), construct rock-solid debate cases, dissect legendary speeches, and master impromptu extempore speaking to excel in academic presentations, model UNs, and leadership arenas.",
    duration: "10 Weeks (Intensive)",
    eligibility: "Students in Grades 6 to 12 (Ages 12–18)",
    mode: "Live Speech Labs, Debate Simulators & TED-Style Showcase",
    modules: [
      "Persuasive Rhetoric & Argumentation Architecture",
      "Debate Frameworks, Rebuttals & Critical Refutation",
      "TED-Style Keynote Delivery, Hook & Slide Aesthetics",
      "Extempore Mastery & High-Stakes Q&A Handling",
    ],
    learningOutcomes: [
      "Craft well-researched arguments supported by credible evidence, sound logic, and emotional resonance.",
      "Deliver impassioned, structured 5-minute keynote talks with polished stage presence.",
      "Think critically on your feet during rapid rebuttals and impromptu speech rounds.",
      "Handle challenging audience questions with composure, intellectual humility, and poise.",
    ],
  },
  {
    id: "life-skills-juniors",
    slug: "life-skills-for-juniors",
    title: "Life Skills for Juniors",
    badge: "Students (Ages 6–11)",
    featured: true,
    category: "students",
    shortDescription:
      "Develop emotional intelligence, positive friendship habits, healthy self-regulation, empathy, and everyday creative problem-solving.",
    description:
      "Life Skills for Juniors equips growing students with foundational emotional toolkits to understand their feelings, navigate peer dynamics, resolve playground disagreements, and cultivate resilient self-esteem. Through collaborative team tasks, mindfulness routines, and experiential games, young minds build empathy and practical everyday independence.",
    duration: "8 Weeks",
    eligibility: "Students in Grades 1 to 5 (Ages 6–11)",
    mode: "Activity-Based Workshop & Group Collaboration",
    modules: [
      "Understanding Emotions & Self-Regulation Habits",
      "Empathy, Kindness & Collaborative Friendship Skills",
      "Creative Problem-Solving & Daily Decision Making",
      "Everyday Independence, Personal Safety & Mindfulness",
    ],
    learningOutcomes: [
      "Identify and express emotional states constructively without emotional overwhelm.",
      "Resolve peer disagreements peacefully using active listening, turn-taking, and compromise.",
      "Demonstrate responsibility for personal belongings and daily routines.",
      "Approach challenges with a growth mindset and celebrate peer achievements.",
    ],
  },
  {
    id: "life-skills-seniors",
    slug: "life-skills-for-seniors",
    title: "Life Skills for Seniors",
    badge: "Students (Ages 12–18)",
    featured: true,
    category: "students",
    shortDescription:
      "Crucial real-world preparedness: personal finance, time management, critical thinking, stress resilience, and self-leadership.",
    description:
      "Preparing adolescents for the real world, Life Skills for Seniors bridges the gap between textbook academics and real adulthood. Teenagers learn financial literacy basics (budgeting, smart spending, compound interest), strategic time and goal management, digital wellbeing, stress reduction techniques, and ethical decision-making to step into university life with maturity.",
    duration: "12 Weeks",
    eligibility: "Students in Grades 6 to 12 (Ages 12–18)",
    mode: "Scenario Labs, Financial Masterclasses & Leadership Mentorship",
    modules: [
      "Personal Finance, Budgeting & Smart Money Habits",
      "Time Architecture, Productivity & Goal Setting",
      "Critical Thinking, Information Literacy & Ethics",
      "Mental Wellness, Stress Navigation & Emotional Resilience",
    ],
    learningOutcomes: [
      "Construct and maintain a personal savings budget and understand core financial instruments.",
      "Prioritize academic workload and personal commitments while avoiding burnout.",
      "Filter misinformation critically and make reasoned, values-aligned life choices.",
      "Develop robust mental wellness habits and resilient stress-coping mechanisms.",
    ],
  },

  // ==========================================
  // PROGRAMS FOR TEACHERS
  // ==========================================
  {
    id: "ntt-diploma",
    slug: "nursery-teachers-training",
    title: "NTT Nursery Teachers Training",
    badge: "Diploma & Certification",
    featured: true,
    category: "teachers",
    shortDescription:
      "Develop socially aware teachers who understand child psychology, are sensitive to individual needs, and can provide appropriate educational and personal support in early childhood settings.",
    description:
      "The Nursery Teachers Training (NTT) program at Ignite Learning Academy is an intensive 1-Year diploma. Designed in alignment with National Education Policy (NEP 2020) foundational stage guidelines, this program empowers educators with deep developmental psychology insights, multi-sensory curriculum design, phonics, and hands-on classroom practicums.",
    duration: "1 Year",
    eligibility: "10+2 / Higher Secondary in any stream (Graduation preferred)",
    mode: "Hybrid (Online Theory + Weekend Practical Practicum in Bangalore)",
    syllabus: [
      "Module 1: Child Psychology & Development",
      "Module 2: Child Care & Health",
      "Module 3: Socialisation & Guidance",
      "Module 4: Principles & Modern Methods of Education",
      "Module 5: School Organisation & Management",
      "Module 6: Lesson Planning & Practicum",
    ],
    modules: [
      "Module 1: Child Psychology & Development",
      "Module 2: Child Care & Health",
      "Module 3: Socialisation & Guidance",
      "Module 4: Principles & Modern Methods of Education",
      "Module 5: School Organisation & Management",
      "Module 6: Lesson Planning & Practicum",
    ],
    learningOutcomes: [
      "Master the cognitive, emotional, and physical developmental milestones from birth through age 6.",
      "Design multi-sensory teaching-learning materials (TLMs) and vibrant learning corners.",
      "Implement positive behavioral reinforcement and nurturing classroom routines.",
      "Complete a mentored classroom teaching internship in reputed partner schools.",
    ],
  },
  {
    id: "communication-for-impact",
    slug: "communication-for-impact",
    title: "Public Speaking & Spoken English for Teachers",
    badge: "Professional Certificate",
    featured: true,
    category: "teachers",
    shortDescription:
      "This course is designed to be completed in six consecutive weeks. Once enrolled, a learner completes the modules in sequence to earn a Certificate.",
    description:
      "Public Speaking & Spoken English for Teachers is an intensive 6-week professional accelerator designed specifically for educators, tutors, and academic leaders. This course is designed to be completed in six consecutive weeks. Once enrolled, a learner completes the modules in sequence to earn a Certificate, mastering clear pronunciation, classroom instructions, parent-teacher collaboration, and confident lesson demonstrations.",
    duration: "6 Weeks",
    eligibility: "Open to educators, student mentors, daycare administrators, and educational counselors",
    mode: "Live Interactive Online Sessions + Practical Speech Lab",
    syllabus: [
      "Module 1: Building English Foundations",
      "Module 2: Fluency and Pronunciation",
      "Module 3: English for Classroom Communication",
      "Module 4: Teaching and Presentation Skills",
      "Module 5: Professional Communication",
      "Module 6: Confidence and Practical Assessment",
    ],
    modules: [
      "Module 1: Building English Foundations",
      "Module 2: Fluency and Pronunciation",
      "Module 3: English for Classroom Communication",
      "Module 4: Teaching and Presentation Skills",
      "Module 5: Professional Communication",
      "Module 6: Confidence and Practical Assessment",
    ],
    learningOutcomes: [
      "Speak in simple, grammatically clearer English with greater confidence.",
      "Give classroom instructions and explain concepts effectively.",
      "Interact appropriately with students, parents, and colleagues.",
      "Conduct storytelling, rhymes, and classroom activities in English.",
      "Deliver a short lesson demonstration in English.",
      "Participate more confidently in teacher interviews and professional discussions.",
    ],
  },
  {
    id: "teachers-training-certificate",
    slug: "teachers-training-certificate-program",
    title: "Teachers Training Certificate Program (3 months)",
    badge: "Certificate Program",
    featured: true,
    category: "teachers",
    shortDescription:
      "Fast-track 3-month certificate in contemporary pedagogy, child-centric classroom design, active learning aids, and student assessment.",
    description:
      "The Teachers Training Certificate Program is a focused 3-month curriculum for educators eager to modernize their teaching practice. Covering constructivist learning models, active learning games, formative assessment strategies, and technology-assisted classroom aids, this program provides modern pedagogical techniques to thrive in 21st-century classrooms.",
    duration: "3 Months (12 Weeks)",
    eligibility: "Working preschool teachers, day-care facilitators, or graduates pursuing early education",
    mode: "Online with Hands-On Weekend Material Workshops",
    modules: [
      "Contemporary Learning Theories & NEP Foundational Framework",
      "Active Learning Design & Low-Cost Teaching Aid Preparation",
      "Formative Observation & Holistic Portfolio Assessment",
      "Inclusive Classrooms & Differentiated Instruction Strategies",
    ],
    learningOutcomes: [
      "Translate contemporary pedagogy and NEP foundational guidelines into everyday active lesson plans.",
      "Construct creative, low-cost teaching aids from upcycled everyday materials.",
      "Track and report holistic student progress with individualized observational rubrics.",
      "Foster an inclusive, engaging environment where every child feels valued and supported.",
    ],
  },
  {
    id: "play-based-learning",
    slug: "play-based-learning-for-teachers",
    title: "Play-Based Learning for Teachers",
    badge: "Specialized Certificate",
    featured: false,
    category: "teachers",
    shortDescription:
      "Master constructivist pedagogy and transform early childhood classrooms into active inquiry labs through structured and free play.",
    description:
      "Play is the highest form of early childhood research. This specialized certificate program immerses educators in the science and craft of play-based pedagogy. From designing open-ended sensory environments to navigating discovery in outdoor settings, teachers learn how to spark curiosity and build foundational numeracy and literacy naturally.",
    duration: "3 Months (12 Weeks)",
    eligibility: "Working preschool teachers, day-care facilitators, or graduates pursuing early education",
    mode: "Online with Hands-On Weekend Material Workshops",
    modules: [
      "Foundations of Play-Based Pedagogy",
      "Designing Play Environments & Loose Parts",
      "Play, Language & Cognitive Development",
      "Outdoor Discovery & Holistic Assessment Through Play",
    ],
    learningOutcomes: [
      "Understand the neurological and socio-emotional mechanisms activated through guided play.",
      "Design open-ended play spaces using loose parts and natural sensory materials.",
      "Scaffold mathematical reasoning and emergent literacy within everyday play scenarios.",
      "Document learning evidence accurately using non-intrusive observational rubrics.",
    ],
  },
  {
    id: "communication-skills-educators",
    slug: "communication-skills-for-educators",
    title: "Communication Skills for Educators",
    badge: "Professional Certificate",
    featured: false,
    category: "teachers",
    shortDescription:
      "Elevate your voice as an inspiring educator through master storytelling, active listening, and calm conflict mediation.",
    description:
      "A comprehensive communication masterclass for educators wanting to refine their voice, master classroom storytelling, and lead collaborative parent dialogues.",
    duration: "6 Weeks",
    eligibility: "Open to educators, student mentors, daycare administrators, and educational counselors",
    mode: "Live Interactive Online Sessions + Practical Speech Lab",
    modules: [
      "Verbal & Non-Verbal Communication",
      "Classroom Language Strategies",
      "Parent-Teacher Conversations",
      "Conflict Resolution",
    ],
    learningOutcomes: [
      "Project confidence, vocal clarity, and positive body language.",
      "Perform compelling storytelling sessions using voice modulation and expressive read-alouds.",
      "Lead collaborative parent conferences that build lasting trust.",
      "Mediate peer conflicts using restorative techniques.",
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find(
    (course) =>
      course.slug === slug ||
      (course.id === "communication-for-impact" &&
        (slug === "public-speaking-spoken-english-for-teachers" ||
          slug === "public-speaking-and-spoken-english-for-teachers"))
  );
}

export function getAllCourseSlugs(): string[] {
  const slugs = COURSES.map((course) => course.slug);
  slugs.push("public-speaking-spoken-english-for-teachers");
  return slugs;
}

export function getStudentCourses(): Course[] {
  return COURSES.filter((course) => course.category === "students");
}

export function getTeacherCourses(): Course[] {
  return COURSES.filter((course) => course.category === "teachers");
}
