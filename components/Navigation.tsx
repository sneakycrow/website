import Link from "next/link";
import { default as cx } from "classnames";

const links = [
  {
    copy: "blog",
    url: "/blog",
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
          className="text-4xl my-4 text-center active:text-green-550 hover:text-green-550"
        >
          <span className="text-2xl font-extrabold">
            <span className="relative text-black block">{link.copy}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
