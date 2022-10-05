import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";

import User from "@/models";

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect() {
      return "/";
    },
  },
  adapter: Adapters.TypeORM.Adapter(
    process.env.MONGODB_URI,
    {
      models: User,
    },
  ),
  debug: false,
  secret: process.env.SALT,
  // NOTE token을 써서 로그인관리를 하는게 아니라면 지금 상황에서 필요하지 않다
  // 알아서 내부적으로 해주는 next/auth를 믿어보자
  // session: {
  //   jwt: true,
  //   maxAge: 60 * 60 * 3,
  //   updateAge: 60 * 60,
  // },
  // jwt: {
  //   secret: process.env.SALT,
  // },

  // 로그인 로그아웃 했을 때 redirect
});
