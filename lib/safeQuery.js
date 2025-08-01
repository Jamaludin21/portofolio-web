/**
 * Wraps any async DB call with try/catch and optional timeout.
 * @param {() => Promise<any>} fn - The async function to execute (e.g. a Prisma query).
 * @param {object} options
 * @param {number} [options.timeout=5000] - Timeout in ms (default 5s)
 * @param {any} [options.fallback=null] - Fallback value to return on error
 * @param {boolean} [options.log=true] - Whether to log the error
 * @returns {Promise<any>} The result of the function or fallback value
 */
export async function safeQuery(
  fn,
  { timeout = 5000, fallback = null, log = true } = {}
) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );

  try {
    return await Promise.race([fn(), timeoutPromise]);
  } catch (err) {
    if (log) console.error("[safeQuery] DB error:", err.message || err);
    return fallback;
  }
}
