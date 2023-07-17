<script lang="ts">
  export let homeURL: string = "/";
  export let title: string;
  export let subtitle: string;
</script>

<div class="bg-white grid grid-flow-row md:grid-flow-col justify-center">
  <a class="inline-flex justify-self-center md:justify-self-end min-w-3/4" href={homeURL}>
    <img
      alt="Line art of a crow with a green baseball cap on, logo of Sneaky Crow"
      class="min-w-[200px]"
      height={200}
      src="/logo_v2.svg"
      width={200}
    />
  </a>
  <div class="flex flex-col justify-center items-center font-extrabold">
    <h1 class="w-full text-lg lg:text-2xl text-center lg:text-left">
      {title}
    </h1>
    <h2 class="w-full text-xl leading-13 text-center lg:text-left">
      {subtitle}
    </h2>
  </div>
</div>
