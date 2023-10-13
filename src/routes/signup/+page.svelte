<script>
  import CheckMail from "../../lib/components/checkMail.svelte"
  export let form

  console.log(form)
</script>

{#if form?.success}
  <dialog open={form?.success ? true : false}>
    <CheckMail
      ><h2 slot="title">You have got mail!</h2>
      <p slot="content">Please check your inbox and confirm your email address.</p></CheckMail
    >
  </dialog>
{/if}

<article>
  <h2>Create account</h2>
  <form method="POST" action="?/signup">
    <label for="email">Email address</label>
    <input name="email" type="email" placeholder="Email address" required />
    <br />
    <br />
    <label for="password">Password:</label>
    <input name="password" type="password" placeholder="Enter your password" required minlength="6" />

    <!-- <label for="confirm-password">Confirm password:</label>
    <input
      type="password"
      bind:value={confirmPassword}
      placeholder="Enter your password again"
      required
      minlength="6"
    /> -->
    <!-- {#if errorMessage}
      <small style="color: red;">{errorMessage}</small>
    {/if} -->

    <br />
    <br />
    <input type="submit" value="Submit" on:click={() => {}} />
  </form>

  <hr />
  <br />
  <small>Already have an accont? <a href="/login">Click here to sign in.</a></small>
</article>
