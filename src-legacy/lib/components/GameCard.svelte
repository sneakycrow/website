<script lang="ts">
  interface Props {
    appId: number;
    name: string;
    iconUrl: string;
    playTime: number;
  }

  let { appId, name, iconUrl, playTime }: Props = $props();

  // Convert playtime from minutes to hours
  let hours = Math.round(playTime / 60);

  // Steam header image URL (these are typically 460x215)
  const headerImageUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;

  // Fallback to the small icon if needed
  const steamIconUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${iconUrl}.jpg`;
</script>

<div class="w-full">
  <a
    href={`https://store.steampowered.com/app/${appId}`}
    target="_blank"
    class="block shadow-lg rounded-lg overflow-hidden bg-black dark:bg-white hover:scale-105 transition-transform"
  >
    <div class="relative aspect-[460/215]">
      <img src={headerImageUrl} alt={name} class="w-full h-full object-cover" />
      <!-- Small icon overlay in bottom right -->
      <img
        src={steamIconUrl}
        alt=""
        class="absolute bottom-2 right-2 w-8 h-8 rounded-sm shadow-md"
      />
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg text-primary-500 line-clamp-1">{name}</h3>
      <p class="text-sm text-gray-500">{hours} hours played</p>
    </div>
  </a>
</div>
