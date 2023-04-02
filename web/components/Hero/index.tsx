import Image from "next/image";
import React from "react";
import Link from "next/link";
import "./Hero.css";

interface HeroProps {
  imageURL?: string;
  title?: string;
  subtitle?: string;
}

const Index = (props: HeroProps) => {
  const {
    imageURL = "/logo_v2.svg",
    title = "Sneaky Crow",
    subtitle = "software wizard ",
  } = props;
  return (
    <div className="p-6 bg-white flex w-full">
      <Link href="/" className="inline-flex justify-center">
        <Image alt="" src={imageURL} width={200} height={200} />
      </Link>
      <div className="flex flex-col justify-center items-start font-extrabold">
        <h1 className="title">{title}</h1>
        <h2 className="text-2xl leading-13">{subtitle}</h2>
      </div>
    </div>
  );
};

export default Index;
