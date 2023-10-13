<script>
  /** @type {import('./$types').LayoutData} */
  import "@picocss/pico"
  import { onNavigate, invalidate } from "$app/navigation"
  import { onMount } from "svelte"
  import { MoonIcon, SunIcon, UserIcon } from "svelte-feather-icons"

  export let data

  let { supabase, session } = data
  $: ({ supabase, session } = data)
  let user = null

  if (session) {
    user = session.user
  }

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth")
      }
    })

    return () => subscription.unsubscribe()
  })

  function handleThemeChange() {
    const htmlElement = document.documentElement
    const currentTheme = htmlElement.getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"
    darkMode = currentTheme === "light"
    htmlElement.setAttribute("data-theme", newTheme)
  }

  // if (!document.startViewTransition || navigation.from?.route.id == navigation.to?.route.id)

  onNavigate(() => {
    if (!document.startViewTransition) {
      return
    }

    return new Promise((fulfil) => {
      document.startViewTransition(() => new Promise(fulfil))
    })
  })

  let darkMode = true

  let logoutModalOpen = false
</script>

<header>
  <a href="/">
    <h1>Logo</h1>
  </a>
  {#if user}
    <span>Current user: {user.email}</span>
  {/if}
  <div style="display: flex; gap: 1rem;">
    {#if user}
      <button class="outline" style="margin: unset" on:click={() => (logoutModalOpen = true)}>Logout</button>
      <a role="button" href="/profile" class="outline button-with-icon"><UserIcon>Profile</UserIcon>Profile</a>
    {:else}
      <a href="/login" role="button">Login</a>
    {/if}
    <a class:outline={darkMode} role="button" href="#" on:click={handleThemeChange}
      >{#if darkMode}<SunIcon />{:else}
        <MoonIcon />
      {/if}</a
    >
  </div>
</header>

<dialog open={logoutModalOpen ? true : false}>
  <article>
    <h3>Are you sure you want to log out?</h3>
    <p>This modal was created with Pico CSS.</p>
    <footer style="display: grid; grid-auto-flow: column; gap: 4rem">
      <button
        style="margin: unset"
        on:click={() => {
          logoutModalOpen = false
        }}
        class="secondary">Cancel</button
      >
      <a href="/auth/logout" role="button">Confirm</a>
    </footer>
  </article>
</dialog>

<main class="container">
  <slot />
</main>

<style>
  :global(.feather) {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }

  .button-with-icon {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  main {
    padding: 2rem 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    view-transition-name: header;
  }

  h1 {
    margin: unset;
    font-size: 2rem;
    font-weight: 600;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes slide-from-right {
    from {
      transform: translateX(100px);
    }
  }

  @keyframes slide-to-left {
    to {
      transform: translateX(-100px);
    }
  }

  :root::view-transition-old(root) {
    animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  :root::view-transition-new(root) {
    animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }
</style>
