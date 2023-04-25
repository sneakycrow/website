import { getGames, ShortGameDescription } from "@/components/Game";

const GameList = async () => {
  const games = await getGames();
  return (
    <div className="flex flex-col w-full h-auto bg-white p-6 lg:items-center">
      <div className="lg:w-3/4 divide-y-2">
        {games.map((game) => (
          <ShortGameDescription key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
