<script>
  export let data

  let { supabase, session } = data
  $: ({ supabase, session } = data)

  let user = null

  if (session) {
    user = session.user
  }
</script>

<h1>This is the homepage</h1>
{#if user}
  <small>You're already logged in. Your user info:</small>
  <pre>{JSON.stringify(user, null, 4)}</pre>

  <a href="/dashboard">Link to your dashboard.</a>
{:else}
  <p>Use the login button in the header to login.</p>
{/if}
