import Tag from "@/components/Tag";

type Game = {
  id: string;
  slug: string;
  title: string;
  status: string;
  body: string;
  summary: string;
  platforms: Platform[];
};

type Platform = "windows" | "mac" | "linux" | "web";

interface ShortGameDescriptionProps {
  game: Game;
}

export const ShortGameDescription = (props: ShortGameDescriptionProps) => {
  const { game } = props;
  return (
    <div className="py-4">
      <a
        href={game.slug}
        className="text-green-550 text-lg hover:opacity-50 transition-opacity"
      >
        {game.title}
      </a>
      <p className="text-xs italic text-gray-400">{game.summary}</p>
      {game.platforms.map((platform, index) => (
        <Tag key={`${index}-${platform}`}>{platform}</Tag>
      ))}
    </div>
  );
};

export const getGames = async (): Promise<Game[]> => {
  return await processLocalGames("_games");
};

const processLocalGames = async (dir: string): Promise<Game[]> => {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");
  const files = fs.readdirSync(`${process.cwd()}/${dir}`, "utf-8");
  return files
    .filter((file: string) => file.endsWith(".md"))
    .map((fn: string) => {
      const path = `${process.cwd()}/${dir}/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const slug = `/games/${fn.split(".md")[0]}`;
      const { data } = matter(rawContent);
      const date = fn.split("-").splice(0, 3).join("-");

      return { ...data, id: uuid(), slug, date };
    })
    .reverse();
};

export const getGameBySlug = async (slug: string): Promise<Game> => {
  const { v4: uuid } = require("uuid");
  const fs = require("fs");
  const matter = require("gray-matter");

  const files = fs.readdirSync(`${process.cwd()}/_games`, "utf-8");

  const file: Game = files.find((file: string) => file.startsWith(slug));
  if (!file) {
    return {
      slug: "error",
      body: "<h1>Error rendering game</h1>",
      id: uuid(),
      title: "Error rendering game",
      platforms: [],
      status: "",
      summary: "",
    };
  }
  const path = `${process.cwd()}/_games/${file}`;
  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  const { data, content } = matter(rawContent);

  return { ...data, body: content, id: uuid(), slug };
};
