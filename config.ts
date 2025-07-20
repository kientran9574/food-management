import * as z from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  DB_USER: z.string(),
});
// kiểm tra xem có khớp với config schema hay không ?
const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  DB_USER: process.env.DB_USER,
});
if (!configProject.success) {
  console.error("Invalid environment variables:", configProject.error.format());
  throw new Error("Invalid environment variables");
}
const envConfig = configProject.data;
export default envConfig;
