export type PricingRow = {
  option: string;
  duration?: string;
  price: string;
  description: string;
};

export type Program = {
  title: string;
  slug: string;
  href: string;
  image: string;
  teaser: string;
  about: string[];
  experienceHeading: string;
  experience: string[];
  why?: string;
  inquiry?: string;
  pricing?: { heading: string; rows: PricingRow[] };
};

export const programs: Program[] = [
  {
    title: "Field Trips",
    slug: "field-trips",
    href: "/programs/field-trips",
    image: "/images/camps/race-lab-1.jpg",
    teaser:
      "Hands-on STEM experiences that connect classroom learning to real-world tools, careers, and problem-solving.",
    about: [
      "Field trips at the Austin STEM Center (ASC) are immersive, hands-on learning experiences designed to help students see how what they learn in the classroom shows up in the real world. Students explore modern tools, materials, and technologies while engaging with real processes used in manufacturing, engineering, and design.",
      "Field trips are ideal for elementary, middle, and high school groups and are designed to complement classroom learning while sparking curiosity and confidence.",
    ],
    experienceHeading: "What students experience",
    experience: [
      "Guided exploration of ASC's machine shop, wood shop, makerspaces, and labs",
      "Safe interaction with industry tools and machines",
      "Exposure to careers in STEM, skilled trades, and technical fields",
      "Learning that emphasizes curiosity, problem-solving, and how things are made",
    ],
    why: "ASC offers access to tools and environments students rarely see in traditional classrooms. Our field trips are built around real equipment, real processes, and real-world relevance, helping students connect learning to future opportunities.",
    inquiry: "Interested in scheduling an experience with ASC?",
    pricing: {
      heading: "Experiences & pricing",
      rows: [
        {
          option: "Field Trip",
          duration: "2 hours",
          price: "$15 / student",
          description:
            "A hands-on STEM experience designed for school groups and organizations.",
        },
        {
          option: "Field Trip + Mini Lab",
          duration: "4 hours",
          price: "$40 / student",
          description:
            "An extended, immersive STEM experience with deeper project work and exploration.",
        },
        {
          option: "Full-Day Experience",
          duration: "6 hours",
          price: "$75 / student",
          description:
            "A full-day engineering and innovation experience featuring STEM activities and a level-appropriate project. Includes the field trip (optional).",
        },
      ],
    },
  },
  {
    title: "Summer Camps",
    slug: "summer-camps",
    href: "/programs/summer-camps",
    image: "/images/camps/fort-minecrafters-1.jpg",
    teaser:
      "Hands-on camps where creativity, STEM, fun, and real-world skills come together.",
    about: [
      "ASC summer camps are multi-day experiences that give students the time and space to explore, build, and create. Camps are designed around hands-on projects, collaboration, and experimentation, giving campers the chance to work with real tools and real materials.",
      "Camps are available for a range of age groups and interests, with programming rooted in STEM, design, and making.",
    ],
    experienceHeading: "What campers experience",
    experience: [
      "Project-based learning using real tools and materials",
      "Exposure to engineering, fabrication, design, and technology",
      "Opportunities to test ideas, iterate, and learn through doing",
      "A supportive environment that values curiosity and creativity",
    ],
  },
  {
    title: "After-School STEM Clubs",
    slug: "after-school-clubs",
    href: "/programs/after-school-clubs",
    image: "/images/camps/build-a-synth-3.jpg",
    teaser:
      "Flexible after-school enrichment focused on hands-on STEM learning.",
    about: [
      "Our after-school STEM clubs give students a regular place to build, tinker, and explore beyond the school day. On scheduled club days, students take on hands-on projects across robotics, engineering, and making, guided by ASC staff in our real shops, labs, and maker spaces.",
      "Come session by session, or join as a monthly member for unlimited participation during scheduled club days.",
    ],
    experienceHeading: "What club members experience",
    experience: [
      "Hands-on STEM projects in ASC's maker spaces and labs",
      "Flexible enrichment that fits after-school schedules",
      "Consistent mentorship and a community of fellow makers",
      "New challenges across robotics, engineering, and design",
    ],
    inquiry: "Interested in joining a STEM club?",
    pricing: {
      heading: "Pricing",
      rows: [
        {
          option: "Single session",
          price: "$60 / session",
          description:
            "Flexible after-school enrichment focused on hands-on STEM learning.",
        },
        {
          option: "Monthly membership",
          price: "$200 / month",
          description:
            "Unlimited participation in our after-school club program during scheduled club days.",
        },
      ],
    },
  },
];

export const getProgram = (slug: string) =>
  programs.find((p) => p.slug === slug);
