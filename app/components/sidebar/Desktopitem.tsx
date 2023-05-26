"use client";

import React from "react";
import Link from "next/link";

interface Props {
  label: string;
  href: string;
  Icon?: any;
  active?: boolean;
  onClick?: () => void;
}

const Desktopitem = ({ label, href, Icon, active, onClick }: Props) => {
  const onClickHandler = () => {
    if (onClick) return onClick();
  };

  return (
    <li className="w-full" onClick={onClickHandler}>
      <Link
        href={href}
        className={`group flex items-center gap-3 text-sm p-3 font-semibold leading-6 hover:bg-gray-100 hover:text-black ${
          active ? "bg-gray-100 text-black" : "text-gray-500"
        }`}
      >
        <Icon classname="w-6 h-6 shrink-0" />

        <span>{label}</span>
      </Link>
    </li>
  );
};

export default Desktopitem;
