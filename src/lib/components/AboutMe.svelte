<script>
  import Title from "./Title.svelte";
  import Profile from "./Profile.svelte";
</script>

<div class="py-4 w-full bg-white" id="about">
  <article class="lg:w-3/4 p-4 max-w-[1000px] mx-auto space-y-2">
    <Title>About me</Title>
    <Profile />
    <p class="text-base">
      My name is Zachary Corvidae, aka sneaky crow. I've been making applications for over 20 years.
      I've founded several companies, worked on teams sizes from solo development to large
      thousand-person organizations.
    </p>
    <p class="text-base">
      I have a passion for solving puzzles and believe in engineering with flexibility, empathy, and
      communication.
    </p>
    <p class="text-base">
      If you'd like to work together, you can <a href="mailto:zach@sneakycrow.dev">email me</a>
      or <a href="/resume.pdf">download my resume</a>
    </p>
  </article>
</div>
