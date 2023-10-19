<script>
  /** @type {import('./$types').PageData} */
  import { enhance } from "$app/forms"
  export let data
</script>

<article>
  <h2>Login</h2>
  <form action="?/login" method="POST">
    <!-- <label for="username">
        Username
        <input type="text" id="username" name="username" placeholder="John Doe" required />
      </label> -->

    <label for="email">Email address</label>
    <input type="email" id="email" name="email" placeholder="Email address" required />
    <!-- <small>We'll never share your email with anyone else.</small> -->

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password" required />

    <hr />
    <br />
    <input type="submit" value="Login" />
  </form>

  <hr />
  <br />
  <small>Don't have an account yet? <a href="/signup">Click here to sign up.</a></small>
</article>
