import { clsx } from "clsx";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { LoadingSpinner } from "../LoadingSpinner";

const ImageWithLoader: React.FC<ImageProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={clsx({ "relative animate-pulse bg-cyan-700/20": isLoading })}
    >
      {isLoading ? (
        <LoadingSpinner
          accessibleDescription={`Loading image ${props.title ?? ""}`.trim()}
        />
      ) : null}
      <Image
        {...props}
        onLoad={(ev) => {
          setIsLoading(false);
          props.onLoad?.(ev);
        }}
      />
    </div>
  );
};

export default ImageWithLoader;
