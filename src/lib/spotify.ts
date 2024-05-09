type AlbumData = {
  images: {
    url: string;
  };
};

export const getUserAlbumByToken = async (accessToken: string): Promise<AlbumData[]> => {
  const albumData = await fetch("https://api.spotify.com/v1/me/albums", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then((res) => res.json());
  return albumData.items;
};
