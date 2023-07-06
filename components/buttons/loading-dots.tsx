import { signIn } from "next-auth/react";
import { useState, ReactNode } from "react";
import { LoadingDots } from "@/components/shared/icons";

export default function LoadingButton({
  children,
  provider,
}: {
  children: ReactNode;
  provider: string;
}) {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <button
      disabled={signInClicked}
      className={`${
        signInClicked
          ? "cursor-not-allowed border-gray-200 bg-gray-100"
          : "border border-gray-200 bg-white text-black hover:bg-gray-50"
      } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
      onClick={() => {
        setSignInClicked(true);
        signIn(provider);
      }}
    >
      {signInClicked ? <LoadingDots color="#808080" /> : <>{children}</>}
    </button>
  );
}
