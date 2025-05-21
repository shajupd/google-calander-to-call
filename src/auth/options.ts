import appApi from "@/lib/axios.instance";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          scope: [
            "openid",
            "profile",
            "email",
            "https://www.googleapis.com/auth/calendar.readonly", // <-- calendar scope
            // or use 'https://www.googleapis.com/auth/calendar' for full access
          ].join(" "),
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const accessToken = account?.access_token;
      const refreshToken = account?.refresh_token;
      const userProfile = {
        name: user.name,
        email: user.email,
        image: user.image,
        accessToken,
        refreshToken,
      };

      try {
        const response = await appApi.post("/users", userProfile);
        user.id = response.data._id;
      } catch (error) {
        console.log("🚀 ~ signIn ~ error:", error);
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
    signOut: "/sign-in",
    newUser: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
});
