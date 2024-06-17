"use client";

import { FCProps } from "@/types/FCProps";
import { clsx } from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface ImageGalleryProps extends FCProps {
  collections: {
    series: string;
    title: string;
    images: {
      src: string;
      description: string;
    }[];
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

          return (
            <li
              key={`collection-${collection.title}`}
              className="group relative overflow-hidden aspect-square rounded-lg cursor-pointer"
              onClick={() => setShownCollection(collection.images)}
            >
              <Image
                className="object-cover"
                width={500}
                height={500}
                src={lastImage.src}
                alt={lastImage.description}
                title={lastImage.description}
              />
              <div className="absolute h-full w-full top-0 right-0 invisible group-hover:visible flex flex-col justify-center items-center bg-slate-900/50 backdrop-blur-sm text-white text-center">
                <span className="font-bold">{collection.series}</span>
                <span>{collection.title}</span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Popup img gallery */}
      {!!shownCollection && (
        <div
          className={clsx(
            "fixed h-screen w-screen top-0 left-0 z-40 bg-slate-900/80 backdrop-blur-sm",
          )}
        >
          <FaTimes
            className="absolute top-10 right-10 text-2xl z-50 cursor-pointer text-white"
            onClick={() => setShownCollection(undefined)}
            title="Close gallery"
          />
          <div className="relative flex items-center justify-center h-full w-full">
            <ul>
              {shownCollection?.map((img, i) => {
                return (
                  <li
                    key={img.src}
                    className={clsx("overflow-hidden rounded-lg", {
                      block: i === shownImg,
                      hidden: i !== shownImg,
                    })}
                  >
                    <Image
                      className="object-cover"
                      width={500}
                      height={500}
                      src={img.src}
                      alt={img.description}
                      title={img.description}
                    />
                  </li>
                );
              })}
            </ul>
            {!!shownImg && (
              <FaArrowLeft
                className="absolute text-3xl top-auto bottom-auto lg:left-1/4 cursor-pointer"
                onClick={() => {
                  changeShownImg((shownImg || 0) - 1);
                }}
                title="Previous image"
              />
            )}
            {shownImg < shownCollection.length - 1 && (
              <FaArrowRight
                className="absolute text-3xl top-auto bottom-auto lg:right-1/4 cursor-pointer"
                onClick={() => {
                  changeShownImg((shownImg || 0) + 1);
                }}
                title="Next image"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
