Here’s a complete and polished `README.md` for your Shopify Wishlist App built with Remix:

---

## 🛍️ Shopify Wishlist App

This is a **minimal embedded Shopify app** built with **Remix** and **React**, showcasing a **“Save for Later” (Wishlist)** and **Cart** feature using session cookies.

---

### 🚀 Features

* Dummy product data (no real Shopify API required)
* Embedded Shopify app using Shopify CLI
* **Wishlist** and **Cart** functionality with persistent session storage
* View saved products on `/wishlist` and `/cart` routes
* Add/remove/move-to-cart actions
* Navigation with dynamic item counters
* Clean styling using **plain CSS**
* Simple responsive UI for products

---

### 🛠️ Tech Stack

| Tool / Framework                                              | Usage                               |
| ------------------------------------------------------------- | ----------------------------------- |
| [Remix](https://remix.run/)                                   | Fullstack React framework           |
| [React](https://reactjs.org/)                                 | UI components                       |
| [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)        | App scaffold, dev server, embedding |
| [Shopify App Bridge](https://shopify.dev/docs/api/app-bridge) | Embedding in Shopify admin          |
| **CSS (no framework)**                                        | Styling components                  |
| [Node.js](https://nodejs.org/)                                | Runtime                             |
| **Session Cookies**                                           | Data persistence for cart/wishlist  |
| [Vite](https://vitejs.dev/) *(via Remix build)*               | Fast dev environment                |

---

### 📂 Project Structure

```
app/
├── data/                 # dummyProducts.js
├── routes/               # products.jsx, wishlist.jsx, cart.jsx
├── styles/               # products.css, wishlist.css, root.css
├── session.server.js     # Session cookie setup
└── root.jsx              # Layout, navbar, loader
```

---

### 🧪 How to Run

1. Install dependencies:

```bash
npm install
```

2. Start development server inside your dev store:

```bash
shopify app dev
```

3. Visit `/products` in your embedded app

---

### 🧠 How Persistence Works

* Session cookies store product IDs for **wishlist** and **cart**
* Set via `commitSession()` in Remix `action()` handlers
* Accessed in `loader()` to display relevant data
* No database or localStorage needed

---

### 🔗 Important Routes

| Route       | Purpose                   |
| ----------- | ------------------------- |
| `/products` | Browse dummy product list |
| `/wishlist` | View saved items          |
| `/cart`     | View cart items           |
| `/`         | Welcome screen            |
| `/about`    | Dummy page                |

---

### 📈 Future Improvements to Consider

* Connect to real Shopify product API
* Use Polaris components for consistent Shopify UI
* Add quantity handling and checkout simulation
* Use localStorage for offline persistence fallback

