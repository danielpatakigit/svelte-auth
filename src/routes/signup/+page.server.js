import { fail } from "@sveltejs/kit"

export const actions = {
  signup: async ({ request, url, locals: { supabase, session } }) => {
    if (session) {
      throw redirect(303, "/")
    }

    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
      },
    })

    if (error) {
      return fail(500, { message: "Server error. Try again later.", success: false, email })
    }

    return {
      message: "Please check your email for a magic link to log into the website.",
      success: true,
    }
  },
}
