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
    borderColor: "border-purple-500",
    textColor: "text-purple-500",
    icon: "mingcute:send-line"
  },
  {
    name: "resume",
    description: "my implicit human value confined to a single document",
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
    name: "badbird.lol",
    description: "custom url shortener tool",
    website: "https://badbird.lol",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-500"
  },
  {
    name: "mastadon",
    description: "intimate discussions with the void",
    website: "https://social.lol/@sneakycrow",
    borderColor: "border-blue-500",
    textColor: "border-blue-500",
    icon: "mdi:mastodon"
  }
];
