export const API_URL = "https://gateway.scan-interfax.ru/api/v1";
export async function loginRequest(login, password) {
    const res = await fetch(`${API_URL}/account/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }), // ✅ не loginInput
    });
    if (!res.ok)
        throw new Error("Login failed");
    return res.json();
}
