import React from "react";
import { Snippet as NSnippet } from "@nextui-org/react";

export default function Snippet({ text }: { text: string }) {
  return <NSnippet>{text}</NSnippet>;
}
