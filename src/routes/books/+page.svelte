<script lang="ts">
  import { formatDistanceToNow } from "date-fns";

  const logoURL = "/paper_eaters_club_logo.png";

  type Book = {
    url: string;
    image: string;
    title: string;
    author: string;
  };

  const books: Book[] = [
    {
      title: "Rouge",
      author: "Mona Awad",
      url: "https://app.thestorygraph.com/books/e1a7dd53-f9a4-41bf-a78c-f87d7acf65be",
      image: "/books/rouge_mona_awad.jpg"
    },
    {
      title: "Priory of the Orange Tree",
      author: "Samantha Shannon",
      url: "https://app.thestorygraph.com/books/15d2f806-109c-44ea-a1cc-a6b7e9e47503",
      image: "/books/priory_of_the_orange_tree_samantha_shannon.jpeg"
    }
  ];

  const currentBook = books[0];
</script>

<svelte:head>
  <title>actually illiterate</title>
</svelte:head>

<section class="w-full lg:col-span-6 space-y-10">
  <aside class="max-w-[600px] mx-auto w-3/4 space-y-10 text-center">
    <img src={logoURL} class="mx-auto" alt="Logo for the Paper Eaters Club, a book club" />
    <p>A group of illiterate friends that pretend we can read but we're really just gossipping.</p>
  </aside>
  <h4 class="text-xl text-center font-semibold">Our Books</h4>
  <div class="grid grid-flow-row lg:grid-flow-col gap-10 items-start justify-center">
    <aside class="text-left flex flex-col justify-center">
      <p class="text-lg">{currentBook.title}</p>
      <p>{currentBook.author}</p>
      <a href={currentBook.url}>
        <img
          class="mx-auto my-4 h-[400px]"
          src={currentBook.image}
          alt={`${currentBook.title} by ${currentBook.author}`}
        />
      </a>
    </aside>
    {#each books.slice(1, books.length) as book}
      <aside class="text-left flex flex-col justify-center">
        <p class="text-lg">{book.title}</p>
        <p>{book.author}</p>
        <a href={book.url}>
          <img
            class="mx-auto my-4 h-[400px]"
            src={book.image}
            alt={`${book.title} by ${book.author}`}
          />
        </a>
      </aside>
    {/each}
  </div>
</section>
