import Link from "next/link";

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

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 w-full flex flex-col justify-evenly xl:flex-row items-center">
      {subnavLinks.map((link, index) => (
        <Link
          href={link.url}
          {...link}
          className="text-2xl font-bold text-green-550 opacity-75 hover:opacity-100 transition-opacity"
          key={`footer-link-${index}`}
        >
          {link.copy}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
