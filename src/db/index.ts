import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsDrizzle?: NodePgDatabase<Record<string, never>>;
};

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  return databaseUrl;
}

// Lazily create the connection pool and drizzle instance only when
// first accessed. This allows the module to be imported at build time
// (e.g. during Next.js page-data collection) without a DATABASE_URL
// being present. The error only surfaces at runtime when the database
// is actually used.
function getDb(): NodePgDatabase<Record<string, never>> {
  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = new Pool({
      connectionString: getDatabaseUrl(),
    });
  }
  if (!globalForDb.__arenaNextJsDrizzle) {
    globalForDb.__arenaNextJsDrizzle = drizzle(globalForDb.__arenaNextJsPostgresqlPool);
  }
  return globalForDb.__arenaNextJsDrizzle;
}

export const db = new Proxy({} as NodePgDatabase<Record<string, never>>, {
  get(_target, prop) {
    const realDb = getDb();
    const value = Reflect.get(realDb, prop);
    return typeof value === "function" ? value.bind(realDb) : value;
  },
});