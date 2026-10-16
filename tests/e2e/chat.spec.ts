import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  // Even an existing public analytics key in a build must not send test data live.
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (["127.0.0.1", "localhost", "jordanhenning.com"].includes(url.hostname) && ["3210", "3211"].includes(url.port)) {
      return route.continue();
    }
    return route.abort();
  });
});

async function openChat(page: Page, url = "/") {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url);
  await page.getByRole("button", { name: "Ask about Jordan", exact: true }).click();
  return errors;
}

test("browser on jordanhenning.com: real route and Anthropic SDK stream incrementally and input re-enables", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://jordanhenning.com:3210/");
  await page.getByRole("button", { name: "Ask about Jordan", exact: true }).click();
  const input = page.getByRole("textbox");
  await input.fill("slow stream");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.getByText("A streamed", { exact: true })).toBeVisible();
  await input.fill("next message");
  await expect(page.getByRole("button", { name: "Send", exact: true })).toBeDisabled();
  await request.get("http://127.0.0.1:3211/finish-stream");
  await expect(page.getByText("A streamed reply.", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
  expect(errors).toEqual([]);
});

for (const status of [429, 403]) {
  test(`widget: ${status} shows server error in last bubble, re-enables Send, and permits another message`, async ({ page }) => {
    await page.route("**/api/chat", (route) => route.fulfill({ status, contentType: "application/json", body: JSON.stringify({ error: `Friendly ${status} response` }) }));
    const errors = await openChat(page);
    const input = page.getByRole("textbox");
    await input.fill("hi");
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.getByText(`Friendly ${status} response`, { exact: true })).toBeVisible();
    await expect(page.getByText("hi", { exact: true })).toBeVisible();
    await input.fill("follow up");
    await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.getByText(`Friendly ${status} response`, { exact: true })).toHaveCount(2);
    expect(errors).toEqual([]);
  });

  test(`widget: ${status} malformed JSON uses friendly fallback`, async ({ page }) => {
    await page.route("**/api/chat", (route) => route.fulfill({ status, body: "not JSON" }));
    const errors = await openChat(page);
    await page.getByRole("textbox").fill("hi");
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.getByText(status === 429 ? "You've sent a lot of messages in a short time. Wait a minute and try again." : "This chat only works from jordanhenning.com.", { exact: true })).toBeVisible();
    await page.getByRole("textbox").fill("retry");
    await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
    expect(errors).toEqual([]);
  });

  test(`widget: ${status} non-string error uses friendly fallback`, async ({ page }) => {
    await page.route("**/api/chat", (route) => route.fulfill({
      status, contentType: "application/json", body: JSON.stringify({ error: { private: "PRIVATE-SERVER-DETAIL" } }),
    }));
    const errors = await openChat(page);
    await page.getByRole("textbox").fill("hi");
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.getByText(status === 429 ? "You've sent a lot of messages in a short time. Wait a minute and try again." : "This chat only works from jordanhenning.com.", { exact: true })).toBeVisible();
    await expect(page.getByText("PRIVATE-SERVER-DETAIL")).toHaveCount(0);
    await page.getByRole("textbox").fill("retry");
    await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
    expect(errors).toEqual([]);
  });
}

for (const status of [302, 400, 401, 404, 500, 502, 503]) {
  test(`widget: ${status} never renders private response body`, async ({ page }) => {
    await page.route("**/api/chat", (route) => route.fulfill({ status, contentType: "application/json", body: JSON.stringify({ error: "PRIVATE-SERVER-DETAIL" }) }));
    const errors = await openChat(page);
    await page.getByRole("textbox").fill("hi");
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.getByText(/Sorry — the concierge isn't available right now\. Try/)).toBeVisible();
    await expect(page.getByText("PRIVATE-SERVER-DETAIL")).toHaveCount(0);
    await page.getByRole("textbox").fill("retry");
    await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
    expect(errors).toEqual([]);
  });
}

for (const status of [429, 403]) {
  test(`widget edge: ${status} blank error uses friendly fallback`, async ({ page }) => {
    let serverError = "";
    await page.route("**/api/chat", (route) => route.fulfill({
      status, contentType: "application/json", body: JSON.stringify({ error: serverError }),
    }));
    const errors = await openChat(page);
    const fallback = status === 429
      ? "You've sent a lot of messages in a short time. Wait a minute and try again."
      : "This chat only works from jordanhenning.com.";
    for (const [index, value] of ["", " \t\n "].entries()) {
      serverError = value;
      await page.getByRole("textbox").fill(`blank error ${index}`);
      await page.getByRole("button", { name: "Send", exact: true }).click();
      await expect(page.getByText(fallback, { exact: true })).toHaveCount(index + 1, { timeout: 3000 });
      await page.getByRole("textbox").fill("retry");
      await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
    }
    expect(errors).toEqual([]);
  });
}

test("browser: actual upstream 401 becomes only generic stream text", async ({ page }) => {
  const errors = await openChat(page, "http://jordanhenning.com:3210/");
  await page.getByRole("textbox").fill("force upstream failure");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.getByText(/Sorry — the concierge hit a problem reaching the model\./)).toBeVisible();
  await expect(page.getByText("PRIVATE-UPSTREAM-DETAIL")).toHaveCount(0);
  await page.getByRole("textbox").fill("retry");
  await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
  expect(errors).toEqual([]);
});

test("HTTP: foreign and absent origin return 403; 15-post burst is ten 200 then five 429", async ({ request }) => {
  const before = (await (await request.get("http://127.0.0.1:3211/calls")).json()).calls;
  const originCases: Record<string, string>[] = [{ Origin: "https://evil.example" }, {}];
  for (const headers of originCases) {
    const response = await request.post("/api/chat", { headers, data: { messages: [{ role: "user", content: "hi" }] } });
    expect(response.status()).toBe(403);
    expect((await response.json()).error).toBe("This chat only works from jordanhenning.com.");
  }
  expect((await (await request.get("http://127.0.0.1:3211/calls")).json()).calls).toBe(before);
  const statuses = [];
  for (let i = 0; i < 15; i++) {
    const response = await request.post("/api/chat", {
      headers: { Origin: "https://jordanhenning.com", "x-real-ip": "198.51.100.99" },
      data: { messages: [{ role: "user", content: "hi" }] },
    });
    statuses.push(response.status());
    if (i >= 10) {
      expect(response.headers()["retry-after"]).toMatch(/^\d+$/);
      expect((await response.json()).error).toContain("Wait a minute");
    } else expect(await response.text()).toBe("A streamed reply.");
  }
  expect(statuses).toEqual([...Array(10).fill(200), ...Array(5).fill(429)]);
  expect((await (await request.get("http://127.0.0.1:3211/calls")).json()).calls).toBe(before + 10);
});

test("browser: mobile chat and adjacent playbook render without runtime errors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = await openChat(page);
  await expect(page.getByRole("textbox")).toBeVisible();
  await page.getByRole("button", { name: "Close chat", exact: true }).click();
  await expect(page.getByRole("textbox")).toHaveCount(0);
  await page.goto("/playbook");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("90");
  expect(errors).toEqual([]);
});
