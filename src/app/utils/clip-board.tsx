"use client";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function ClipboardCopy({ copyText }: any) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Bind our handler function to the onClick button property */}
      <div className="relative flex flex-row items-center justify-center gap-2">
        <input
          className="hidden px-8 py-2 rounded-md bg-slate-100"
          type="text"
          value={copyText}
          readOnly
        />
        <Copy
          onClick={() => handleCopyClick()}
          className="h-5 w-5 text-offwhite"
        />

        {isCopied && <div className="absolute top-[-1.5rem]">Copied!</div>}
      </div>
    </div>
  );
}
