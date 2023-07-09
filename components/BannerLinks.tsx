import Link from "next/link";
import cx from "classnames";
import {
  IconBrandGithub,
  IconBrandMastodon,
  IconTie,
} from "@tabler/icons-react";
import { ReactNode } from "react";

export type BannerLink = {
  url: string;
  copy: string;
  rel?: string;
  icon: ReactNode;
};

const ICON_SIZE = 48;
const defaultLinks: BannerLink[] = [
  {
    copy: "github",
    url: "https://github.com/sneakycrow",
    icon: <IconBrandGithub size={ICON_SIZE} />,
  },
  {
    copy: "resume",
    url: "/resume.pdf",
    icon: <IconTie size={ICON_SIZE} />,
  },
  {
    copy: "mastodon",
    url: "https://cybre.gg/@squid",
    rel: "me",
    icon: <IconBrandMastodon size={ICON_SIZE} />,
  },
];

interface FooterProps {
  className?: string;
  links?: BannerLink[];
}

const BannerLinks = ({ links = defaultLinks, className }: FooterProps) => {
  const wrapperClass = cx(
    "bg-white p-4 w-full flex flex-col justify-evenly xl:flex-row items-center",
    className
  );
  return (
    <footer className={wrapperClass}>
      {links.map((link, index) => (
        <Link
          href={link.url}
          {...link}
          className="text-xl font-bold text-green-550 opacity-50 hover:opacity-100 transition-opacity"
          key={`footer-link-${index}`}
        >
          <span className="flex flex-row items-center">
            {link.icon}
            <span className="ml-2">{link.copy}</span>
          </span>
        </Link>
      ))}
    </footer>
  );
};

export default BannerLinks;
