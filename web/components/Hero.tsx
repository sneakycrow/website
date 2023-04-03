import Image from "next/image";
import React from "react";
import Link from "next/link";

interface HeroProps {
  imageURL?: string;
  title?: string;
  subtitle?: string;
}

const Hero = (props: HeroProps) => {
  const {
    imageURL = "/logo_v2.svg",
    title = "Sneaky Crow",
    subtitle = "software wizard ",
  } = props;
  return (
    <div className="p-6 bg-white grid grid-flow-row md:grid-flow-col justify-center">
      <Link
        href="/"
        className="inline-flex justify-self-center md:justify-self-end min-w-3/4"
      >
        <Image
          alt=""
          src={imageURL}
          width={200}
          height={200}
          className="min-w-[200px]"
        />
      </Link>
      <div className="flex flex-col justify-center items-center font-extrabold">
        <h1 className="w-full text-3xl text-left">{title}</h1>
        <h2 className="w-full text-2xl leading-13 text-left">{subtitle}</h2>
      </div>
    </div>
  );
};

export default Hero;
