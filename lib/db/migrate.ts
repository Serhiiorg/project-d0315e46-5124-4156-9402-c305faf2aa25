import { env } from "@/lib/env.mjs";
  
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";


const runMigrate = async () => {
  if (!env.PGDATABASE) {
    throw new Error("PGDATABASE is not defined");
  }

  const sql = postgres({
          host: env.PGHOST,
          port: +env.PGPORT!,
          database: env.PGDATABASE,
          username: env.PGUSERNAME,
          password: env.PGPASSWORD,
          // ssl: "require"
        });
  
  console.log("⏳ Running migrations...");
  
  const start = Date.now();
  await sql`CREATE DATABASE kindgi_exported_project;`
  
const connection = postgres({
          host: env.PGHOST,
          port: +env.PGPORT!,
          database: 'project-d0315e46-5124-4156-9402-c305faf2aa25',
          username: env.PGUSERNAME,
          password: env.PGPASSWORD,
          // ssl: "require"
        });

const db = drizzle(connection);

  await migrate(db, { migrationsFolder: 'lib/db/migrations' });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});