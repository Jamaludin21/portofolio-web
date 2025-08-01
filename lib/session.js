import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.AUTH_SECRET || "dev-secret";

export async function createSession(user) {
  const token = jwt.sign(
    {
      id: user.id,
      full_name: user.name,
      username: user.username,
      email: user.email,
    },
    SECRET,
    { expiresIn: "7d" }
  );

  return { token };
}

export async function verifySession(token) {
  return new Promise((resolve) => {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return resolve(null);
      resolve(decoded);
    });
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  return verifySession(token);
}
