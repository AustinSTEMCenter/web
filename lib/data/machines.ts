export type Machine = {
  name: string;
  slug: string;
  kind: string;
  facility: string; // slug from lib/data/facilities.ts
  tagline: string;
  whatItIs: string;
  whatItDoes: string[];
  tools?: { name: string; blurb: string }[];
  youCanMake: string[];
  facts?: { label: string; value: string }[];
  related?: string[];
  images?: { src: string; alt: string }[];
};

export const machines: Machine[] = [
  {
    name: "Full Spectrum PS48",
    slug: "ps48",
    kind: "CO₂ laser",
    facility: "machine-shop",
    tagline: "cuts with a beam of light",
    whatItIs:
      "The Full Spectrum PS48 is a large-format CO₂ laser cutter and engraver with a 48″ × 36″ bed — one of two big CO₂ lasers in our shop, with room to handle a half sheet of plywood in one go.",
    whatItDoes: [
      "A CO₂ laser works by focusing an invisible beam of infrared light into a point so small and so hot that it vaporizes material wherever it touches. A computer steers that point along a drawing with pinpoint precision — so anything you can draw on a screen, the PS48 can cut out or engrave, down to details finer than a pencil line.",
      "It cuts and engraves wood, acrylic, cardboard, leather, and fabric, and it can etch designs onto glass, stone, and coated metal. The one thing it can't do is cut through bare metal — light at this wavelength mostly bounces right off. That job belongs to our fiber laser, the BesCutter Cube 1313, across the shop.",
    ],
    youCanMake: [
      "Puzzles, signs, and nameplates",
      "Boxes that snap together from flat pieces with finger joints",
      "Photos engraved into wood or slate",
      "Architectural models and robot parts",
      "Ornaments, stencils, and one-of-a-kind gifts",
    ],
    facts: [
      { label: "Bed size", value: "48″ × 36″" },
      { label: "Cuts", value: "wood, acrylic, leather, fabric" },
      { label: "Engraves", value: "all that, plus glass & stone" },
      { label: "Can't cut", value: "bare metal — see the Cube 1313" },
    ],
    related: ["nova-51", "cube-1313"],
  },
  {
    name: "Thunder Laser Nova 51",
    slug: "nova-51",
    kind: "CO₂ laser",
    facility: "machine-shop",
    tagline: "our biggest CO₂ laser",
    whatItIs:
      "The Nova 51 is the biggest CO₂ laser in the shop, with a 51″ × 35″ bed and pass-through doors that let it take on material even longer than the machine itself.",
    whatItDoes: [
      "Like its neighbor the PS48, the Nova 51 cuts by focusing an invisible infrared beam into a point hot enough to vaporize material, steered by a computer along whatever you've drawn. Same physics, more room: the wider bed and pass-through doors make it the machine we reach for on big jobs and production runs.",
      "It cuts and engraves wood, acrylic, cardboard, leather, and fabric, and etches glass, stone, and coated metal. Bare metal is the one material it can't cut — for that, our fiber laser, the BesCutter Cube 1313, takes over.",
    ],
    youCanMake: [
      "Large signs cut and engraved in one piece",
      "Batch runs — a whole camp's worth of project kits at once",
      "Extra-long material fed through the pass-through doors",
      "Furniture-scale parts and templates",
      "Everything the PS48 makes, sized up",
    ],
    facts: [
      { label: "Bed size", value: "51″ × 35″" },
      { label: "Party trick", value: "pass-through doors" },
      { label: "Cuts", value: "wood, acrylic, leather, fabric" },
      { label: "Engraves", value: "all that, plus glass & stone" },
    ],
    related: ["ps48", "cube-1313"],
  },
  {
    name: "BesCutter Cube 1313",
    slug: "cube-1313",
    kind: "fiber laser",
    facility: "machine-shop",
    tagline: "a laser that cuts steel",
    whatItIs:
      "The BesCutter Cube 1313 is a fiber laser metal cutter with a 4′ × 4′ bed, sealed inside its own cabinet — the machine in our shop that cuts through solid metal.",
    whatItDoes: [
      "Where our CO₂ lasers mostly bounce off shiny metal, the Cube's fiber laser makes light at exactly the wavelength metal absorbs. Focused to a fine point, it slices through steel, stainless, and aluminum sheet in a shower of sparks — all safely behind enclosed doors while you watch.",
      "This is the same technology modern fabrication shops run every day: draw a part on a computer, and minutes later lift a finished metal piece off the bed. Parts cut here often head straight to the welding area to be joined into bigger builds.",
    ],
    youCanMake: [
      "Robot chassis plates and brackets",
      "Metal signs and wall art",
      "Tool holders and shop organizers",
      "Hardware for real repairs around the building",
      "Parts that get welded into go-karts, carts, and frames",
    ],
    facts: [
      { label: "Bed size", value: "4′ × 4′ (51″ × 51″)" },
      { label: "Cuts", value: "steel, stainless, aluminum" },
      { label: "Laser type", value: "enclosed fiber laser" },
      { label: "Next stop", value: "the welding area" },
    ],
    related: ["welding", "ps48", "nova-51"],
  },
  {
    name: "ShopSabre PRO 408",
    slug: "pro-408",
    kind: "CNC router",
    facility: "wood-shop",
    tagline: "carves full 4×8 sheets",
    whatItIs:
      "The ShopSabre PRO 408 is an industrial CNC router with a 4′ × 8′ table — big enough to swallow a full sheet of plywood. It lives in its own room off the wood shop, with a viewing window so you can watch it work.",
    whatItDoes: [
      "Unlike the lasers, the PRO 408 cuts with a spinning bit that moves in three dimensions — carving, drilling, and shaping wood, plastics, and foam. It follows designs students create in CAD, swaps its own tools mid-job from a 10-tool rack, and positions itself with an accuracy of about the thickness of a human hair.",
      "Because it carves in 3D rather than cutting flat outlines, it can shape curved surfaces, cut joinery, and mill parts a laser never could. Plenty of the fixtures in this building were cut on this machine.",
    ],
    youCanMake: [
      "Furniture and cabinets",
      "Longboards and guitars",
      "Big dimensional signs with carved lettering",
      "FIRST Robotics field elements",
      "Templates and jigs for wood shop projects",
    ],
    facts: [
      { label: "Table size", value: "4′ × 8′ — a full sheet" },
      { label: "Cuts", value: "wood, plastics, foam" },
      { label: "Tool changer", value: "swaps 10 bits automatically" },
      { label: "Where", value: "its own room, viewing window" },
    ],
    related: ["wood-shop"],
  },
  {
    name: "Haas VF-0E",
    slug: "vf-0e",
    kind: "CNC mill",
    facility: "machine-shop",
    tagline: "carves solid metal",
    whatItIs:
      "The Haas VF-0E is a CNC vertical machining center — a computer-controlled mill that carves finished parts out of solid blocks of metal. It's the heaviest-duty machine in our shop, built for the kind of precision manufacturing real factories run on.",
    whatItDoes: [
      "Where the fiber laser cuts flat shapes from sheet metal, the mill works in three dimensions: a cutting tool spinning at up to 7,500 RPM shaves away metal pass by pass until a solid block becomes a finished part — pockets, holes, threads, and curved surfaces included. It swaps between 20 tools automatically, picking the right one for each step of the job in about four seconds.",
      "Machines like this make the precision parts inside everything — cars, planes, robots, and other machines. Students design a part in CAD, and the mill carves it in aluminum or steel, accurate to a few thousandths of an inch.",
    ],
    youCanMake: [
      "Robot drivetrain parts and gearbox plates",
      "Precision brackets, mounts, and fixtures",
      "Molds for casting and vacuum forming",
      "Engine-style components with pockets and threads",
      "Parts too thick or complex for the lasers",
    ],
    facts: [
      { label: "Type", value: "vertical machining center" },
      { label: "Work envelope", value: "30″ × 16″ × 20″" },
      { label: "Spindle", value: "up to 7,500 RPM" },
      { label: "Tool changer", value: "swaps 20 tools automatically" },
    ],
    related: ["cube-1313", "welding"],
  },
  {
    name: "Welding Area",
    slug: "welding",
    kind: "laser welding",
    facility: "machine-shop",
    tagline: "welding with light",
    whatItIs:
      "The welding area is home to the xTool MetalFab, a 1,200-watt laser welder. Instead of the electric arc of traditional welding, it uses a focused beam of light to fuse metal parts into one solid piece.",
    whatItDoes: [
      "The handheld torch melts the edges of two metal parts together with a tightly focused laser, feeding filler wire automatically as it goes. It joins steel, stainless, aluminum, and brass with cleaner, faster seams and far less heat distortion than a traditional welder — a technique that's just now making its way into modern fabrication shops.",
      "It can also run in reverse: the same beam strips rust, paint, and coatings off metal to prep it for a perfect weld. And it pairs naturally with the fiber laser across the shop — cut your parts on the BesCutter Cube 1313, then weld them together here.",
    ],
    youCanMake: [
      "Frames, brackets, and stands",
      "Carts and go-kart structures",
      "Metal sculptures",
      "Robot builds held together by more than nuts and bolts",
      "Repairs that make broken things whole again",
    ],
    facts: [
      { label: "Machine", value: "xTool MetalFab laser welder" },
      { label: "Welds", value: "steel, stainless, aluminum, brass" },
      { label: "Bonus mode", value: "laser-cleans rust & paint" },
      { label: "Works with", value: "parts cut on the Cube 1313" },
    ],
    related: ["cube-1313"],
  },
  {
    name: "Wood Shop",
    slug: "wood-shop",
    kind: "the whole room",
    facility: "wood-shop",
    tagline: "sawdust and real tools",
    whatItIs:
      "The wood shop is where raw lumber becomes finished projects — a full fabrication space with the real tools professional woodworkers use, set up so learners can work with them safely.",
    whatItDoes: [
      "This is a working shop, not a display. Every tool here is the real thing, sized for real projects, and learners use them with training and supervision — the same way any professional shop runs.",
      "The biggest machine in the shop, the ShopSabre PRO 408 CNC router, gets a room and a page of its own.",
    ],
    tools: [
      { name: "Table saws", blurb: "rip boards to exact width along a spinning blade" },
      { name: "Miter saws", blurb: "precise crosscuts and clean angles for frames and joints" },
      { name: "Drill presses", blurb: "perfectly straight holes, exactly where you marked them" },
      { name: "Routers", blurb: "shaped edges, grooves, and joinery" },
      { name: "Spindle sanders", blurb: "smooth curves that hand-sanding can't reach" },
      {
        name: "Dust collection",
        blurb: "a shop-wide system that keeps the air clean while you work",
      },
    ],
    youCanMake: [
      "Boxes, shelves, and small furniture",
      "Picture frames with tight miter joints",
      "Race cars, toys, and games",
      "Parts and props for robotics and camp projects",
      "Anything you can measure twice and cut once",
    ],
    related: ["pro-408"],
  },
];

export const getMachine = (slug: string) => machines.find((m) => m.slug === slug);
