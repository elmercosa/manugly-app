"use client";
import { useState } from "react";

import BusinessCreator from "./creator";
import BusinessSelector from "./selector";

export default function SelectorWrapper({ user }: { user: any }) {
  const businesses = user.businesses ? Object.values(user.businesses) : [];
  // const businesses = [];
  const [isOpen, setIsOpen] = useState(businesses.length ? true : false);
  return (
    <>
      {isOpen ? (
        <BusinessSelector user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <></>
      )}
    </>
  );
}
