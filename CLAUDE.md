# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Next.js)
npm run build     # Production build
npm run lint      # ESLint
```

No test suite exists.

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PIN=                    # 6-digit PIN for admin login
ADMIN_SESSION_SECRET=         # Secret for HMAC cookie signing
NEXT_PUBLIC_WHATSAPP_NUMBER=  # E.164 number without +
```

## Architecture

**Next.js 15 App Router** with TypeScript and Tailwind CSS. No pages router, no API routes — all data fetching is in Server Components or Server Actions.

### Supabase client split (critical)

Three separate clients in `src/lib/supabase/`:

| File | Usage | Key |
|------|-------|-----|
| `client.ts` | Browser/client components | anon key |
| `server.ts` | Server Components (async, cookie-aware) | anon key |
| `service.ts` | Server Actions only — bypasses RLS | service role key |

**Always use `createServiceClient()` in Server Actions** that write data (products, testimonials, image uploads). Never import `service.ts` in client components.

### Admin authentication

Custom PIN-based auth — **no Supabase Auth involved**. Flow:

1. Admin enters PIN at `/admin/login` → `loginAction` checks against `ADMIN_PIN` env var
2. On success, sets `admin_session` cookie with HMAC-SHA256 token (signed with `ADMIN_SESSION_SECRET` over the PIN)
3. `middleware.ts` guards all `/admin/*` routes by verifying the cookie on every request

Auth helpers: `src/lib/adminToken.ts` (token compute/verify), `src/lib/adminAuth.ts` (server-side cookie check for Server Components).

### Cart & checkout

Cart lives entirely in `localStorage` via `src/lib/cart.ts` (pure functions) and `src/lib/CartContext.tsx` (React context). No server state. Checkout is a WhatsApp redirect — `src/lib/whatsapp.ts` builds the `wa.me` URL with the order summary.

### Data model

Two main Supabase tables:

- **products** — `name`, `description`, `price`, `category` (`"keychain"` | `"canvas"`), `images` (string[]), `is_featured`, `in_stock`
- **testimonials** — managed by admin, `is_published` flag controls public visibility

Product images are stored in Supabase Storage bucket `product-images`. The public URL hostname is hardcoded in `next.config.ts` for Next.js `<Image>` — update it there if the Supabase project changes.

### Public site structure

Home page (`src/app/page.tsx`) is a Server Component with `revalidate = 60` (ISR). It fetches products and testimonials server-side and passes them to client sections. The hero image comes from the first featured in-stock product.

### Design system

Tailwind extended palette in `tailwind.config.ts`: blush/rose-gold/cream tones. Two font families:
- `font-display` → Cormorant Garamond (headings, editorial text)
- `font-body` → DM Sans (UI, body copy)

### Component organization

- `src/components/public/` — customer-facing UI
- `src/components/admin/` — admin dashboard forms and tables (ProductForm, TestimonialForm, etc.)
- `src/app/admin/*/actions.ts` — Server Actions for all admin writes
