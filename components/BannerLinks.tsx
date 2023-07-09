import Link from "next/link";
import cx from "classnames";
import {
  IconBrandGithub,
  IconBrandMastodon,
  IconTie,
} from "@tabler/icons-react";
import { ReactNode } from "react";

const iconProps = {
  size: 48,
};
const subnavLinks: {
  url: string;
  copy: string;
  rel?: string;
  icon?: ReactNode;
}[] = [
  {
    copy: "github",
    url: "https://github.com/sneakycrow",
    icon: <IconBrandGithub {...iconProps} />,
  },
  {
    copy: "resume",
    url: "/resume.pdf",
    icon: <IconTie {...iconProps} />,
  },
  {
    copy: "mastodon",
    url: "https://cybre.gg/@squid",
    rel: "me",
    icon: <IconBrandMastodon {...iconProps} />,
  },
];

interface FooterProps {
  className?: string;
}

const BannerLinks = (props: FooterProps) => {
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
          className="text-xl font-bold text-green-550 opacity-50 hover:opacity-100 transition-opacity"
          key={`footer-link-${index}`}
        >
          {link.icon ? (
            <span className="flex flex-row items-center">
              {link.icon}
              <span className="ml-2">{link.copy}</span>
            </span>
          ) : (
            <span>{link.copy}</span>
          )}
        </Link>
      ))}
    </footer>
  );
};

export default BannerLinks;
