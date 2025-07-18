# 🛠️ Web NEXT JS Boilerplate

This is a modern, scalable **Next.js 15** boilerplate built with **React 19**, **Tailwind CSS 4**, and **ShadCN UI** (Radix-based components). It provides a solid foundation for building accessible, component-driven web applications with a clean structure, reusable components, and developer-friendly conventions.

---

## 🚀 Tech Stack

| Feature              | Library / Tool                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Framework            | [Next.js 15](https://nextjs.org)                                                          |
| UI Components        | [ShadCN UI](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com/)                |
| Forms                | [React Hook Form](https://react-hook-form.com) + [Zod](https://github.com/colinhacks/zod) |
| Table                | [TanStack Table](https://tanstack.com/table)                                              |
| Carousel             | [Embla Carousel](https://www.embla-carousel.com/)                                         |
| Toast / Notification | [Sonner](https://sonner.emilkowal.dev/)                                                   |
| Icons                | [Lucide React](https://lucide.dev/)                                                       |
| Styling              | [Tailwind CSS 4](https://tailwindcss.com)                                                 |
| Utility Classnames   | `clsx`, `cva`, `tailwind-merge`                                                           |
| Routing              | App Router w/ Layouts                                                                     |
| Animation            | `tw-animate-css` (Tailwind plugin)                                                        |
| State Management     | Local/component state (context optional)                                                  |
| Miscellaneous        | `date-fns`, `cmdk`, `vaul`, `input-otp`                                                   |

---

## 📁 Directory Structure

```
📦boilerplate-next
 ┣ 📂app              # Next.js App Router pages
 ┃ ┣ 📂(auth)/login
 ┃ ┣ 📂(landing)/home
 ┃ ┣ 📂(manage)/(panel)/dashboard
 ┣ 📂components       # Reusable UI components (e.g., button, modal)
 ┃ ┣ 📂ui             # ShadCN + custom components
 ┃ ┣ 📂landing        # Landing page-specific components
 ┣ 📂features         # Feature/domain-specific logic
 ┣ 📂hooks            # Custom hooks (e.g., use-mobile)
 ┣ 📂lib              # Utilities, constants
 ┣ 📂prisma           # Prisma schema and seeding
 ┣ 📂public           # Static assets
 ┣ 📂utils            # Shared helper functions
 ┣ 📜next.config.mjs
 ┣ 📜postcss.config.mjs
 ┣ 📜tailwind.config.mjs
 ┣ 📜package.json
 ┗ 📜README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Jamaludin21/boilerplate-next.git
cd boilerplate-next
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Run the Dev Server

```bash
npm run dev
```

---

## ✅ Features

- ⚡ App Router with `layout.js` and route groups
- 🎨 Fully styled with TailwindCSS + ShadCN UI
- 🧩 Modular file structure (hooks, lib, features)
- ✅ Form validation with React Hook Form + Zod
- 💬 Toasts with Sonner
- 📱 Mobile-friendly design (e.g. `use-mobile` hook)
- 🛠 Easy customization and scalability
- 🔒 Component-based auth pattern (coming soon)

---

## 🔧 Scripts

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "typecheck": "tsc --noEmit"
}
```

---

## 📝 Environment Variables

Create a `.env.local` file:

```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=https://your-api.com
```

> ✨ Customize as needed per environment.

---

## 🌐 Deployment

This project is optimized for **[Vercel](https://vercel.com/)**. Simply push to GitHub and import the repo into your Vercel dashboard.

---

## 🧠 Optional Enhancements

| Feature         | Description                          |
| --------------- | ------------------------------------ |
| TypeScript      | Add types to improve DX              |
| Auth System     | NextAuth.js or custom JWT pattern    |
| i18n            | Add `next-intl` or `next-i18next`    |
| CMS Integration | Sanity, Strapi, or Notion (optional) |
| Testing         | Playwright or Vitest setup           |

---

## 🧑‍💻 Contributing

This boilerplate is meant to be **clean, minimal, and extensible**. Feel free to fork and adapt it to your use case. If you make improvements, consider opening a PR or sharing your repo back.

---

## 📄 License

MIT License © [Jamaludin21](https://github.com/Jamaludin21)

---

## 💬 Feedback

Got questions or suggestions? Feel free to [open an issue](https://github.com/Jamaludin21/boilerplate-next/issues) or reach out via GitHub.
