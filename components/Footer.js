import React from "react";

export default function Footer() {
  return (
    <div className="flex justify-center items-center gap-8 py-3">
      <a href="#" target="_blank">
        <i className="fa-brands fa-instagram duration-300 hover:opacity-30 cursor-pointer" />
      </a>
      <a href="#" target="_blank">
        <i className="fa-brands fa-linkedin duration-300 hover:opacity-30 cursor-pointer" />
      </a>
      <a href="#" target="_blank">
        <i className="fa-brands fa-github-alt duration-300 hover:opacity-30 cursor-pointer" />
      </a>
    </div>
  );
}
