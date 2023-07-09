import Header from "@/_next_pages/Header";
import GameList from "@/_next_pages/games/GameList";

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
