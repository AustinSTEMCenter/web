export type LabSession = {
  name: string;
  slug: string;
  /** "YYYY-MM-DD", Austin local time */
  date: string;
  time: string;
  ages: string;
  price: string;
  capacity: number;
  description: string;
  /** Givebutter event page; until set, the card shows "registration opens soon" */
  registerUrl?: string;
};

// Sunday labs from the Fall 2026 programming calendar (October – December).
export const labs: LabSession[] = [
  {
    name: "Tinkercad 101",
    slug: "tinkercad-101",
    registerUrl: "https://givebutter.com/tinkercad-101",
    date: "2026-11-08",
    time: "1:00–4:00 pm",
    ages: "Ages 10–12",
    price: "$75",
    capacity: 10,
    description:
      "Turn simple shapes into big ideas! Students learn the basics of 3D design in Tinkercad while practicing spatial reasoning, measurement, and the engineering process of designing and refining a model.",
  },
  {
    name: "Cardboard Design Challenge: Build an Ornament",
    slug: "cardboard-ornament",
    date: "2026-12-06",
    time: "1:00–4:00 pm",
    ages: "Ages 13–15",
    price: "$75",
    capacity: 10,
    description:
      "Give engineering a festive twist! Students design and build a cardboard ornament, using measurement, geometry, and creative construction to test and improve their holiday designs.",
  },
  {
    name: "Intro to Physical Computing: Holiday Edition",
    slug: "physical-computing-holiday",
    date: "2026-12-13",
    time: "1:00–4:00 pm",
    ages: "Ages 10–12",
    price: "$75",
    capacity: 10,
    description:
      "Make the holidays interactive! Students explore how code and electronics work together through a holiday-themed physical computing project, practicing programming logic, circuits, and troubleshooting.",
  },
];
