import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt =
  "Product design for founders who already shipped, by Ignacio Vergara";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "80px",
          backgroundColor: "#f9f4ed",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#00877f"
          }}
        >
          For Founders
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#242526"
          }}
        >
          {"You built with AI. That's real progress."}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 400,
            color: "#5f625f"
          }}
        >
          {siteConfig.name}, product designer
        </div>
      </div>
    ),
    size
  );
}
