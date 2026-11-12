import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// The pool is created on first use (not at import time) so that `next build`
// and pages that don't touch the database still work when DATABASE_URL is unset.
function getPool(): Pool {
  if (globalForDb.__arenaNextJsPostgresqlPool) {
    return globalForDb.__arenaNextJsPostgresqlPool;
  }
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  const pool = new Pool({ connectionString: databaseUrl });
  // Cache in every environment so serverless / repeated calls reuse one pool.
  globalForDb.__arenaNextJsPostgresqlPool = pool;
  return pool;
}

let instance: NodePgDatabase | undefined;

function getDb(): NodePgDatabase {
  instance ??= drizzle(getPool());
  return instance;
}

export const db = new Proxy({} as NodePgDatabase, {
  get(_target, prop) {
    const real = getDb();
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
