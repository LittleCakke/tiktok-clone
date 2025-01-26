### 1. 创建一个NextJS项目
```bash
npx create-next-app@latest my-app
```

> - [x] TypeScript 
> - [ ] ESLint
> - [x] TailwindCSS
> - [ ] `src/` directory
> - [x] App Router
> - [ ] import alias

### 2. 
`app/page.tsx`
```tsx
export default function Home()
{
    return (
        <div>
            Home
        </div>
    );
}
```
`app/layout.tsx`
```tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TikTok Clone",
    description: "TikTok Clone",
}

export default function RootLayout({
    children,
}: { children: React.ReactNode })
{
    return (
        <html lang="zh">
            <body>
                { children }
            </body>
        </html>
    );
}
```

`app/global.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. 依赖
```bash
cnpm i appwrite debounce image-js moment react-advanced-cropper react-icons zustand canvas raw-loader

cnpm i @types/debounce -D
```
