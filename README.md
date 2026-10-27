# Stockly — Inventory Management Dashboard

## Project Overview

Stockly is a React-based inventory management dashboard built with Vite. It allows users to add, search, filter, update, and delete products. It also displays inventory statistics, stock alerts, and a recent activity log.

## Features

- Reusable functional components and props
- Class component with React lifecycle methods
- Product inventory management
- Search, category filtering, and stock-status filtering
- Light and dark themes using Context API
- useState, useEffect, useContext, useRef, useMemo, and useCallback
- LocalStorage for saving products and audit logs
- Responsive CSS styling
- CSR architecture using React and Vite

## CSR vs SSR Analysis

Client-Side Rendering (CSR) and Server-Side Rendering (SSR) differ in where the HTML content is generated. In a standard Vite and React application, the browser downloads the initial HTML, JavaScript files, and other assets. React then executes in the browser to render the interface. This approach can make navigation between pages fast after the application has loaded, but the first load may take longer on slower devices or networks because JavaScript must download and execute.

In Server-Side Rendering (SSR), a server generates HTML for a requested page and sends that HTML to the browser. Users can see meaningful content before the full client-side JavaScript becomes interactive. React then hydrates the page so that interactive features work. Frameworks such as Next.js support SSR, although the exact rendering strategy depends on the application configuration.

For an enterprise e-commerce application, CSR can be suitable for an internal inventory dashboard because authenticated staff frequently interact with forms, filters, and stock data. It can also be hosted as static files on services such as Vercel or Netlify. However, search engines and social previews may need additional consideration for publicly accessible product pages.

SSR can improve the initial delivery of meaningful page content and support SEO for public product listings. It can also introduce server execution costs, caching complexity, and additional deployment requirements. Dynamic pages may require a running server or serverless functions.

The choice depends on the application's goals. CSR is a practical choice for this inventory dashboard, while a public e-commerce storefront may benefit from SSR or a hybrid rendering strategy.

## Technologies

- React
- Vite
- JavaScript
- CSS
- Browser LocalStorage

## Run Locally

1. Run `npm install`.
2. Run `npm run dev`.
3. Open the local URL shown in the terminal.

## Deployment

Live deployment: Add your deployed website URL here.

GitHub repository: Add your repository URL here.
