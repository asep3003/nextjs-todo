import React from "react";

export default function TodoCard(props) {
  const { children } = props;

  return (
    <div className="p-2 sm:p-3 border flex items-stretch border-white border-solid">
      <div className="flex-1">{children}</div>
      <div className="flex items-center">
        <i className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer" />
        <i className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer" />
      </div>
    </div>
  );
}
