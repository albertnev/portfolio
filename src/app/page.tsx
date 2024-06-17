import { HashScroll } from "@/components/HashScroll";
import { About } from "@/sections/About";
import { Education } from "@/sections/Education";
import { Header } from "@/sections/Header";
import { Hobbies } from "@/sections/Hobbies";
import { Skillset } from "@/sections/Skillset";
import { WorkExperience } from "@/sections/WorkExperience";

const Home: React.FC = () => {
  return (
    <div className="relative z-10 lg:flex lg:justify-between lg:gap-8 p-4 md:p-12 lg:p-24 lg:py-0 max-w-screen-xl min-h-screen mx-auto">
      <HashScroll />
      <Header className="py-24 lg:w-1/2 max-h-screen lg:sticky lg:top-0" />
      <main className="lg:w-1/2 lg:mb-24">
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
