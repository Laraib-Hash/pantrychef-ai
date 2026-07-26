const API_URL =
  "https://script.google.com/macros/s/AKfycbwTvn_8uZ2GAaqqwUdmWZVR4x946OO4A--GcRKA64eK-UaJ1g5O93H-v7A6LhSRnP0S3Q/exec";


// ===============================
// GET INGREDIENTS
// ===============================

export async function getIngredients() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load ingredients");
  }

  return await response.json();
}


// ===============================
// ADD INGREDIENT
// ===============================

export async function addIngredient(data) {

  const form = new FormData();

  form.append("action", "add");

  Object.entries(data).forEach(([key, value]) => {
    form.append(key, value ?? "");
  });

  const response = await fetch(API_URL, {
    method: "POST",
    body: form,
  });

  return await response.json();
}


// ===============================
// UPDATE INGREDIENT
// ===============================

export async function updateIngredient(data) {

  const form = new FormData();

  form.append("action", "update");

  Object.entries(data).forEach(([key, value]) => {
    form.append(key, value ?? "");
  });

  const response = await fetch(API_URL, {
    method: "POST",
    body: form,
  });

  return await response.json();
}


// ===============================
// DELETE INGREDIENT
// ===============================

export async function deleteIngredient(row) {

  const form = new FormData();

  form.append("action", "delete");
  form.append("row", row);

  const response = await fetch(API_URL, {
    method: "POST",
    body: form,
  });

  return await response.json();
}