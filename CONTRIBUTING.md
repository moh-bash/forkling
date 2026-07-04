# Contributing to Forkling

> 🦎 *Forky here again. Thanks for wanting to help build this thing — I'll walk you through everything below. Nothing here is complicated, I promise.*

By participating, you're expected to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Ways to Contribute

*Forky: pick whichever of these sounds fun, no pressure to go big first.*

- 🐛 **Report a bug** — open an issue using the Bug Report template
- 💡 **Suggest a feature** — open an issue using the Feature Request template
- 🧹 **Fix a `good-first-issue`** — check the [issues labeled `good-first-issue`](../../issues?q=is%3Aopen+is%3Aissue+label%3Agood-first-issue) — *this label exists because of me, honestly*
- 📝 **Improve docs** — README, this file, or in-app copy
- 🎨 **UI/design polish** — see the design tokens in `src/styles` before introducing new colors

## Getting Set Up

> *Forky: this is the same two-minute setup from the README, copied here so you don't have to go looking for it.*

```bash
git clone https://github.com/<your-org>/forkling.git
cd forkling
npm install
npm run dev
```

The app is 100% client-side — no backend, no database, no `.env` secrets required to run it locally. If you're working on GitHub-API-heavy features (like the Network tab), add your own [Personal Access Token](https://github.com/settings/tokens) in the app's Settings panel to avoid hitting the 60 req/hour unauthenticated limit while developing.

## Project Conventions

*Forky: these are the rules I actually care about. Not because I'm precious about it — they just keep the codebase honest and consistent.*

- **No backend code.** Forkling V1 is intentionally a static SPA — all data comes from direct browser calls to the GitHub REST API and Hugging Face Hub API. Please don't introduce a server, database, or serverless function without opening a discussion issue first.
- **No hardcoded/fabricated data.** Every number shown in the UI should come from a live API response. If a data point isn't available from the API (e.g. some Hugging Face model cards lack benchmark scores), show `N/A` — never estimate or invent a value.
- **Design tokens, not one-off colors.** Use the CSS custom properties defined in `src/styles/theme.css` (`--accent-gold` for the Repo/Compare/Guide side of the app, `--accent-models` for anything under `/models`). Don't introduce new hex values inline.
- **Cache correctly.** Any new API call should go through the shared `fetchWithCache()` utility in `src/api/cache.js` (1-hour TTL) rather than calling `fetch()` directly, to respect rate limits.
- **My voice, when it's used.** I show up in empty states, loading states, and the 404 page with one short, light line of copy (e.g. "Forky couldn't find anything here"). Keep it brief — one sentence, never a multi-line monologue from me. I'm a mascot, not a narrator.

## Submitting a Pull Request

1. Fork the repo and create a branch off `main`: `git checkout -b fix/short-description`
2. Make your change, and test it locally with `npm run dev`
3. Keep PRs focused — one fix or feature per PR is much easier to review than a large bundle of unrelated changes
4. Fill out the PR template (what changed, why, and how you tested it)
5. Link the issue your PR addresses, if there is one (`Closes #123`)
6. Be responsive to review feedback — small, iterative changes get merged faster than one big perfect-on-the-first-try PR

## Commit Style

Plain, descriptive commit messages are fine — no strict convention enforced, but please avoid vague messages like `fix stuff` or `update`. Prefer something like:

```
Fix rate-limit banner not updating after PAT is added
Add license badge to model detail page
```

## Questions?

Open a [Discussion](../../discussions) or comment on the relevant issue — no question is too small.

---

> 🦎 *Forky: that's everything. Go build something. And thank you, genuinely, for spending your time on this.*
