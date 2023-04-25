import Header from "@/app/Header";
import GameList from "@/app/games/GameList";

const Games = () => {
  return (
    <>
      <Header title="homemade games" subtitle="made with love" />
      {/* @ts-expect-error Async Server Component */}
      <GameList />
    </>
  );
};

export default Games;
