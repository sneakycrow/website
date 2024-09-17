<script lang="ts">
  import { projects } from "$lib/projects";
</script>

<section id="projects" class={`flex flex-col space-y-8 ${$$restProps.class}`}>
  {#each projects as project}
    <a
      href={project.website}
      class={`flex flex-col justify-between border-l-8 pl-4 space-y-2 lg:opacity-50 lg:hover:opacity-100 transition-opacity ${project.borderColor}`}
    >
      <span class="text-xl font-extrabold text-black dark:text-white">{project.name}</span>
      <span class="text-black/75 dark:text-white/75 text-sm">{project.description}</span>
    </a>
  {/each}
</section>
