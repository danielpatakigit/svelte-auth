import { fail, redirect } from "@sveltejs/kit"

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { supabase, session } = await parent()
  if (session) {
    throw redirect(303, "/")
  } else return {}
}

export const actions = {
  login: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log("Couldn't log in.")
      redirect(500, "/")

      return fail(500, { message: "Server error. Try again later.", success: false, email })
    }

    redirect(303, "/dashboard")
  },
}
