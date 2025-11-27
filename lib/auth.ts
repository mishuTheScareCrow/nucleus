import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: pool,
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await resend.emails.send({
          from: "Nucleus <onboarding@resend.dev>", // Update with your domain
          to: email,
          subject: "Sign in to Nucleus",
          text: `Click the link to sign in: ${url}`,
          html: `<a href="${url}">Sign in to Nucleus</a>`,
        });
      },
    }),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});

