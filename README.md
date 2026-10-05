# ifs18005-pabwe2026-nextjs

Praktik Framework JS: ReactJS & NextJS (pabwe-2026-p4)

Berkas pendukung praktikum (`src-latihan-p4-nextjs.zip` dan `public-latihan-p4-nextjs.zip`) dapat diunduh dari: https://github.com/auxtern/itdel-praktikum/tree/main/pabwe/2026

## A. Bahan Bacaan

### 1.2 NextJS

Pelajari NextJS dari halaman berikut: https://nextjs.org/docs

## B. Latihan

### 2.2 NextJS (TypeScript)

#### 2.2.1 Konfigurasi

1. Buat workspace VSCode baru dengan format penamaan `{username}-pabwe2026-p4`. Contoh: `abdullah_ubaid-pabwe2026-p4-nextjs` atau `ifs18005-pabwe2026-p4-nextjs`.
2. Buka terminal dan jalankan perintah `bun init`. Pada pilihan `project template` pilih `Blank`.
3. Modifikasi isi file `package.json`, seperti berikut (pada bagian `"name": "abdullah_ubaid-pabwe2026-p4"` ganti dengan username kamu):

```json
{
  "name": "ifs18005-pabwe2026-p4-nextjs",
  "private": true,
  "scripts": {
    "dev": "bun src/server.ts dev",
    "build": "next build",
    "start": "bun src/server.ts start",
    "lint": "eslint",
    "test": "vitest run --coverage",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.12.0",
    "@tabler/icons-react": "^3.48.0",
    "next": "16.3.6",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-redux": "^9.3.0",
    "sweetalert2": "^11.26.25"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@testing-library/user-event": "^14.6.7",
    "@types/bun": "^1.4.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.1.1",
    "@vitest/coverage-v8": "^5.0.2",
    "eslint": "^9",
    "eslint-config-next": "16.3.6",
    "jsdom": "^30.1.1",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^5.0.2"
  },
  "packageManager": "bun@1.4.2",
  "ignoreScripts": [
    "sharp",
    "unrs-resolver"
  ],
  "trustedDependencies": [
    "sharp",
    "unrs-resolver"
  ]
}
```

4. Buka terminal dan jalankan perintah `bun install`.
5. Hapus file `index.ts`.
6. Modifikasi isi file `tsconfig.json`, seperti berikut:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": false,
    "useUnknownInCatchVariables": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"],
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules", "**/*.test.ts", "**/*.test.tsx"]
}
```

7. Modifikasi isi file `.gitignore`, seperti berikut:

```gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

8. Tambahkan file `.env`, `.env.example`, `eslint.config.mjs`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs` dan `vite.config.mts`.
9. Modifikasi isi file `.env`, seperti berikut:

```env
NEXT_PUBLIC_DELCOM_BASEURL=https://open-api.delcom.org/api/v1
APP_PORT=3000
```

10. Modifikasi isi file `.env.example`, seperti berikut:

```env
NEXT_PUBLIC_DELCOM_BASEURL=http://localhost:8000/api/v1
APP_PORT=3000
```

11. Modifikasi isi file `eslint.config.mjs`, seperti berikut:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

12. Modifikasi isi file `next-env.d.ts`, seperti berikut:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";
import "./.next/dev/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

13. Modifikasi isi file `next.config.ts`, seperti berikut:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
```

14. Modifikasi isi file `postcss.config.mjs`, seperti berikut:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

15. Modifikasi isi file `vitest.config.mts`, seperti berikut:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "node_modules/**",
        "src/app/**",
        "src/components/Providers.tsx",
        "src/setupTests.ts",
        "src/lib/config.ts",
        "src/types/**",
        "src/hooks/redux.ts",
        "src/server.ts",
        "scripts/**",
        "vitest.config.mts",
        "next.config.ts",
        "postcss.config.mjs",
        "eslint.config.mjs",
        ".next/**",
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
```

16. Unduh file `public-latihan-p4-nextjs.zip` pada link berikut: [Github](https://github.com/auxtern/itdel-praktikum/tree/main/pabwe/2026). Setelah itu pindahkan semua isinya ke folder `public`.

#### 2.2.2 Logika Aplikasi

Buat struktur proyek seperti berikut:

```text
src/
├── app
│   ├── (dashboard)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── profile
│   │   │   └── page.tsx
│   │   ├── todos
│   │   │   └── [todoId]
│   │   │       └── page.tsx
│   │   └── users
│   │       └── page.tsx
│   ├── auth
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── register
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components
│   └── Providers.tsx
├── features
│   ├── auth
│   │   ├── api
│   │   │   ├── authApi.test.ts
│   │   │   └── authApi.ts
│   │   ├── layouts
│   │   │   ├── AuthLayout.test.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── pages
│   │   │   ├── LoginPage.test.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.test.tsx
│   │   │   └── RegisterPage.tsx
│   │   └── states
│   │       ├── action.test.ts
│   │       ├── action.ts
│   │       ├── reducer.test.ts
│   │       └── reducer.ts
│   ├── todos
│   │   ├── api
│   │   │   ├── todoApi.test.ts
│   │   │   └── todoApi.ts
│   │   ├── components
│   │   │   ├── NavbarComponent.test.tsx
│   │   │   ├── NavbarComponent.tsx
│   │   │   ├── SidebarComponent.test.tsx
│   │   │   └── SidebarComponent.tsx
│   │   ├── layouts
│   │   │   ├── TodoLayout.test.tsx
│   │   │   └── TodoLayout.tsx
│   │   ├── modals
│   │   │   ├── AddModal.test.tsx
│   │   │   ├── AddModal.tsx
│   │   │   ├── ChangeCoverModal.test.tsx
│   │   │   ├── ChangeCoverModal.tsx
│   │   │   ├── ChangeModal.test.tsx
│   │   │   └── ChangeModal.tsx
│   │   ├── pages
│   │   │   ├── DetailPage.test.tsx
│   │   │   ├── DetailPage.tsx
│   │   │   ├── HomePage.test.tsx
│   │   │   └── HomePage.tsx
│   │   └── states
│   │       ├── action.test.ts
│   │       ├── action.ts
│   │       ├── reducer.test.ts
│   │       └── reducer.ts
│   └── users
│       ├── api
│       │   ├── userApi.test.ts
│       │   └── userApi.ts
│       ├── pages
│       │   ├── ProfilePage.test.tsx
│       │   ├── ProfilePage.tsx
│       │   ├── UsersPage.test.tsx
│       │   └── UsersPage.tsx
│       └── states
│           ├── action.test.ts
│           ├── action.ts
│           ├── reducer.test.ts
│           └── reducer.ts
├── helpers
│   ├── apiHelper.test.ts
│   ├── apiHelper.ts
│   ├── toolsHelper.test.ts
│   └── toolsHelper.ts
├── hooks
│   ├── redux.ts
│   ├── useInput.test.ts
│   └── useInput.ts
├── lib
│   └── config.ts
├── server.ts
├── setupTests.ts
├── store.test.ts
├── store.ts
├── test-utils.tsx
└── types
    ├── action.ts
    └── index.ts
```

Tahapan pengerjaan:

Unduh file `src-latihan-p4-nextjs.zip` pada link berikut: [Github](https://github.com/auxtern/itdel-praktikum/tree/main/pabwe/2026)

**a. Modul Helper & Custom Hooks:**

- `src/helpers/apiHelper.ts`: Fungsi wrapper HTTP fetch ke backend REST API, otomatisasi header `Authorization: Bearer <token>`, serta penyimpanan/pengambilan token di `localStorage`.
- `src/helpers/toolsHelper.ts`: Utilitas dialog notifikasi SweetAlert2 (`showSuccessDialog`, `showErrorDialog`, `showWarningDialog`, `showConfirmDialog`) dan helper formatting.
- `src/hooks/useInput.ts`: Custom React hook reusable untuk mengelola `state` dan `change handler` pada input form.
- `src/hooks/redux.ts`: Typed hooks `useAppDispatch` dan `useAppSelector` untuk akses Redux store secara aman bertipe data.
- `src/lib/config.ts`: Konfigurasi variabel lingkungan dan konstanta aplikasi (seperti `BASE_URL` dan `APP_PORT`).
- `src/server.ts`: Launcher server aplikasi Next.js berbasis TypeScript yang membaca port secara dinamis dari `APP_PORT` file `.env`.

**b. Modul Fitur (Feature-driven):**

- `src/features/auth/`: Modul autentikasi pengguna
  - `api/authApi.ts`: Pemanggilan endpoint login (`/auth/login`) dan register (`/auth/register`).
  - `states/`: Action creators (`action.ts`), async thunks, dan slice reducers (`reducer.ts`) (`isAuthLogin`, `isAuthRegister`, `isAuthLogout`).
  - `layouts/AuthLayout.tsx`: Shell layout antarmuka otentikasi.
  - `pages/`: Komponen halaman login (`LoginPage.tsx`) dan registrasi (`RegisterPage.tsx`).
- `src/features/todos/`: Modul manajemen tugas (Todo)
  - `api/todoApi.ts`: Pemanggilan endpoint CRUD todo, status penyelesaian, dan unggah berkas cover todo.
  - `states/`: Action creators (`action.ts`), async thunks, dan slice reducers (`reducer.ts`) (`todos`, `todo`, status tambah, ubah, cover, dan hapus).
  - `components/`: Komponen navigasi dashboard (`NavbarComponent.tsx` dan `SidebarComponent.tsx`).
  - `modals/`: Modal pop-up form tambah todo (`AddModal.tsx`), ubah todo (`ChangeModal.tsx`), dan unggah gambar cover (`ChangeCoverModal.tsx`).
  - `layouts/TodoLayout.tsx`: Shell layout dashboard yang menggabungkan navbar, sidebar, dan area konten utama.
  - `pages/`: Komponen halaman daftar todo (`HomePage.tsx`) dan rincian data todo (`DetailPage.tsx`).
- `src/features/users/`: Modul data pengguna & profil
  - `api/userApi.ts`: Pemanggilan endpoint daftar pengguna (`/users`), profil saya (`/users/me`), ubah profil, unggah foto, dan ubah kata sandi.
  - `states/`: Action creators (`action.ts`), async thunks, dan slice reducers (`reducer.ts`) profil & pengguna.
  - `pages/`: Komponen halaman daftar pengguna (`UsersPage.tsx`) dan manajemen profil akun (`ProfilePage.tsx`).

**c. Konfigurasi State Management Terpusat (Redux Store) & Providers:**

- Menyiapkan konfigurasi store utama pada `src/store.ts` menggunakan `configureStore` dari `@reduxjs/toolkit` yang menggabungkan seluruh slice reducer dari fitur `auth`, `users`, dan `todos`, serta mendefinisikan tipe `RootState` dan `AppDispatch`.
- Mendefinisikan tipe aksi dan model data pada `src/types/action.ts` dan `src/types/index.ts`.
- Membuat komponen wrapper `src/components/Providers.tsx` yang membungkus aplikasi dengan `<Provider store={store}>` (Client Component) agar Redux store dapat diakses di seluruh hierarki komponen Next.js.
- Memasang `Providers` ke dalam Root Layout aplikasi pada `src/app/layout.tsx`.

**d. Penataan Rute Aplikasi (Next.js App Router - `src/app/`):**

- Root Layout & Style (`src/app/`):
  - `layout.tsx`: Root layout yang menyertakan font, `globals.css`, dan pembungkus `Providers`.
- Auth Route Group (`src/app/auth/`):
  - `layout.tsx`: Layout untuk rute otentikasi (mengintegrasikan `AuthLayout.tsx`).
  - `login/page.tsx`: Halaman login pengguna (merender `LoginPage.tsx`).
  - `register/page.tsx`: Halaman registrasi pengguna baru (merender `RegisterPage.tsx`).
- Dashboard Route Group (`src/app/(dashboard)/`):
  - `layout.tsx`: Layout dashboard utama (mengintegrasikan `TodoLayout.tsx`).
  - `page.tsx`: Halaman Home / daftar koleksi todo (merender `HomePage.tsx`).
  - `todos/[todoId]/page.tsx`: Halaman detail todo berdasarkan parameter rute `todoId` (merender `DetailPage.tsx`).
  - `users/page.tsx`: Halaman daftar seluruh pengguna (merender `UsersPage.tsx`).
  - `profile/page.tsx`: Halaman pengaturan dan profil pengguna (merender `ProfilePage.tsx`).

**e. Penulisan Pengujian Otomatis (Testing):**

- Mengonfigurasi `src/setupTests.ts` dengan ekstensi `@testing-library/jest-dom`.
- Menyiapkan helper pengujian `renderWithProviders` pada `src/test-utils.tsx` untuk memfasilitasi render komponen bersama Redux Provider dan mock router.
- Menulis unit test dan integration test menggunakan Vitest & Testing Library untuk seluruh modul:
  - Helper & Hooks: `apiHelper.test.ts`, `toolsHelper.test.ts`, `useInput.test.ts`.
  - Modul Auth: `authApi.test.ts`, `action.test.ts`, `reducer.test.ts`, `AuthLayout.test.tsx`, `LoginPage.test.tsx`, `RegisterPage.test.tsx`.
  - Modul Todos: `todoApi.test.ts`, `action.test.ts`, `reducer.test.ts`, `NavbarComponent.test.tsx`, `SidebarComponent.test.tsx`, `AddModal.test.tsx`, `ChangeModal.test.tsx`, `ChangeCoverModal.test.tsx`, `TodoLayout.test.tsx`, `HomePage.test.tsx`, `DetailPage.test.tsx`.
  - Modul Users: `userApi.test.ts`, `action.test.ts`, `reducer.test.ts`, `UsersPage.test.tsx`, `ProfilePage.test.tsx`.
  - Store & Konfigurasi: `src/store.test.ts`.
- Menjalankan pengujian dan pelaporan cakupan kode (coverage) dengan perintah `bun run test` atau `npm test`.

#### 2.2.3 Pengujian Aplikasi

1. Pada terminal jalankan perintah:

```bash
bun run test:coverage
```

2. Pada hasil pengujian akan terdapat informasi cakupan kode (coverage).
3. Pastikan pada hasil laporan coverage semuanya **100%**.

#### 2.2.4 Menjalankan Aplikasi

1. Pada terminal jalankan perintah:

```bash
bun run dev
```

2. Setelah berhasil berjalan lihat url pada bagian local. Klik pada link tersebut, yaitu: http://localhost:3000
3. Silahkan lakukan eksplorasi mandiri terkait fitur-fitur aplikasi.

## B. Studi Kasus

### 2.2 Aplikasi Postingan menggunakan NextJS (TypeScript)

Manfaatkan endpoint berikut: https://open-api.delcom.org/docs/1.0/api-posts sebagai sumber data aplikasi. Aplikasi yang dibuat harus menggunakan bun dan framework JavaScript yaitu NextJS. Bahasa yang digunakan adalah TypeScript. Gunakan tailwind untuk UI aplikasi, kamu juga dapat memanfaatkan react-icons atau tabler-icons. Gunakan Google Font untuk tipografi aplikasi.

#### 2.2.1 Inisialisasi Proyek & Konfigurasi Lingkungan

- Buat proyek dengan format penamaan `{username}-pabwer2026-nextjs`. Contoh: `ifs18005-pabwe2026-nextjs`.
- Inisialisasi proyek Next.js menggunakan `bun create next-app` dengan template TypeScript, ESLint, dan App Router.
- Konfigurasi Tailwind CSS v4 (`@tailwindcss/postcss` dan `tailwindcss`) pada `src/app/globals.css`.
- Konfigurasi `next.config.ts` untuk mengaktifkan Turbopack dan optimasi Next.js.
- Konfigurasi server launcher pada `src/server.ts` yang membaca port secara dinamis melalui variabel `APP_PORT` dari environment `.env` atau `.env.example`.
- Menyiapkan berkas konfigurasi lingkungan `.env` dan `.env.example` yang memuat variabel `NEXT_PUBLIC_DELCOM_BASEURL` dan `APP_PORT`.
- Mengatur test runner Vitest (`vitest.config.mts`) dengan jsdom, plugin React, serta konfigurasi pelaporan cakupan kode (coverage report) berbasis v8 dengan batas minimum (threshold) 100%.

#### 2.2.2 Modul Helper & Custom Hooks

- `src/helpers/apiHelper.ts`: Fungsi wrapper HTTP fetch ke REST API Delcom yang menangani query parameters, otomatisasi bearer token (`Authorization: Bearer <token>`), serta utilitas penyimpanan dan penghapusan token di localStorage (`getAccessToken`, `putAccessToken`).
- `src/helpers/toolsHelper.ts`: Utilitas dialog notifikasi interaktif berbasis SweetAlert2 (`showSuccessDialog`, `showErrorDialog`, `showWarningDialog`, `showConfirmDialog`) serta helper pemformatan tanggal/waktu (`formatDate`).
- `src/hooks/useInput.ts`: Custom hook reusable untuk mengelola two-way data binding dan change handler pada elemen formulir input.
- `src/hooks/redux.ts`: Typed hooks `useAppDispatch` dan `useAppSelector` untuk akses Redux store secara aman bertipe data.
- `src/lib/config.ts`: Modul konfigurasi konstanta aplikasi terpusat (`DELCOM_BASEURL` dan `APP_PORT`).
- `src/server.ts`: Launcher server aplikasi Next.js berbasis TypeScript yang membaca port secara dinamis dari `APP_PORT` file `.env`.

#### 2.2.3 Arsitektur Fitur Autentikasi (`src/features/auth/`)

- `api/authApi.ts`: Pemanggilan endpoint API login (`POST /auth/login`) dan registrasi akun baru (`POST /auth/register`).
- `states/`: Action types, action creators (`action.ts`), async thunks, dan slice reducers (`reducer.ts`) (`isAuthLogin`, `isAuthRegister`, `isAuthLogout`) untuk penanganan autentikasi berbasis Redux Toolkit.
- `layouts/AuthLayout.tsx`: Shell layout antarmuka autentikasi pengguna dengan visual banner responsif dan proteksi pengalihan ke dashboard jika sesi pengguna sudah aktif.
- `pages/`: Komponen halaman login (`LoginPage.tsx`) dan registrasi (`RegisterPage.tsx`) lengkap dengan validasi formulir dan dialog umpan balik.

#### 2.2.4 Arsitektur Fitur Profil & Pengguna (`src/features/users/`)

- `api/userApi.ts`: Integrasi endpoint daftar pengguna (`GET /users`), data profil pengguna aktif (`GET /users/me`), pembaruan profil (`PUT /users/me`), unggah foto avatar (`POST /users/me/photo`), dan ubah kata sandi (`PUT /users/me/password`).
- `states/`: Action creators (`action.ts`), async thunks, dan slice reducers (`reducer.ts`) untuk mengelola state data pengguna (`users`, `user`), data profil (`profile`, `isProfile`), serta status aksi (`isChangeProfile`, `isChangeProfilePhoto`, `isChangeProfilePassword`).
- `pages/`: Halaman daftar seluruh pengguna sistem (`UsersPage.tsx`) dengan fitur pencarian dan halaman manajemen profil pengguna (`ProfilePage.tsx`) untuk pembaruan bio, foto profil, dan kata sandi.

#### 2.2.5 Arsitektur Fitur Utama Manajemen Postingan (`src/features/posts/`)

- `api/postApi.ts`: Integrasi fungsi REST API Postingan:
  - Mengambil seluruh daftar postingan (`GET /posts`) serta filter postingan milik sendiri (`is_me=1`).
  - Mengambil rincian detail postingan berdasarkan ID (`GET /posts/:id`).
  - Menambahkan postingan baru (`POST /posts`).
  - Memperbarui isi deskripsi postingan (`PUT /posts/:id`).
  - Mengunggah atau mengganti gambar cover postingan (`POST /posts/:id/cover`).
  - Menghapus postingan tertentu (`DELETE /posts/:id`).
  - Memberikan atau membatalkan suka/like (`POST /posts/:id/likes`).
  - Menambahkan komentar pada postingan (`POST /posts/:id/comments`).
  - Menghapus komentar postingan (`DELETE /posts/:id/comments`).
  - Menghapus seluruh postingan milik pengguna (`DELETE /posts`).
- `states/`: Action types, action creators (`action.ts`), async thunks, dan slice reducers (`reducer.ts`) untuk mengelola:
  - Koleksi data postingan (`posts`, `post`, `isPost`).
  - Pelacakan status mutasi aksi: tambah postingan (`isPostAdd`, `isPostAdded`), ubah postingan (`isPostChange`, `isPostChanged`), ganti cover (`isPostChangeCover`, `isPostChangedCover`), hapus postingan (`isPostDelete`, `isPostDeleted`), like/unlike (`isPostLike`, `isPostLiked`), tambah komentar (`isPostAddComment`, `isPostAddedComment`), hapus komentar (`isPostDeleteComment`, `isPostDeletedComment`), dan hapus semua postingan (`isPostDeleteAll`, `isPostDeletedAll`).
- `layouts/PostLayout.tsx`: Shell layout dashboard utama dengan navigasi bilah atas (`NavbarComponent`), bilah samping (`SidebarComponent`), mekanisme Route Guarding (verifikasi token & pemuatan sesi profil pengguna), serta area konten utama.
- `components/`: Komponen navigasi & antarmuka:
  - `NavbarComponent.tsx`: Menampilkan avatar pengguna, identitas profil aktif, dropdown navigasi, dan tombol logout.
  - `SidebarComponent.tsx`: Menampilkan navigasi rute utama (Semua Postingan, Postingan Saya, Daftar Pengguna, Profil Saya) dengan dukungan drawer responsif untuk perangkat mobile.
- `modals/`: Komponen dialog pop-up:
  - `AddModal.tsx`: Formulir modal untuk mempublikasikan postingan baru (input deskripsi).
  - `ChangeModal.tsx`: Formulir modal untuk memperbarui deskripsi postingan yang telah dibuat.
  - `ChangeCoverModal.tsx`: Modal interaktif untuk memilih, meninjau (preview), dan mengunggah berkas cover postingan baru.
- `pages/`: Halaman utama fitur:
  - `HomePage.tsx`: Dashboard linimasa postingan publik dan tab filter postingan saya (`is_me`), kolom pencarian (live search), kartu interaksi postingan (tampilan cover, nama pembuat, deskripsi, tanggal, jumlah likes & komentar), serta aksi pintas tambah postingan.
  - `DetailPage.tsx`: Halaman rincian mendalam postingan (gambar cover, profil pembuat, deskripsi lengkap, tanggal publikasi, tombol interaksi suka/like, daftar komentar, formulir kirim komentar, aksi hapus komentar, serta tombol aksi ubah cover, ubah postingan, dan hapus postingan jika milik pengguna).

#### 2.2.6 Integrasi State Management Terpusat (Redux Store) & Providers

- `src/store.ts`: Konfigurasi single store terpusat menggunakan `configureStore` dari `@reduxjs/toolkit` yang menggabungkan seluruh slice reducer dari fitur auth, users, dan posts, serta mengekspor tipe `RootState` dan `AppDispatch`.
- `src/types/`: Definisi tipe data TypeScript untuk payload action (`action.ts`) dan interface model data (`index.ts`) seperti `Post`, `PostAuthor`, `PostComment`, `User`, dan `ApiResult`.
- `src/components/Providers.tsx`: Komponen wrapper Client Component yang membungkus hierarki aplikasi dengan `<Provider store={store}>` dari react-redux.
- `src/app/layout.tsx`: Root Layout aplikasi Next.js yang mengintegrasikan font Google, berkas styling global `globals.css`, dan pembungkus `Providers`.

#### 2.2.7 Penataan Rute Aplikasi (Next.js App Router - `src/app/`)

- Root Layout & Style (`src/app/`):
  - `layout.tsx`: Root layout aplikasi yang menyertakan font, metadata, dan pembungkus `Providers`.
- Rute Autentikasi (`src/app/auth/`):
  - `layout.tsx`: Layout rute otentikasi yang membungkus `AuthLayout.tsx`.
  - `login/page.tsx`: Halaman login pengguna (merender `LoginPage.tsx`).
  - `register/page.tsx`: Halaman registrasi pengguna baru (merender `RegisterPage.tsx`).
- Rute Terproteksi Dashboard (`src/app/(dashboard)/`):
  - `layout.tsx`: Layout dashboard terproteksi yang membungkus `PostLayout.tsx`.
  - `page.tsx`: Halaman utama linimasa postingan (merender `HomePage.tsx`).
  - `posts/[postId]/page.tsx`: Halaman rincian postingan berdasarkan parameter dinamis `postId` (merender `DetailPage.tsx`).
  - `users/page.tsx`: Halaman direktori pengguna aplikasi (merender `UsersPage.tsx`).
  - `profile/page.tsx`: Halaman pengaturan akun dan profil pengguna (merender `ProfilePage.tsx`).

#### 2.2.8 Pengujian Otomatis (Unit & Integration Testing)

- Penyiapan konfigurasi environment pengujian Vitest dan jsdom pada `src/setupTests.ts` dengan ekstensi `@testing-library/jest-dom`.
- `src/test-utils.tsx`: Helper pengujian kustom (`renderWithProviders`) untuk me-render komponen yang terhubung dengan Redux Store serta navigasi Next.js.
- Penulisan skenario pengujian komprehensif pada setiap modul dengan standar cakupan (coverage) 100%:
  - Helper & Hooks: `apiHelper.test.ts`, `toolsHelper.test.ts`, `useInput.test.ts`.
  - Modul Auth: `authApi.test.ts`, `action.test.ts`, `reducer.test.ts`, `AuthLayout.test.tsx`, `LoginPage.test.tsx`, `RegisterPage.test.tsx`.
  - Modul Posts: `postApi.test.ts`, `action.test.ts`, `reducer.test.ts`, `NavbarComponent.test.tsx`, `SidebarComponent.test.tsx`, `AddModal.test.tsx`, `ChangeModal.test.tsx`, `ChangeCoverModal.test.tsx`, `PostLayout.test.tsx`, `HomePage.test.tsx`, `DetailPage.test.tsx`.
  - Modul Users: `userApi.test.ts`, `action.test.ts`, `reducer.test.ts`, `UsersPage.test.tsx`, `ProfilePage.test.tsx`.
  - Store: `src/store.test.ts`.
- Pelaksanaan pengujian otomatis melalui perintah `bun run test` atau `npm test`.