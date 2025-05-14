import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { dummyProducts } from "../data/products";
import { getSession, commitSession } from "../session.server";
import styles from "../styles/cart.css";

// Link to CSS
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// Load products from cart session
export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const cartIds = session.get("cart") || [];
  const cartItems = dummyProducts.filter((p) => cartIds.includes(p.id));
  return json(cartItems);
};

// Remove product from cart
export const action = async ({ request }) => {
  const formData = await request.formData();
  const productId = formData.get("productId")?.toString();

  const session = await getSession(request.headers.get("Cookie"));
  const cart = new Set(session.get("cart") || []);

  cart.delete(productId);
  session.set("cart", Array.from(cart));

  return redirect("/cart", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Cart() {
  const products = useLoaderData();

  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
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
                <button className="save" type="submit">Remove</button>
              </Form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
