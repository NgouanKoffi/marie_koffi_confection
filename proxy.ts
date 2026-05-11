import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en"] as const;
const defaultLocale = "fr";

function detectLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept
    .split(",")
    .map((s) => s.split(";")[0].trim().toLowerCase().split("-")[0])
    .find((code) => (locales as readonly string[]).includes(code));
  return preferred ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  if (hasLocale) return;

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|api|.*\\.(?:png|jpe?g|gif|svg|ico|webp|avif|webmanifest|txt|xml)).*)",
  ],
};
