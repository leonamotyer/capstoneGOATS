import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // Add more providers as needed
  ],
  callbacks: {
    async session(session, user) {
      session.user.id = user.id; // Add user ID to session
      return session;
    },
  },
  pages: {
    signIn: '/login', // Custom sign-in page
    // Add more custom pages if needed
  },
  secret: process.env.NEXTAUTH_SECRET,
});