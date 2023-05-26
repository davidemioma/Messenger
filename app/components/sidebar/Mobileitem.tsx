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

const Mobileitem = ({ label, href, Icon, active, onClick }: Props) => {
  const onClickHandler = () => {
    if (onClick) return onClick();
  };

  return (
    <Link
      className={`group flex items-center justify-center w-full p-4 text-sm font-semibold leading-6 hover:bg-gray-100 hover:text-black ${
        active ? "bg-gray-100 text-black" : "text-gray-500"
      }`}
      onClick={onClickHandler}
      href={href}
    >
      <Icon classname="shrink-0" size={24} />
    </Link>
  );
};

export default Mobileitem;
