import { HashScroll } from "@/components/HashScroll";
import { About } from "@/sections/About";
import { Education } from "@/sections/Education";
import { Header } from "@/sections/Header";
import { Hobbies } from "@/sections/Hobbies";
import { Skillset } from "@/sections/Skillset";
import { WorkExperience } from "@/sections/WorkExperience";

const Home: React.FC = () => {
  return (
    <div className="relative z-10 px-8 max-w-screen-xl min-h-screen mx-auto pb-24 sm:px-24 md:p-12 md:py-0 md:flex md:justify-between lg:p-24 lg:py-0 md:gap-8">
      <HashScroll />
      <Header className="md:w-1/2 md:pb-12 lg:pb-24" />
      <main className="md:w-1/2 md:pb-12 lg:pb-24">
        <About />
        <Skillset />
        <WorkExperience />
        <Education />
        <Hobbies />
      </main>
    </div>
  );
};

export default Home;
