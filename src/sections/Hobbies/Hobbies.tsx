import { ImageGallery } from "@/components/ImageGallery";
import { SectionWrapper } from "@/components/SectionWrapper";
import { hobbiesCollections } from "@/data";

const Hobbies = () => {
  return (
    <SectionWrapper id="hobbies" title="Hobbies">
      <div className="flex flex-col space-y-5">
        <p>
          I have lots of hobbies that keep me busy throughout the day. Some of
          the most important ones are <span className="font-bold">sports</span>,
          as I like to work out, bouldering, and playing padel and ping-pong.{" "}
          <span className="font-bold">Music</span> is also an important part of
          my life.
        </p>
        <p>
          However,{" "}
          <span className="font-bold">
            I'm pretty proud of my more artistic side
          </span>
          , which is related to the 3D world. Currently, I'm learning how to
          model my own action figures, and I love 3D printing cool figures and
          painting them. That being said,{" "}
          <span className="font-bold">
            let me show some of my recent projects off
          </span>
          :
        </p>
      </div>
      <ImageGallery className="mt-5" collections={hobbiesCollections} />
    </SectionWrapper>
  );
};

export default Hobbies;
