
// src/app/page.tsx
"use client";

import { botpageData } from "@/lib/botpage-data";
import Demo2Layout from "./demo-2/layout";

export default function Home() {
  const { primaryColorHsl, backgroundColorHsl } = botpageData.appearance;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary-dynamic: ${primaryColorHsl};
              --background-dynamic: ${backgroundColorHsl};
            }
          `,
        }}
      />
      <Demo2Layout>
        <></>
      </Demo2Layout>
    </>
  );
}
