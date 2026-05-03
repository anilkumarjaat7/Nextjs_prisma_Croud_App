import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Mark this route as dynamic - don't prerender at build time
export const dynamic = "force-dynamic";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
