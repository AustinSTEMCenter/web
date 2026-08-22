export type TeamMember = {
  name: string;
  title: string;
  image?: string;
};

export const teamGroups: { group: string; members: TeamMember[] }[] = [
  {
    group: "Leadership",
    members: [
      { name: "Leah Silen", title: "Executive Director", image: "/images/team/leah-silen.jpg" },
      { name: "Lexi Little", title: "Director of People and Operations", image: "/images/team/lexi-little.jpg" },
      { name: "Luke Spence", title: "Director of Technical Programming", image: "/images/team/luke-spence.jpg" },
    ],
  },
  {
    group: "Programming",
    members: [
      { name: "Adrian Perez", title: "Program Development & Curriculum", image: "/images/team/adrian-perez.jpg" },
      { name: "Meason Wiley", title: "Program Development & Curriculum", image: "/images/team/meason-wiley.jpg" },
      { name: "Rylee Lippenholz", title: "Administrative Specialist", image: "/images/team/rylee-lippenholz.jpg" },
      { name: "Joseph Williams", title: "Technology Specialist", image: "/images/team/joseph-williams.jpg" },
      { name: "Zane Lewin", title: "Prototyping & Fabrication", image: "/images/team/zane-lewinASC.jpg" },
      { name: "Kian Childs", title: "Tech & Shop Assistant", image: "/images/team/kian-childs.jpg" },
    ],
  },
  {
    group: "Steering Committee",
    members: [
      { name: "Peter Wang", title: "Co-Founder", image: "/images/team/peter-wangASC.jpg" },
      { name: "Leah Silen", title: "Executive Director", image: "/images/team/leah-silen.jpg" },
      { name: "Evan Marchman", title: "Co-Founder", image: "/images/team/evan-marchmanASC.jpg" },
    ],
  },
];
