export type TeamMember = {
  name: string;
  title: string;
  image?: string;
};

export const boardOfDirectors: TeamMember[] = [
  {
    name: "Chirag Dhruv",
    title: "President",
    image: "/images/team/board/chirag-dhruv.jpg",
  },
  {
    name: "Evan Marchman",
    title: "Treasurer",
    image: "/images/team/board/evan-marchman.jpg",
  },
  {
    name: "Oscar Fonseca",
    title: "Secretary",
    image: "/images/team/board/oscar-fonseca.jpg",
  },
  {
    name: "Scott Brondel",
    title: "Board Member",
    image: "/images/team/board/scott-brondel.jpg",
  },
  {
    name: "Peter Anzalone",
    title: "Board Member",
    image: "/images/team/board/peter-anzalone.jpg",
  },
  {
    name: "Amanda Merced",
    title: "Board Member",
    image: "/images/team/board/amanda-merced.jpg",
  },
  {
    name: "Andre Espada",
    title: "Board Member",
    image: "/images/team/board/andre-espada.jpg",
  },
  {
    name: "Leah Silen",
    title: "Board Member, Executive Director of Austin STEM Center",
    image: "/images/team/leah-silen.jpg",
  },
];

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
      { name: "Joseph Williams", title: "Technology Specialist", image: "/images/team/joseph-williams.jpg" },
      { name: "Zane Lewin", title: "Prototyping & Fabrication", image: "/images/team/zane-lewinASC.jpg" },
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
