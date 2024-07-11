"use client";

import { SectionWrapper } from "@/components/SectionWrapper";

const About = () => {
  return (
    <SectionWrapper id="about" title="About">
      <div className="flex flex-col space-y-5">
        <p>
          My interest in programming began when I was 17 years old, and a year
          later I was fully immersed in it. Since then, I've been able to create
          some pretty interesting applications for the different projects I've
          worked in,{" "}
          <span className="font-bold">growing and evolving everyday</span> as
          technology added new features that allowed me to expand the amount of
          things I could transfer from my imagination to the screen.
        </p>
        <p>
          <span className="font-bold">
            Learning new things and sharing my knowledge
          </span>{" "}
          are some of my passions, and that's one of the reasons I'm considered
          a <span className="font-bold">very fast-learner</span>, able to adapt
          easily to the different scenarios I find, not only at work, but also
          in my personal life.
        </p>
        <p>
          When I'm not coding, you may find me at the gym, doing some sports,{" "}
          <span className="font-bold">
            waiting patiently for Hollow Knight: Silksong to be finally released
          </span>
          , or messing with 3D sculpting, 3D printing and painting whatever I
          have been printing previously.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default About;
