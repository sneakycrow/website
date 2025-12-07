<script lang="ts">
  import Socials from "$lib/components/Socials.svelte";
</script>

<svelte:head>
  <title>sneaky crow</title>
</svelte:head>

<section
  class="col-start-1 lg:col-span-6 min-h-[40vh] max-w-[1000px] mx-auto space-y-10 text-center flex flex-col justify-center items-center"
>
  <img
    src="/ada_cropped.png"
    alt="Ada the crow, the mascot of Sneaky Crow"
    style="animation: bounce 3s infinite;"
    width={300}
  />
  <Socials showCopy={true} />
  <p class="text-xl">
    Hey there, my name is Zach. Publicly, I'm a software engineer and artist. and I'm definitely <span
      class="font-bold underline italic uppercase">not</span
    > a crow in a long-coat pretending to be a human.
  </p>
  <div class="text-lg flex flex-col space-y-4">
    <p>I like to make a variety of software and art, including, but not limited to:</p>
    <ul class="list-inside list-disc text-left">
      <li class="marker:text-blue-500">apps (native and web) for creators</li>
      <li class="marker:text-red-500">large scale systems (over 8 billion requests per month)</li>
      <li class="marker:text-yellow-500">
        open-source contributions to my favorite libraries and tools
      </li>
    </ul>
  </div>
  <p>If you'd like to work together, shoot me an <a href=":mailto:zach@sneakycrow.dev">email</a></p>
</section>
