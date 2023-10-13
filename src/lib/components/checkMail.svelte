<script>
  import { ChevronRightIcon } from "svelte-feather-icons"
</script>

<article>
  <h2><slot name="title" /></h2>
  <p><slot name="content" /></p>
  <a href="/"><ChevronRightIcon /> Back to the homepage</a>
</article>
