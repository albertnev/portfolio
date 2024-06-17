import { ImageGallery } from "@/components/ImageGallery";
import { SectionWrapper } from "@/components/SectionWrapper";
import { hobbiesCollections } from "@/data";

const Hobbies = () => {
  return (
    <SectionWrapper id="hobbies" title="Hobbies" className="">
      <div className="flex flex-col space-y-5">
        <p>
          I have lots of hobbies that keep me entertained through the day. Some
          of the most important are <span className="font-bold">sports</span>,
          as I like to workout, bouldering, and playing padel and ping-pong, and{" "}
          <span className="font-bold">music</span> is also an important part of
          my life.
        </p>
        <p>
          However,{" "}
          <span className="font-bold">
            I'm pretty proud of my more artistic side
          </span>
          , which is related with the 3D world. Currently, I'm learning how to
          model my own action figures, and I love 3D printing cool figures and
          painting them. With that introduction,{" "}
          <span className="font-bold">
            let me show off a bit some of my recent projects
          </span>
          :
        </p>
      </div>
      <ImageGallery collections={hobbiesCollections} className="mt-5" />
    </SectionWrapper>
  );
};

export default Hobbies;
