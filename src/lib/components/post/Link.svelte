<script lang="ts">
  export let href: string;
  export let text: string;
  export let title: string;
</script>

<a {href} target="_blank" {title}>
  {text}
</a>
