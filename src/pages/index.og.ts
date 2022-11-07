import satori from "satori";
import { html } from "satori-html";
import { readFileSync } from "fs";
import type { APIRoute } from "astro";
import sharp from "sharp";

export const get: APIRoute = async () => {
  const fontFilePath = `${process.cwd()}/public/fonts/Optimistic_Display_Bold.ttf`;
  const fontFile = readFileSync(fontFilePath);
  const markup = html` <div
    style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(223, 236, 232); font-size: 32px; font-weight: 600;"
  >
    <img
      width="249"
      height="321"
      src="https://rumaan.dev/me-og.png"
      style="height: 190px; width: 190px; object-fit: contain;"
    />
    <div
      style="font-size: 70px; margin-top: 38px; display: flex; flex-direction: column; color: rgb(4, 47, 33);"
    >
      <span
        >Hey, I'm
        <span style="margin-left:15ch;color: rgb(32, 151, 112);"
          >Rumaan</span
        ></span
      >
    </div>
  </div>`;
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Optimistic Display",
        data: fontFile,
        style: "normal",
      },
    ],
  });

  const png = sharp(Buffer.from(svg)).png();
  const response = await png.toBuffer();

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
    },
  });
};
