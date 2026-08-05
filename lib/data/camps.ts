export type Camp = {
  name: string;
  slug: string;
  /** illustrated title card — used on the camps listing */
  image: string;
  /** real photos from camp, lead photo first — used on the detail page */
  photos: { src: string; alt: string }[];
  season: string;
  ageRange: string;
  schedule: string;
  sessions: string[];
  price: string;
  pitch: string;
  expect: string[];
};

// Real Summer 2026 offerings, shown info-only ("season concluded" framing).
// Phase 2 adds registration fields — see plans/website-plan-02.md §7.
export const camps: Camp[] = [
  {
    name: "Fort Minecrafters",
    slug: "fort-minecrafters",
    image: "/images/camps/fort-minecrafters.png",
    photos: [
      {
        src: "/images/camps/fort-minecrafters-1.jpg",
        alt: "Campers building a walk-in fort out of full-size cardboard boxes",
      },
      {
        src: "/images/camps/fort-minecrafters-2.jpg",
        alt: "Camper in a handmade cardboard dragon helmet crafting at the build table",
      },
      {
        src: "/images/camps/fort-minecrafters-3.jpg",
        alt: "Young camper assembling a cardboard build at the work table",
      },
      {
        src: "/images/camps/fort-minecrafters-4.jpg",
        alt: "The whole room mid-build as a cardboard fort wall takes shape",
      },
    ],
    season: "Summer 2026",
    ageRange: "Ages 6–11",
    schedule: "9:00am – 12:00pm",
    sessions: [
      "June 1 – June 5, 2026",
      "June 8 – June 12, 2026",
      "July 6 – July 10, 2026",
      "July 13 – July 17, 2026",
    ],
    price: "$250",
    pitch:
      "Turn your Minecraft gamer into a real-world builder. Fort Minecrafters brings imagination off the screen and into hands-on engineering, where kids design, build, test, and improve structures they can actually stand inside.",
    expect: [
      "Build large structures out of cardboard that vary in size and function",
      "Learn about Makerspace tools like 3D printers, CNC machines, and laser cutters and assemble their own Minecraft tools like armor, helmets, and their own cardboard pickaxe",
      "See themselves as capable builders, problem-solvers, and crafters",
      "Demonstrate increasing confidence with hand tools and fabrication technologies",
      "Apply design thinking strategies to identify problems and develop solutions",
      "Bring ideas to life through creative design and imaginative storytelling",
    ],
  },
  {
    name: "Race Lab",
    slug: "race-lab",
    image: "/images/camps/race-lab.png",
    photos: [
      {
        src: "/images/camps/race-lab-1.jpg",
        alt: "Campers designing their cars on laptops around the lab table",
      },
      {
        src: "/images/camps/race-lab-2.jpg",
        alt: "Campers in safety glasses assembling their race car kits",
      },
      {
        src: "/images/camps/race-lab-3.jpg",
        alt: "Campers lining their cars up on the track on race day",
      },
      {
        src: "/images/camps/race-lab-4.jpg",
        alt: "CO2 smoke flying as cars launch down the race track",
      },
      {
        src: "/images/camps/race-lab-5.jpg",
        alt: "Campers building and tuning car parts around the round table",
      },
      {
        src: "/images/camps/race-lab-6.jpg",
        alt: "Campers watching a run at the track with a model race car up top",
      },
    ],
    season: "Summer 2026",
    ageRange: "Ages 8–13",
    schedule: "1:00pm – 4:00pm",
    sessions: ["June 1 – June 5, 2026", "July 6 – July 10, 2026"],
    price: "$250",
    pitch:
      "This is where kids learn that performance is built. Through building and rebuilding electric cars, campers discover how precision, tuning, and smart design decisions lead to success, and they may even get to meet a real racecar driver in the process.",
    expect: [
      "Build and race an RC car",
      "Meet and interact with a race car driver",
      "Use a metal cutting laser",
      "Get hands-on experience with full size race car parts",
    ],
  },
  {
    name: "Build-A-Synth",
    slug: "build-a-synth",
    image: "/images/camps/build-a-synth.png",
    photos: [
      {
        src: "/images/camps/build-a-synth-1.jpg",
        alt: "Campers with headphones on, playing the synthesizers they built",
      },
      {
        src: "/images/camps/build-a-synth-2.jpg",
        alt: "Close-up of a camper wiring up a breadboard audio circuit",
      },
      {
        src: "/images/camps/build-a-synth-3.jpg",
        alt: "ASC staff helping campers sort components at the build table",
      },
      {
        src: "/images/camps/build-a-synth-4.jpg",
        alt: "Campers assembling electronics from parts trays around the table",
      },
    ],
    season: "Summer 2026",
    ageRange: "Ages 10–15",
    schedule: "1:00pm – 4:00pm",
    sessions: ["June 8 – June 12, 2026", "July 13 – July 17, 2026"],
    price: "$250",
    pitch:
      "A fun, hands-on, creative crash course where students explore basic electronics and sound synthesis by building, soldering, and experimenting with real audio circuits and instruments.",
    expect: [
      "Hands-on building from day one: students construct a simple working synthesizer using real electronic components",
      "A guided, step-by-step process, where instructors explain core concepts in ways that kids can understand",
      "All projects use beginner-safe components designed specifically for learning",
      "Immediate results as they turn knobs, change components, and experiment to shape their own sounds",
      "Students are encouraged to help one another, share discoveries, and learn together",
      "Connect their synthesizer to a large audio system and show off their projects",
      "Each student leaves camp with their own functional mini synthesizer they've built themselves",
    ],
  },
];

export const getCamp = (slug: string) => camps.find((c) => c.slug === slug);
