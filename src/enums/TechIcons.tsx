import { type IconType } from "react-icons";
import { BiLogoPhp } from "react-icons/bi";
import {
  FaAngular,
  FaCss3,
  FaDatabase,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io";
import { RiNextjsLine } from "react-icons/ri";
import {
  SiCsharp,
  SiDocker,
  SiDotnet,
  SiGit,
  SiGraphql,
  SiJest,
  SiKubernetes,
  SiMongodb,
  SiRedux,
  SiStyledcomponents,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVisualbasic,
} from "react-icons/si";

import { type TechTypesKeys } from "./TechTypes";

export const TechIcons: Record<TechTypesKeys, IconType> = {
  Angular: FaAngular,
  CSharp: SiCsharp,
  Css: FaCss3,
  Docker: SiDocker,
  DotNet: SiDotnet,
  Git: SiGit,
  GraphQl: SiGraphql,
  Html: FaHtml5,
  IndexedDb: FaDatabase,
  Jest: SiJest,
  Js: IoLogoJavascript,
  Kubernetes: SiKubernetes,
  MongoDb: SiMongodb,
  MySql: GrMysql,
  NextJs: RiNextjsLine,
  NodeJs: FaNodeJs,
  Php: BiLogoPhp,
  React: FaReact,
  Redux: SiRedux,
  Rtl: SiTestinglibrary,
  StyledComponents: SiStyledcomponents,
  Tailwind: SiTailwindcss,
  Ts: SiTypescript,
  VisualBasic: SiVisualbasic,
};
