/* eslint-disable unused-imports/no-unused-vars */
import { withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
interface SessionConfig {
  cookieName: string
  password: string
  cookieOptions: {
    secure: boolean,
    sameSite: "lax" | "strict" | "none"
    httpOnly: boolean,
    maxAge: number
  }
}

export const IRON_SESSION_CONFIG: SessionConfig = {
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  password: process.env.SESSION_PASSWORD as string,
  // secure: true should be used in production (HTTPS)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  }
}

// soruce: https://github.com/vvo/iron-session
// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  > (
    handler: (
      context: GetServerSidePropsContext,
    ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, IRON_SESSION_CONFIG);
}