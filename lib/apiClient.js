export async function createData(resource, payload) {
  const res = await fetch(`/api/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error(
      await res.text().catch(() => `Failed to create ${resource}`)
    );
  return res.json();
}

export async function updateData(resource, id, payload) {
  const res = await fetch(`/api/${resource}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error(
      await res.text().catch(() => `Failed to update ${resource}`)
    );
  return res.json();
}

export async function deleteData(resource, id) {
  const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
  if (!res.ok)
    throw new Error(
      await res.text().catch(() => `Failed to delete ${resource}`)
    );
  return res.json();
}

/** Upload to Vercel Blob */
export async function uploadFile(file, { folder = "misc" } = {}) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/blob/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error(await res.text().catch(() => "Upload failed"));
  return res.json(); // -> { url, pathname, size, ... }
}

/** Delete a blob by its public URL */
export async function deleteBlob(url) {
  if (!url) return { skipped: true };
  const res = await fetch("/api/blob/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok)
    throw new Error(await res.text().catch(() => "Blob delete failed"));
  return res.json(); // { success: true }
}
