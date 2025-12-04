"use client";

import React from "react";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function Modal({ show, setShow, children }: Props) {
  return (
    <div className="absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-xs">
      {children}
    </div>
  );
}
