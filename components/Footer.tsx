import Link from "next/link";
import cx from "classnames";

const subnavLinks: { url: string; copy: string; rel?: string }[] = [
  {
    copy: "github",
    url: "https://github.com/sneakycrow",
  },
  {
    copy: "resume",
    url: "/resume.pdf",
  },
  {
    copy: "mastadon",
    url: "https://cybre.gg/@ctrlsquid",
    rel: "me",
  },
];

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  const wrapperClass = cx(
    "bg-white p-4 w-full flex flex-col justify-evenly xl:flex-row items-center",
    props.className
  );
  return (
    <footer className={wrapperClass}>
      {subnavLinks.map((link, index) => (
        <Link
          href={link.url}
          {...link}
          className="text-2xl font-bold text-green-550 opacity-50 hover:opacity-100 transition-opacity"
          key={`footer-link-${index}`}
        >
          {link.copy}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
