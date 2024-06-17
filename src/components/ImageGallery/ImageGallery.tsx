"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { type FCProps } from "@/types/FCProps";
import { handleAccessibleKeyPress } from "@/utils/handleAccessibleKeyPress";

interface ImageGalleryProps extends FCProps {
  collections: {
    images: {
      description: string;
      src: string;
    }[];
    series: string;
    title: string;
  }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  className = "",
  collections,
}) => {
  const [shownCollection, setShownCollection] = useState<
    ImageGalleryProps["collections"][0]["images"] | undefined
  >();
  const [shownImg, setShownImg] = useState<number>(0);

  const changeShownImg = useCallback(
    (targetImg: number) => {
      if (!shownCollection || targetImg < 0) {
        setShownImg(0);
        return;
      }

      if (targetImg >= shownCollection.length) {
        setShownImg(shownCollection.length - 1);
        return;
      }

      setShownImg(targetImg);
    },
    [shownCollection],
  );

  useEffect(() => {
    setShownImg(0);
  }, [shownCollection]);

  return (
    <>
      <ul
        className={`grid grid-cols-2 md:grid-cols-3 gap-4 select-none ${className}`}
      >
        {collections.map((collection) => {
          const lastImage = collection.images.at(-1);

          if (!lastImage) {
            return null;
          }

          const setShownCollectionCurrent = () => {
            setShownCollection(collection.images);
          };

          return (
            <li key={`collection-${collection.title}`}>
              <div
                className="group relative overflow-hidden aspect-square rounded-lg cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={setShownCollectionCurrent}
                onKeyDown={(e) =>
                  handleAccessibleKeyPress(e, setShownCollectionCurrent)
                }
              >
                <Image
                  alt={lastImage.description}
                  className="object-cover"
                  height={500}
                  src={lastImage.src}
                  title={lastImage.description}
                  width={500}
                />
                <div className="absolute h-full w-full top-0 right-0 invisible group-hover:visible flex flex-col justify-center items-center bg-slate-900/50 backdrop-blur-sm text-white text-center">
                  <span className="font-bold">{collection.series}</span>
                  <span>{collection.title}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Popup img gallery */}
      {!!shownCollection && (
        <div
          className={clsx(
            "z-50 fixed h-screen w-screen top-0 left-0 bg-slate-900/80 backdrop-blur-sm",
          )}
        >
          <FaTimes
            className="absolute top-10 right-10 text-2xl z-50 cursor-pointer text-white"
            title="Close gallery"
            onClick={() => {
              setShownCollection(undefined);
            }}
          />
          <div className="relative flex items-center justify-center h-full w-full">
            <ul className="max-w-[80%]">
              {shownCollection.map((img, i) => {
                return (
                  <li
                    key={img.src}
                    className={clsx("overflow-hidden rounded-lg", {
                      block: i === shownImg,
                      hidden: i !== shownImg,
                    })}
                  >
                    <Image
                      alt={img.description}
                      className="object-cover"
                      height={500}
                      src={img.src}
                      title={img.description}
                      width={500}
                    />
                  </li>
                );
              })}
            </ul>
            {!!shownImg && (
              <button
                className="group absolute text-2xl top-auto bottom-auto left-10 p-2 rounded-md  cursor-pointer flex items-center justify-center bg-cyan-700/50 backdrop-blur-sm md:left-20 lg:left-1/4"
                title="Previous image"
                type="button"
                onClick={() => {
                  changeShownImg((shownImg || 0) - 1);
                }}
              >
                <FaArrowLeft className="relative right-0 transition-all duration-300 group-hover:right-2" />
              </button>
            )}
            {shownImg < shownCollection.length - 1 && (
              <button
                className="group absolute text-2xl top-auto bottom-auto right-10 p-2 rounded-md cursor-pointer flex items-center justify-center bg-cyan-700/50 backdrop-blur-sm md:right-20 lg:right-1/4"
                title="Next image"
                type="button"
                onClick={() => {
                  changeShownImg((shownImg || 0) + 1);
                }}
              >
                <FaArrowRight className="relative left-0 transition-all duration-300 group-hover:left-2" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
