import Link from "next/link";
import { default as cx } from "classnames";

const links = [
  {
    copy: "blog",
    url: "/blog",
  },
  {
    copy: "games",
    url: "/games",
  },
  {
    copy: "email me",
    url: "mailto:zach@sneakycrow.dev",
  },
];

interface NavigationProps {
  className?: string;
}

const Navigation = (props: NavigationProps) => {
  const wrapperClass = cx(
    "p-6 bg-white flex flex-col justify-between items-center",
    props.className ?? ""
  );

  return (
    <div className={wrapperClass}>
      {links.map((link) => (
        <Link
          key={link.copy}
          href={link.url}
          className="text-4xl my-4 text-center"
        >
          <span className="text-2xl before:transition-all before:block before:-inset-x-1.5 before:bg-green-550 before:absolute before:w-0 before:h-14 before:skew-x-12 hover:before:w-full relative inline-block font-bold leading-[4.2rem]">
            <span className="relative text-black block">{link.copy}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;