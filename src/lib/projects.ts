export type Project = {
  name: string;
  description: string;
  website: string;
  borderColor: string;
  textColor: string;
  icon?: string;
};

export const projects: Project[] = [
  {
    name: "email",
    description: "the best means of contacting me",
    website: "mailto:zach@sneakycrow.dev",
    borderColor: "border-orange-500",
    textColor: "text-orange-500",
    icon: "mingcute:send-line"
  },
  {
    name: "resume",
    description: "my implicit human value confined to a single-page document",
    website: "/resume.pdf",
    borderColor: "border-red-500",
    textColor: "text-red-500",
    icon: "tabler:id"
  },
  {
    name: "github",
    description: "where most of my projects live",
    website: "https://github.com/sneakycrow",
    borderColor: "border-gray-500",
    textColor: "border-gray-500",
    icon: "prime:github"
  },
  {
    name: "cobrashare",
    description: "file-sharing platform for 3D artists",
    website: "https://cobrashare.net",
    borderColor: "border-green-500",
    textColor: "text-green-500"
  },
  {
    name: "bluesky",
    description: "intimate discussions with the void",
    website: "https://sneakycrow.bsky.social",
    borderColor: "border-blue-500",
    textColor: "border-blue-500",
    icon: "mdi:bluesky"
  },
  {
    name: "twitch",
    description: "where I create parasocial relationships",
    website: "https://twitch.tv/thesneakycrow",
    borderColor: "border-purple-500",
    textColor: "text-purple-500",
    icon: "mdi:twitch"
  }
];
