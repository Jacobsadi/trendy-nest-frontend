const BASE_URL = "http://localhost:3004/users";

export async function getAllUsers() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
}

export async function getUserById(userId: string) {
  const res = await fetch(`${BASE_URL}/${userId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("User not found");
  return await res.json();
}

export async function createOrFindUser(data: {
  id: string;
  email: string;
  name?: string;
  role?: string;
  addresses?: any;
}) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create or find user");
  return await res.json();
}

export async function updateUser(userId: string, data: Record<string, any>) {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update user");
  return await res.json();
}

export async function deleteUser(userId: string) {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete user");
  return await res.json();
}
