import { HashScroll } from "@/components/HashScroll";
import { Header } from "@/components/Header";
import { About } from "@/sections/About";
import { Education } from "@/sections/Education";
import { Hobbies } from "@/sections/Hobbies";
import { Skillset } from "@/sections/Skillset";
import { WorkExperience } from "@/sections/WorkExperience";

const Home: React.FC = () => {
  return (
    <>
      <HashScroll />
      <Header className="half-screen" />
      <main className="half-screen">
        <About />
        <Skillset />
        <WorkExperience />
        <Education />
        <Hobbies />
      </main>
    </>
  );
};

export default Home;
