import { type TechTypesKeys } from "@/enums/TechTypes";
import { type EducationItemDto } from "@/types/EducationItemDto";
import { type WorkExperienceItemDto } from "@/types/WorkExperienceItemDto";

export const workExperienceItems: WorkExperienceItemDto[] = [
  {
    company: "Mimacom",
    description:
      "Development of a CV web assistant using React and Redux with persistent data, where I created a custom templating processor. I also created from scratch a banking intranet to manage their transactions and orders, using RTKQ for caching purposes.",
    devops: "Automated unit-tests with CI in Gitlab.",
    jobTitle: "Senior Frontend Engineer",
    milestones:
      "Training and guiding people I was in charge of. Creating scalable projects from scratch with the ability to adapt to unexpected changes.",
    projectManagement: "Multidisciplinary teams applying SCRUM framework.",
    techStack: [
      "Html",
      "Css",
      "Js",
      "React",
      "Redux",
      "StyledComponents",
      "Jest",
      "Rtl",
      "Docker",
    ],
    yearStart: 2021,
  },
  {
    company: "(NDA)",
    description:
      "Development of a project using NextJS to help the businesses reduce their non-attendance ratio in their reservations.",
    jobTitle: "Senior Frontend Engineer",
    milestones: "Quick learning curve for a big and complex project.",
    projectManagement: "Weekly sprint-based workflow using Kanban.",
    techStack: ["Html", "Css", "Js", "React", "Redux", "NextJs"],
    yearEnd: 2022,
    yearStart: 2022,
  },
  {
    company: "Pasiona & Travelport",
    description:
      "Development and maintenance of a cloud application for a leading worldwide travel retail company, migrating some desktop functionalities and creating new features, both in frontend with ReactJS and in backend microservices with NodeJS and GraphQL.",
    devops: "TBD with feature flags and CI/CD in multiple environments.",
    jobTitle: "Frontend Developer",
    milestones:
      "Quick learning curve for an extremely complex project, becoming a key point of reference for the team within a short period of time.",
    projectManagement:
      "International multidisciplinary teams applying SAFe framework. Periodic PI plannings with strict dependency management between features.",
    techStack: [
      "Html",
      "Css",
      "Js",
      "React",
      "Redux",
      "Jest",
      "Rtl",
      "NodeJs",
      "GraphQl",
      "Kubernetes",
      "CSharp",
      "DotNet",
    ],
    yearEnd: 2021,
    yearStart: 2017,
  },
  {
    company: "ERIC Sports",
    description:
      "Development of a sports video analysis software in the cloud, migrating an existing desktop application to the web using HTML5, CSS3 and JS, as well as creating different related products with Angular and using IndexedDB and cache to download and keep data in the local device to work offline, syncing with the server when the connection was available again.",
    jobTitle: "Fullstack Developer",
    milestones:
      "Applied yet-experimental browser features to create offline web-apps, with versioning, updating and syncing processes.",
    techStack: [
      "Html",
      "Css",
      "Js",
      "Php",
      "MySql",
      "Angular",
      "IndexedDb",
      "VisualBasic",
      "DotNet",
    ],
    yearEnd: 2017,
    yearStart: 2014,
  },
  {
    company: "1d3a Analógico y Digital",
    description:
      "Design, development and maintenance of all the web-related products, such as webpage, client management dashboards, mailings, marketing events, as well as server configuration, maintenance and database setup and management.",
    jobTitle: "Fullstack Developer",
    milestones:
      "Management and configuration of CentOs servers, providing service to hundreds of our clients concurrently hosting all of our applications, and configuring external scalable drives to add a layer of security.",
    techStack: ["Html", "Css", "Js", "Php", "MySql"],
    yearEnd: 2014,
    yearStart: 2010,
  },
];

export const educationItems: EducationItemDto[] = [
  {
    school: "Universitat Oberta de Catalunya",
    title: "Multimedia Engineering degree",
    yearEnd: 2017,
    yearStart: 2012,
  },
  {
    school: "LaSalle Gràcia",
    title: "Certificate of Higher Education (Software development)",
    yearEnd: 2011,
    yearStart: 2009,
  },
  {
    school: "LaSalle Gràcia",
    title: "General Certificate of Education",
    yearEnd: 2010,
    yearStart: 2007,
  },
];

export const skillsets: {
  level: number;
  skill: TechTypesKeys;
}[] = [
  {
    level: 5,
    skill: "Js",
  },
  {
    level: 5,
    skill: "React",
  },
  {
    level: 5,
    skill: "Html",
  },
  {
    level: 5,
    skill: "Css",
  },
  {
    level: 5,
    skill: "Jest",
  },
  {
    level: 5,
    skill: "Rtl",
  },
  {
    level: 4,
    skill: "Redux",
  },
  {
    level: 4,
    skill: "StyledComponents",
  },
  {
    level: 4,
    skill: "Git",
  },
  {
    level: 3,
    skill: "Tailwind",
  },
  {
    level: 3,
    skill: "NextJs",
  },
  {
    level: 3,
    skill: "NodeJs",
  },
  {
    level: 2,
    skill: "DotNet",
  },
  {
    level: 2,
    skill: "MongoDb",
  },
  {
    level: 2,
    skill: "MySql",
  },
];

export const hobbiesCollections = [
  {
    images: [
      {
        description: "Armored Titan - Print and assembly",
        src: "/images/aot-1.png",
      },
      {
        description: "Armored Titan - Painting process",
        src: "/images/aot-2.png",
      },
      {
        description: "Armored Titan - Final result",
        src: "/images/aot-3.png",
      },
    ],
    series: "Attack on Titan",
    title: "Armored Titan",
  },
  {
    images: [
      {
        description: "Gengar Family - Print and assembly",
        src: "/images/gengar-1.png",
      },
      {
        description: "Gengar Family - Final result",
        src: "/images/gengar-2.png",
      },
    ],
    series: "Pokémon",
    title: "Gengar Family",
  },
  {
    images: [
      {
        description: "Majora's Mask - Print and assembly",
        src: "/images/mask-1.png",
      },
      {
        description: "Majora's Mask - Painting process",
        src: "/images/mask-2.png",
      },
      {
        description: "Majora's Mask - Final result",
        src: "/images/mask-3.png",
      },
    ],
    series: "Legend of Zelda",
    title: "Majora's Mask",
  },
  {
    images: [
      {
        description: "Giga Bowser - Final result",
        src: "/images/bowser-1.png",
      },
      {
        description: "Giga Bowser - Drool detail",
        src: "/images/bowser-2.png",
      },
    ],
    series: "DnD & Mario",
    title: "Giga Bowser",
  },
  {
    images: [
      {
        description: "Tai & Agumon - Print and assembly",
        src: "/images/digimon-1.png",
      },
      {
        description: "Tai & Agumon - Final result",
        src: "/images/digimon-2.png",
      },
    ],
    series: "Digimon",
    title: "Tai & Agumon",
  },
  {
    images: [
      {
        description: "Growlithe - Assembly and painting process",
        src: "/images/growlithe-1.png",
      },
      {
        description: "Growlithe - Final result",
        src: "/images/growlithe-2.png",
      },
    ],
    series: "Pokémon",
    title: "Growlithe",
  },
  {
    images: [
      {
        description: "Kero - Assembly and painting process",
        src: "/images/kero-1.png",
      },
      {
        description: "Kero - Final result",
        src: "/images/kero-2.png",
      },
    ],
    series: "Sakura",
    title: "Kero",
  },
];
