import Image from "next/image";
import React from "react";
import Link from "next/link";
import { default as cx } from "classnames";

interface HeroProps {
  imageURL?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const Hero = (props: HeroProps) => {
  const {
    imageURL = "/logo_v2.svg",
    title = "Sneaky Crow",
    subtitle = "software wizard ",
  } = props;

  const wrapperClass = cx(
    "p-6 bg-white grid grid-flow-row md:grid-flow-col justify-center",
    props.className
  );
  return (
    <div className={wrapperClass}>
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
        <h1 className="w-full text-lg lg:text-3xl text-center lg:text-left">
          {title}
        </h1>
        <h2 className="w-full text-base lg:text-2xl leading-13 text-center lg:text-left">
          {subtitle}
        </h2>
      </div>
    </div>
  );
};

export default Hero;
