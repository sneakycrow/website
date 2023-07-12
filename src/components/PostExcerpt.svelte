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
  <p class="text-xs font-light italic text-gray-400">{date.toLocaleDateString()}</p>
  <a
    class="text-green-550 text-base lg:text-lg hover:opacity-50 transition-opacity"
    href={post.slug}
  >
    {post.title}
  </a>
  <p class="text-xs italic text-gray-400">{post.summary}</p>
</div>
