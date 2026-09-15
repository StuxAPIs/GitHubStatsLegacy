# Changelog

All notable changes made in the StuxAPIs fork of GitHub Readme Stats
(the legacy, pre-Extended codebase) are documented here, tracking this
fork independently of upstream's own release history. For upstream
history, see [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Started at v1.1.7 rather than v1.0.0 — this fork's git history carries
upstream's own release tags up through v1.1.6, so anything at or below
that would collide with an existing tag.

## v1.1.7

### Fixed
- `readme.md`'s Stux.Group brand icon URL had a leftover duplicated `/global/` path segment (`global.media.stux.group/global/icon.png`) — corrected to `https://global.media.stux.group/icon.png`
