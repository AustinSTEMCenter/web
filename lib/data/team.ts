export type TeamMember = {
  name: string;
  title: string;
  image?: string;
};

export const teamGroups: { group: string; members: TeamMember[] }[] = [
  {
    group: "Leadership",
    members: [
      { name: "Leah Silen", title: "Executive Director", image: "/images/team/leah-silen.png" },
      { name: "Lexi Little", title: "Chief Operations Officer", image: "/images/team/lexi-little.png" },
      { name: "Luke Spence", title: "Director of Shop & Mentorship", image: "/images/team/luke-spence.png" },
    ],
  },
  {
    group: "Programming",
    members: [
      { name: "Adrian Perez", title: "Experiential Learning & Content", image: "/images/team/adrian-perez.png" },
      { name: "Meason Wiley", title: "Experiential Learning & Design", image: "/images/team/meason-wiley.png" },
      { name: "Rylee Lippenholz", title: "Logistics Manager", image: "/images/team/rylee-lippenholz.png" },
      { name: "Joseph Williams", title: "IT & Shop Steward", image: "/images/team/joseph-williams.png" },
    ],
  },
  {
    group: "Steering Committee",
    members: [
      { name: "Peter Wang", title: "Co-Founder" },
      { name: "Evan Marchman", title: "Co-Founder" },
    ],
  },
];
