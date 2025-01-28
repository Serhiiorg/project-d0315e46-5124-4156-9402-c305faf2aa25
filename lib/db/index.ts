import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env.mjs";
export const client = postgres({
          host: env.PGHOST,
          port: +env.PGPORT!,
          database: 'project-d0315e46-5124-4156-9402-c305faf2aa25',
          username: env.PGUSERNAME,
          password: env.PGPASSWORD,
          ssl: require
        });
export const db = drizzle(client)
