<script lang="ts">
  export let post: {
    slug: string;
    title: string;
    summary: string;
    date: string;
  };

  const date = new Date(post.date ?? Date.now());
</script>

<div class="py-4">
  <p class="text-xs italic text-gray-400">{date.toLocaleDateString()}</p>
  <a
    class="lg:text-2xl text-xl font-bold uppercase text-black dark:text-white transition-opacity"
    href={post.slug}
  >
    {post.title}
  </a>
  <p class="text-lg italic text-gray-400">{post.summary}</p>
</div>
