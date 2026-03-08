import React, { useEffect } from "react";

const CodeCopyButton = () => {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll(".prose pre");

    codeBlocks.forEach((block) => {
      if (block.querySelector(".copy-button")) return;

      const wrapper = block as HTMLElement;
      wrapper.style.position = "relative";

      const button = document.createElement("button");
      button.className = "copy-button";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code to clipboard");

      button.addEventListener("click", async () => {
        const code = block.querySelector("code");
        if (code) {
          await navigator.clipboard.writeText(code.textContent || "");
          button.textContent = "Copied!";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 2000);
        }
      });

      block.appendChild(button);
    });
  }, []);

  return null;
};

export default CodeCopyButton;
