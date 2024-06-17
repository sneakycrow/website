<script>
  import Profile from "./Profile.svelte";
</script>

<article class={`w-full grid grid-flow-row gap-10 lg:text-lg ${$$restProps.class}`} id="about">
  <Profile />
  <p>
    My name is Zachary Corvidae, also known as sneaky crow. With over two decades of experience,
    I've been deeply entrenched in the world of application development, constantly honing my craft
    and adapting to the ever-evolving beast that is technological innovation. Throughout my career,
    I've had the privilege of contributing to a diverse array of projects and companies, ranging
    from <strong>industry giants</strong>
    to <strong>boutique agencies</strong>, and even <strong>venturing into entrepreneurship</strong>
    by founding multiple successful software projects and businesses.
  </p>
  <p>
    Beyond the realm of programming, I also like to incorporate some of my other favorite hobbies
    and interests in what I do. Whether I'm crafting melodies, delving into immersive virtual
    worlds, exploring the depths of literature, or simply basking in the breathtaking beauty of the
    Pacific Northwest's natural wonders, I am constantly seeking new avenues for creativity and
    enrichment.
  </p>
  <p>
    I <span class="italic">love</span> to collaborate. Feel free to reach out to me via
    <a href="mailto:zach@sneakycrow.dev">email</a>.
  </p>
</article>
