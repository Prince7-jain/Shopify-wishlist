import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLoaderData,
} from "@remix-run/react";

import { json } from "@remix-run/node";
import { getSession } from "./session.server";
import styles from "./styles/root.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// ✅ Load cart and wishlist count
export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = session.get("cart") || [];
  const wishlist = session.get("wishlist") || [];
  return json({ cartCount: cart.length, wishlistCount: wishlist.length });
};

export default function App() {
  const { cartCount, wishlistCount } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="navbar">
          {/* ✅ Make title a Link */}
          <Link to="/" className="navbar-title">🛍️ Wishlist App</Link>
          <nav className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/wishlist">
              Wishlist {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </Link>
            <Link to="/cart">
              Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
            <Link to="/about">About</Link>
            <Link to="/Login">Login</Link>
          </nav>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
