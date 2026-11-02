/** Each club runs the same program twice a week, for two kinds of students. */
export type ClubAudience = "after-school" | "homeschool";

export const audiences: Record<
  ClubAudience,
  { label: string; who: string }
> = {
  "after-school": {
    label: "After-school",
    who: "For students in school: weekday afternoons and evenings",
  },
  homeschool: {
    label: "Homeschool",
    who: "For homeschool students: daytime, during school hours",
  },
};

export type ClubMeeting = {
  audience: ClubAudience;
  ages: string;
  /** usual meeting day, 0 = Sunday — dates on another day get flagged */
  weekday: number;
  day: string;
  time: string;
  room: string;
  /** "YYYY-MM-DD", Austin local time */
  dates: string[];
};

export type Club = {
  name: string;
  slug: string;
  /** square club poster */
  image: string;
  description: string;
  /** tools and topics, shown as tags under the description */
  tools: string[];
  /** Givebutter event page, with a ticket for each meeting's dates */
  registerUrl?: string;
  meetings: ClubMeeting[];
};

export const CLUB_CAPACITY = 8;

// Club tracks — copy taken from the club posters; meetings from the Fall 2026
// programming calendar (October – December).
export const clubs: Club[] = [
  {
    name: "Design & Build",
    slug: "design-and-build",
    registerUrl: "https://givebutter.com/design-and-build",
    image: "/images/clubs/design-and-build.png",
    description:
      "Use 3D printing, laser cutting, and other makerspace tools to design, test, and build interactive projects for ASC.",
    tools: ["3D printing", "laser cutting", "makerspace tools"],
    meetings: [
      {
        audience: "after-school",
        ages: "Ages 10–13",
        weekday: 1,
        day: "Mondays",
        time: "4:30–6:30 pm",
        room: "Makerspace",
        dates: [
          "2026-10-19",
          "2026-10-26",
          "2026-11-02",
          "2026-11-09",
          "2026-11-16",
          "2026-11-30",
          "2026-12-07",
          "2026-12-14",
        ],
      },
      {
        audience: "homeschool",
        ages: "Ages 13–15",
        weekday: 3,
        day: "Wednesdays",
        time: "1:00–3:00 pm",
        room: "Electronics Lab",
        dates: [
          "2026-10-21",
          "2026-10-28",
          "2026-11-04",
          "2026-11-18",
          "2026-12-02",
          "2026-12-09",
          "2026-12-16",
        ],
      },
    ],
  },
  {
    name: "Spark & Motion",
    slug: "spark-and-motion",
    registerUrl: "https://givebutter.com/spark-and-motion",
    image: "/images/clubs/spark-and-motion.png",
    description:
      "Explore circuits, sensors, motors, and coding to create experiences that move, light up, and respond to people at ASC.",
    tools: ["circuits", "sensors", "motors", "coding"],
    meetings: [
      {
        audience: "after-school",
        ages: "Ages 13–15",
        weekday: 4,
        day: "Thursdays",
        time: "5:30–7:30 pm",
        room: "Electronics Lab",
        dates: [
          "2026-10-22",
          "2026-10-29",
          "2026-11-05",
          "2026-11-12",
          "2026-11-19",
          "2026-12-03",
          "2026-12-10",
          "2026-12-17",
        ],
      },
      {
        audience: "homeschool",
        ages: "Ages 10–12",
        weekday: 2,
        day: "Tuesdays",
        time: "9:30–11:30 am",
        room: "Electronics Lab",
        dates: [
          "2026-10-20",
          "2026-10-27",
          "2026-11-03",
          "2026-11-18", // Wednesday — Tuesday the 17th is a field trip
          "2026-12-01",
          "2026-12-08",
          "2026-12-15",
        ],
      },
    ],
  },
];
