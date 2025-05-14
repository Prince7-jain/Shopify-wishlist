// app/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET || "default-secret-key"; // Replace with a strong secret in production time

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__wishlist_session",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
