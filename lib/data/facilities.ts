export type Facility = {
  name: string;
  slug: string;
  legacySlug?: string;
  image: string;
  note: string;
  paragraphs: string[];
};

export const facilities: Facility[] = [
  {
    name: "FIRST Arena",
    slug: "first-arena",
    image: "/images/facilities/first-arena.jpg",
    note: "FIRST robotics drive practice",
    paragraphs: [
      "The FIRST Robotics Competition (FRC) Arena is a dedicated build, testing, and competition-style practice space designed to support advanced robotics engineering and teamwork. Learners can assemble full-scale FRC robots, practice on regulation-sized field elements, and test drivetrains, mechanisms, sensors, and control systems in a real-world competitive environment.",
      "The arena is equipped with modular field components, safety barriers, tools, and power infrastructure to support rapid prototyping, iteration, and match simulation. This space allows teams to refine robot performance, practice game strategy, and develop collaboration, leadership, and problem-solving skills essential to high-level robotics competition.",
    ],
  },
  {
    name: "Wood Shop",
    slug: "wood-shop",
    image: "/images/facilities/wood-shop.jpg",
    note: "4×8 CNC router",
    paragraphs: [
      "The wood shop is a fully equipped fabrication space where learners explore how raw materials become finished products. The centerpiece of the space is a large-format CNC router with a 4×8 cutting area, capable of handling full sheets of plywood and large-scale builds. The shop also includes table saws, miter saws, drill presses, routers, spindle sanders, and full dust collection systems to ensure a clean and safe environment.",
      "The CNC router is housed in its own room, allowing students to run the machine safely while observing the process through a large viewing window. This space supports ASC programs, facility build-outs, and community learning experiences, and is also used to train educators so they can bring these skills back to their own classrooms and shops.",
    ],
  },
  {
    name: "Machine Shop",
    slug: "machine-shop",
    legacySlug: "metal-shop",
    image: "/images/facilities/machine-shop.jpg",
    note: "Haas 32-bit CNC",
    paragraphs: [
      "Our full-scale machine shop gives learners rare access to the tools and processes used in modern manufacturing. The space is equipped for metal forming, machining, and cutting, including advanced equipment such as a CNC mill, fiber laser, multiple CO₂ lasers, and manual machining tools. As the shop continues to grow, it will also include a CNC press brake and professional-grade welding equipment capable of handling multiple materials and processes.",
      "This shop serves as a core support space for field trips, camps, and structured workshops. Students will have the opportunity to safely interact with large-scale machines during structured experiences. The goal is exposure, understanding, and hands-on engagement that demystifies manufacturing and connects learning directly to real industry practices.",
    ],
  },
  {
    name: "Electronics Lab",
    slug: "electronics-lab",
    image: "/images/facilities/electronics-lab.jpg",
    note: "breadboard electronics",
    paragraphs: [
      "The Electronics Lab is a combined electronics and computer lab designed to teach both hardware and software skills. Learners can explore CAD and vector design software used to operate CNC machines and lasers, as well as dive into electronics through circuit building, microcontrollers, servos, and power systems.",
      "The lab is fully equipped with soldering stations, power supplies, tools, and components that allow learners to build, test, and troubleshoot electronic systems. The space also supports computer teardown and rebuilds, helping learners understand how digital and physical systems work together in modern technology.",
    ],
  },
  {
    name: "Makerspace",
    slug: "makerspace",
    image: "/images/facilities/makerspace.jpg",
    note: "3D printers & more",
    paragraphs: [
      "The Makerspace is dedicated to prototyping, design, and fabrication that requires a controlled, clean environment. This space includes a bank of 3D printers capable of printing engineering-grade materials, along with vacuum forming machines, sewing machines, and dye-sublimation printers for apparel and product creation.",
      "This space bridges creativity and engineering, giving learners hands-on experience with modern prototyping tools while exploring design, iteration, and production. It supports everything from student projects to workforce-focused skill building and product development.",
    ],
  },
  {
    name: "Teaching Kitchen",
    slug: "teaching-kitchen",
    image: "/images/facilities/teaching-kitchen.webp",
    note: "kitchen chemistry",
    paragraphs: [
      "The ASC kitchen is a functional learning space designed to support programming, events, and hands-on experiences that connect food, science, and community. The kitchen is equipped to accommodate group use and serves as a flexible environment for culinary exploration, nutrition-based learning, and hospitality support during workshops, camps, and professional gatherings.",
      "This space allows learners to explore the science behind food, measurement, and process while also supporting larger events and community programs. Whether used as part of a structured learning experience or to support collaboration and connection across programs, the kitchen plays an important role in making ASC a welcoming and fully functional learning environment.",
    ],
  },
];
