import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { dummyProducts } from "../data/products";
import { getSession, commitSession } from "../session.server";
import styles from "../styles/wishlist.css";


// Link the CSS
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// Loader: get wishlist from session
export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const wishlistIds = session.get("wishlist") || [];
  const wishlistItems = dummyProducts.filter((p) => wishlistIds.includes(p.id));
  return json(wishlistItems);
};

// Action: remove item or simulate move to cart
export const action = async ({ request }) => {
  const formData = await request.formData();
  const productId = formData.get("productId");
  const actionType = formData.get("action");

  const session = await getSession(request.headers.get("Cookie"));
  const wishlist = new Set(session.get("wishlist") || []);
  const cart = new Set(session.get("cart") || []);

  if (actionType === "remove") {
    wishlist.delete(productId);
  } else if (actionType === "moveToCart") {
    wishlist.delete(productId); // Remove from wishlist
    cart.add(productId);
  }

  session.set("wishlist", Array.from(wishlist));
  session.set("cart", Array.from(cart));

  return redirect("/wishlist", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Wishlist() {
  const products = useLoaderData();

  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <div className="button-group">
              <Form method="post" style={{ display: "inline" }}>
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="action" value="moveToCart" />
                <button type="submit" className="add">Move to Cart</button>
              </Form>
              <Form method="post" style={{ display: "inline" }}>
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="action" value="remove" />
                <button type="submit" className="save">Remove</button>
              </Form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
