import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  height: 32,
  width: 32,
};
export const contentType = "image/png";

// Image generation
const Icon = () => {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          alignItems: "center",
          background: "#334155",
          borderRadius: "6px",
          color: "white",
          display: "flex",
          fontSize: "22px",
          fontWeight: "bold",
          height: "100%",
          justifyContent: "center",
          padding: "4px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            border: "1px solid white",
            borderRadius: "4px",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              background: "#334155",
              display: "flex",
              fontWeight: "bold",
              left: "8px",
              paddingRight: "4px",
              position: "relative",
            }}
          >
            A
          </span>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  );
};

export default Icon;
