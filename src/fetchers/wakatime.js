// @ts-check

import axios from "axios";
import { CustomError, MissingParamError } from "../common/error.js";

/**
 * Hosts the WakaTime card is allowed to fetch from. `api_domain` comes
 * straight from the request's query string, so without this allowlist it
 * could be used to make the server request arbitrary hosts (SSRF).
 *
 * @type {string[]}
 */
const ALLOWED_API_HOSTS = [
  "wakatime.com",
  "wakapi.dev",
  "hackatime.hackclub.com",
];

/**
 * Resolves and validates the WakaTime API domain.
 *
 * @param {string=} api_domain Optional user supplied API domain (host, optionally followed by a path).
 * @returns {string} The API base, without protocol or trailing slash.
 */
const resolveApiDomain = (api_domain) => {
  if (!api_domain) {
    return "wakatime.com";
  }
  const domain = api_domain.replace(/\/$/gi, "");
  let url;
  try {
    url = new URL(`https://${domain}`);
  } catch {
    throw new CustomError(
      "Unsupported WakaTime API domain",
      "WAKATIME_INVALID_API_DOMAIN",
    );
  }
  if (
    url.username ||
    url.password ||
    url.port ||
    !ALLOWED_API_HOSTS.includes(url.hostname.toLowerCase())
  ) {
    throw new CustomError(
      "Unsupported WakaTime API domain",
      "WAKATIME_INVALID_API_DOMAIN",
    );
  }
  return domain;
};

/**
 * WakaTime data fetcher.
 *
 * @param {{username: string, api_domain: string }} props Fetcher props.
 * @returns {Promise<import("./types").WakaTimeData>} WakaTime data response.
 */
const fetchWakatimeStats = async ({ username, api_domain }) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const apiDomain = resolveApiDomain(api_domain);

  try {
    const { data } = await axios.get(
      `https://${apiDomain}/api/v1/users/${encodeURIComponent(
        username,
      )}/stats?is_including_today=true`,
    );

    return data.data;
  } catch (err) {
    if (err.response.status < 200 || err.response.status > 299) {
      throw new CustomError(
        `Could not resolve to a User with the login of '${username}'`,
        "WAKATIME_USER_NOT_FOUND",
      );
    }
    throw err;
  }
};

export { fetchWakatimeStats };
export default fetchWakatimeStats;
