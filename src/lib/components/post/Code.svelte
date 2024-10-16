<script lang="ts">
  import Highlight, { LineNumbers, HighlightSvelte } from "svelte-highlight";
  import {
    ini, // used for toml
    rust,
    plaintext,
    typescript,
    javascript,
    handlebars,
    json,
    scss,
    shell,
    sql,
    vbscriptHtml,
    yaml
  } from "svelte-highlight/languages";
  // @ts-expect-error types aren't support important to the project, so we ignore them
  import gleam from "@gleam-lang/highlight.js-gleam";
  import "./dracula.css";

  export let text: string;
  // This is expected either to be a single string or a space-separated string, "rust filename.rs"
  export let lang: string;
  const parsedLang = lang.split(" ");
  const language = parsedLang[0];
  const filename = parsedLang[1] ?? "";
  // import language based on lang prop
  const getLanguage = () => {
    switch (language) {
      case "rust": {
        return rust;
      }
      case "typescript": {
        return typescript;
      }
      case "js":
      case "javascript": {
        return javascript;
      }
      case "json": {
        return json;
      }
      case "sh":
      case "shell": {
        return shell;
      }
      case "gleam": {
        return {
          name: "gleam",
          register: gleam
        };
      }
      case "scss": {
        return scss;
      }
      case "hbs":
      case "handlebars": {
        return handlebars;
      }
      case "html": {
        return vbscriptHtml;
      }
      case "toml": {
        return ini;
      }
      case "sql": {
        return sql;
      }
      case "yaml": {
        return yaml;
      }
      default: {
        return plaintext;
      }
    }
  };
</script>

<div class="shadow-flat-green hljs divide-y-2 divide-gray-700">
  {#if lang}
    <aside class="px-4 py-2 text-white/80 text-sm flex items-center justify-between">
      {language}
      {#if filename}
        <span class="text-white/80 text-xs">{filename}</span>
      {/if}
    </aside>
  {/if}
  {#if lang === "svelte"}
    <HighlightSvelte code={text} let:highlighted>
      <LineNumbers {highlighted} hideBorder />
    </HighlightSvelte>
  {:else}
    <Highlight language={getLanguage()} code={text} let:highlighted>
      <LineNumbers {highlighted} hideBorder />
    </Highlight>
  {/if}
</div>
