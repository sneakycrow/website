/// Function for getting a list of games for a user from Steam
export const getGamesFromSteam = async (steamID: string): Promise<SteamGame[]> => {
  const steamKey = process.env.STEAM_KEY;
  const response = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${steamID}&format=json&include_appinfo=1`
  );
  const data = await response.json();
  return data.response.games as SteamGame[];
};

export type SteamGame = {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  has_community_visible_stats: boolean;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
  rtime_last_played: number;
  content_descriptorids: number[];
  playtime_disconnected: number;
};
