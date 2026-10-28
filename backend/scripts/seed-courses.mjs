const BASE_URL = process.env.PAYLOAD_URL || "http://127.0.0.1:3000";

const COURSES_DATA = [
  {
    title: "Public Speaking for Juniors",
    slug: "public-speaking-for-juniors",
    badge: "Students (Ages 6–11)",
    featured: true,
    category: "Student Training",
    shortDescription:
      "Nurture natural stage confidence, clear articulation, expressive body language, and creative storytelling in a fun, supportive atmosphere.",
    description:
      "Public Speaking for Juniors empowers young learners to overcome stage fright, discover their unique vocal presence, and express ideas with joy and confidence. Through engaging theatre games, show-and-tell activities, character role-play, and structured storytelling frameworks, students develop clear articulation, positive body language, and empathetic listening habits that stay with them for life.",
    duration: "8 Weeks (Weekend Batches)",
    eligibility: "Students in Grades 1 to 5 (Ages 6–11)",
    mode: "Interactive Live Classes & Weekend Speech Showcase",
    syllabus: [
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
    title: "Public Speaking for Seniors",
    slug: "public-speaking-for-seniors",
    badge: "Students (Ages 12–18)",
    featured: true,
    category: "Student Training",
    shortDescription:
      "Master parliamentary debate, persuasive rhetoric, TED-style keynote delivery, and compelling on-stage argumentation for teens.",
    description:
      "Designed for middle and high school students, Public Speaking for Seniors transforms teenagers into charismatic, impactful communicators. Students explore Aristotle's classical modes of persuasion (Ethos, Pathos, Logos), construct rock-solid debate cases, dissect legendary speeches, and master impromptu extempore speaking to excel in academic presentations, model UNs, and leadership arenas.",
    duration: "10 Weeks (Intensive)",
    eligibility: "Students in Grades 6 to 12 (Ages 12–18)",
    mode: "Live Speech Labs, Debate Simulators & TED-Style Showcase",
    syllabus: [
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
    title: "Life Skills for Juniors",
    slug: "life-skills-for-juniors",
    badge: "Students (Ages 6–11)",
    featured: true,
    category: "Student Training",
    shortDescription:
      "Develop emotional intelligence, positive friendship habits, healthy self-regulation, empathy, and everyday creative problem-solving.",
    description:
      "Life Skills for Juniors equips growing students with foundational emotional toolkits to understand their feelings, navigate peer dynamics, resolve playground disagreements, and cultivate resilient self-esteem. Through collaborative team tasks, mindfulness routines, and experiential games, young minds build empathy and practical everyday independence.",
    duration: "8 Weeks",
    eligibility: "Students in Grades 1 to 5 (Ages 6–11)",
    mode: "Activity-Based Workshop & Group Collaboration",
    syllabus: [
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
    title: "Life Skills for Seniors",
    slug: "life-skills-for-seniors",
    badge: "Students (Ages 12–18)",
    featured: true,
    category: "Student Training",
    shortDescription:
      "Crucial real-world preparedness: personal finance, time management, critical thinking, stress resilience, and self-leadership.",
    description:
      "Preparing adolescents for the real world, Life Skills for Seniors bridges the gap between textbook academics and real adulthood. Teenagers learn financial literacy basics (budgeting, smart spending, compound interest), strategic time and goal management, digital wellbeing, stress reduction techniques, and ethical decision-making to step into university life with maturity.",
    duration: "12 Weeks",
    eligibility: "Students in Grades 6 to 12 (Ages 12–18)",
    mode: "Scenario Labs, Financial Masterclasses & Leadership Mentorship",
    syllabus: [
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
  {
    title: "NTT Nursery Teachers Training",
    slug: "nursery-teachers-training",
    badge: "Diploma & Certification",
    featured: true,
    category: "Teacher Training",
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
    learningOutcomes: [
      "Master the cognitive, emotional, and physical developmental milestones from birth through age 6.",
      "Design multi-sensory teaching-learning materials (TLMs) and vibrant learning corners.",
      "Implement positive behavioral reinforcement and nurturing classroom routines.",
      "Complete a mentored classroom teaching internship in reputed partner schools.",
    ],
  },
  {
    title: "Public Speaking & Spoken English for Teachers",
    slug: "communication-for-impact",
    badge: "Professional Certificate",
    featured: true,
    category: "Teacher Training",
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
    title: "Teachers Training Certificate Program (3 months)",
    slug: "teachers-training-certificate-program",
    badge: "Certificate Program",
    featured: true,
    category: "Teacher Training",
    shortDescription:
      "Fast-track 3-month certificate in contemporary pedagogy, child-centric classroom design, active learning aids, and student assessment.",
    description:
      "The Teachers Training Certificate Program is a focused 3-month curriculum for educators eager to modernize their teaching practice. Covering constructivist learning models, active learning games, formative assessment strategies, and technology-assisted classroom aids, this program provides modern pedagogical techniques to thrive in 21st-century classrooms.",
    duration: "3 Months (12 Weeks)",
    eligibility: "Working preschool teachers, day-care facilitators, or graduates pursuing early education",
    mode: "Online with Hands-On Weekend Material Workshops",
    syllabus: [
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
];

async function seedCourses() {
  console.log("=== SEEDING COURSES INTO PAYLOAD CMS ===");

  // 1. Authenticate with Payload Admin
  console.log("\n1. Authenticating as admin...");
  const authRes = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@igniteacademy.com",
      password: "Password123!@#",
    }),
  });

  if (!authRes.ok) {
    throw new Error(`Admin login failed with status ${authRes.status}`);
  }

  const { token } = await authRes.json();
  const authHeaders = {
    Authorization: `JWT ${token}`,
    "Content-Type": "application/json",
  };
  console.log("✓ Authenticated successfully.");

  // 2. Fetch existing courses to avoid duplicates
  const existingRes = await fetch(`${BASE_URL}/api/courses?limit=100`, { headers: authHeaders });
  const existingJson = await existingRes.json();
  const existingDocs = existingJson.docs || [];
  const existingSlugMap = new Map();
  for (const doc of existingDocs) {
    existingSlugMap.set(doc.slug, doc.id);
  }
  console.log(`Found ${existingDocs.length} courses already in database.`);

  const results = [];

  for (const c of COURSES_DATA) {
    const payloadBody = {
      title: c.title,
      slug: c.slug,
      shortDescription: c.shortDescription,
      description: c.description,
      duration: c.duration,
      category: c.category,
      badge: c.badge,
      eligibility: c.eligibility,
      mode: c.mode,
      featured: c.featured,
      status: "Published",
      syllabus: c.syllabus.map((m) => ({ module: m })),
      learningOutcomes: c.learningOutcomes.map((o) => ({ outcome: o })),
    };

    const existingId = existingSlugMap.get(c.slug);

    if (existingId) {
      console.log(`Updating existing course "${c.title}" (${c.slug}, ID: ${existingId})...`);
      const updateRes = await fetch(`${BASE_URL}/api/courses/${existingId}`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify(payloadBody),
      });

      if (!updateRes.ok) {
        const errText = await updateRes.text();
        console.error(`  ⚠️ Failed to update ${c.slug}:`, errText);
      } else {
        const json = await updateRes.json();
        const doc = json.doc || json;
        results.push({ id: doc.id, title: doc.title, category: doc.category, duration: doc.duration, status: doc.status });
      }
    } else {
      console.log(`Creating course "${c.title}" (${c.slug})...`);
      const createRes = await fetch(`${BASE_URL}/api/courses`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(payloadBody),
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        console.error(`  ⚠️ Failed to create ${c.slug}:`, errText);
      } else {
        const json = await createRes.json();
        const doc = json.doc || json;
        results.push({ id: doc.id, title: doc.title, category: doc.category, duration: doc.duration, status: doc.status });
      }
    }
  }

  console.log("\n=== SEED COURSES SUMMARY ===");
  console.table(results);
  console.log(`✓ Seeded ${results.length} courses successfully into Payload CMS!`);
}

seedCourses().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
