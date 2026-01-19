<script lang="ts">
  interface Props {
    href: string;
    text: string;
    title: string;
  }

  let { href, text, title }: Props = $props();
</script>

<a {href} target="_blank" {title}>
  {text}
</a>
