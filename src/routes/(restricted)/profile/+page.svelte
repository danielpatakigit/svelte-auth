<script>
  export let data

  let { supabase, session } = data
  $: ({ supabase, session } = data)

  let user = null

  if (session) {
    user = session.user
  }
</script>

<h1>Profile Page</h1>

<h4>General User Info</h4>
<pre>{JSON.stringify(user, null, 4)}</pre>

<hr />
<br />

<div class="grid">
  <a href="" role="button">Change Email</a>
  <a href="" role="button">Change Password</a>
</div>

<br />
<hr />
