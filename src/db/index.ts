
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;
console.log(
  "[DB HOST CHECK]:",
  databaseUrl ? new URL(databaseUrl).hostname : "MISSING"
);

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

pool.on("error", (error) => {
  console.error("[Database] Unexpected pool error:", error);
});

export const db = drizzle(pool);
export { pool };
