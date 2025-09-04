
// src/app/page.tsx
"use client";

import { defaultBotpageData } from "@/lib/botpage-data-default";
import Demo2Layout from "./demo-2/layout";

export default function Home() {
  return (
      <Demo2Layout botpageData={defaultBotpageData}>
        <></>
      </Demo2Layout>
  );
}
