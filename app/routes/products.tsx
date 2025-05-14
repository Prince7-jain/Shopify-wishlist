import { dummyProducts, type Product } from "../data/products";
import {
  json,
  redirect,
  type LoaderFunction,
  type ActionFunction,
} from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import styles from "../styles/products.css";
import { getSession, commitSession } from "../session.server";

// Link to CSS
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async () => {
  return json(dummyProducts);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const productId = formData.get("productId")?.toString();
  const actionType = formData.get("action")?.toString();

  const session = await getSession(request.headers.get("Cookie"));
  const cart = new Set(session.get("cart") || []);
  const wishlist = new Set(session.get("wishlist") || []);

  if (productId) {
    if (actionType === "cart") {
      cart.add(productId);
    } else if (actionType === "wishlist") {
      wishlist.add(productId);
    }

    session.set("cart", Array.from(cart));
    session.set("wishlist", Array.from(wishlist));
  }

  return redirect("/products", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Products() {
  const products = useLoaderData<typeof loader>();

  return (
    <div className="product-grid">
      {products.map((product: Product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <div className="button-group">
            <Form method="post" style={{ display: "inline" }}>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="action" value="cart" />
              <button className="add" type="submit">Add to Cart</button>
            </Form>
            <Form method="post" style={{ display: "inline" }}>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="action" value="wishlist" />
              <button type="submit" className="save">Save for Later</button>
            </Form>
          </div>
        </div>
      ))}
    </div>
  );
}
