import db from "@/components/lib/db";

export function createUser(first_name, last_name, email, password) {
  const result = db
    .prepare(
      "INSERT INTO users(first_name, last_name,email, password) VALUES (?,?,?, ?)"
    )
    .run(first_name, last_name, email, password);
  return result.lastInsertRowid;
}

export function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function AddProfileDetails(username, bio, imageUrl, email) {
  const result = db.prepare(
    "UPDATE users SET username = ?, bio = ?, image_url = ? WHERE email = ?"
  );

  return result.run(username, bio, imageUrl, email);
}
