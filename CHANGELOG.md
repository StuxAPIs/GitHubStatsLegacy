# Changelog

All notable changes made in the StuxAPIs fork of GitHub Readme Stats
(the legacy, pre-Extended codebase) are documented here, tracking this
fork independently of upstream's own release history. For upstream
history, see [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Date Versioning](https://datevers.ing) since v26.10.23 (`YY.MM.DD`, the UTC release date, with `-1`, `-2`… for later releases the same day); earlier releases used [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Started at v1.1.7 rather than v1.0.0 — this fork's git history carries
upstream's own release tags up through v1.1.6, so anything at or below
that would collide with an existing tag.

## v26.10.23

### Added

- `tests/version.sh`, which checks that `VERSION.md` is a valid Date Version, a real calendar date not in the future, and the same as the newest entry in this changelog

### Changed

- Switched from Semantic Versioning to [Date Versioning](https://datevers.ing): releases are numbered by their UTC release date as `YY.MM.DD`, with `-1`, `-2`… for later releases the same day. This release follows v1.1.9
- `commit.sh` and `commit.bat` refuse a `VERSION.md` that isn't a valid Date Version or is dated in the future (UTC), and warn when it's dated before today
- `README.md` and `CONTRIBUTING.md` describe Date Versioning and the release steps

## v1.1.9

### Changed

- The logos and icons in the Markdown docs (README and the like) follow GitHub's light or dark theme, using each brand's `logo-light`/`logo-dark` and `icon-light`/`icon-dark` files

## v1.1.8

### Security
- The WakaTime card's `api_domain` query parameter was used as-is to build the server-side request URL, letting anyone make the server fetch arbitrary hosts (SSRF). It's now restricted to an allowlist — `wakatime.com`, `wakapi.dev`, `hackatime.hackclub.com` — and anything else (other hosts, IPs, `localhost`, embedded credentials, custom ports) is rejected with a "Supported api_domain values" error card; `readme.md` documents the allowed values
- The WakaTime `username` is now URL-encoded in the request path, so values like `../../admin?x=` can't rewrite the API path or query

## v1.1.7

### Fixed
- `readme.md`'s Stux.Group brand icon URL had a leftover duplicated `/global/` path segment (`global.media.stux.group/global/icon.png`) — corrected to `https://global.media.stux.group/icon.png`
