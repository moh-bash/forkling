# Security Policy

## Reporting a Vulnerability

Forkling is a client-side-only app (no backend, no database, no server-side secrets), which limits the attack surface, but we still take security seriously — especially around how user-supplied tokens (GitHub PAT, Hugging Face token) are handled.

If you find a security issue — for example, a way user tokens could leak, be exposed to a third party, or be exfiltrated via a malicious repo/model response — please **do not open a public issue**. Instead:

- Email: [insert security contact email]
- Or use GitHub's private vulnerability reporting (Security tab → "Report a vulnerability") if enabled on this repo

Please include:
- A description of the issue and its potential impact
- Steps to reproduce, if possible
- Any suggested fix, if you have one

We'll aim to acknowledge reports within a few days and keep you updated as we work on a fix.

## Scope

Since Forkling has no backend, most traditional server-side vulnerability classes don't apply. Areas of particular interest:
- Token handling (localStorage exposure, accidental logging, XSS that could exfiltrate a stored PAT/HF token)
- Dependency vulnerabilities (please also feel free to open a normal issue/PR for outdated dependencies flagged by `npm audit` or Dependabot)
- Any way third-party API responses (GitHub, Hugging Face) could be used to inject malicious content into the rendered UI
