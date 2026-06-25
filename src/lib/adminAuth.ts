import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyCookieValue } from "./adminToken";

export async function verifyAdminSession(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return token ? verifyCookieValue(token) : false;
}
