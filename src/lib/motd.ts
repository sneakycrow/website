export const getMastodonStatus = async () => {
  const MASTODON_STATUS_ENDPOINT = "https://cybre.gg/api/v1/accounts/110657956550305282/statuses";
  const res = await fetch(MASTODON_STATUS_ENDPOINT);
  return await res.json();
};
