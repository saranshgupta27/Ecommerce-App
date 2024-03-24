export const fetchMockedApi = async (
  url: string,
  method = "GET",
  body?: unknown,
) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return (await response.json()) as Record<string, unknown>;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("API request failed");
  }
};
