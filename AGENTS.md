<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Anti-Hallucination Rules

These are hard rules. Violating any of them wastes time and produces wrong code.

### Never Assume Data
- If you don't know the shape of an API response, **verify it against `src/lib/types.ts` and the backend route** before using it. Do not guess field names or response shapes.
- If a file path is mentioned but you haven't read it, **read it before acting on it**.
- If a model field, method, or setting is referenced, **verify it exists** in the actual code before using it.
- "Should be", "probably", "I assume" — stop and verify instead.

### Never Implement Without Consensus
- Do not write production code for a feature not explicitly requested. Discussion and planning are not implementation requests.
- Before writing code for a new feature or refactor, **confirm the approach** with the user. Present the plan, get a "go ahead."
- If the user asks "what do you think?", give analysis — not implementation. Wait for an explicit direction.
- Exception: fixing bugs the user explicitly asked to fix, or wiring existing data into templates per a written plan the user approved.

### Never Fabricate References
- Do not invent package names, API endpoints, CLI commands, or config keys. If you're not sure a command exists, look it up.
- Do not cite documentation pages you haven't read. If the user needs a reference, provide a real URL or say you don't know.

### When Uncertain, Ask
- If a request is ambiguous, **ask the user**. Do not pick an interpretation and run with it.
- If you're about to make a change that affects more than 5 files, summarize the exact blast radius and confirm before touching anything.

### Read Before Writing
- Before editing any file, read it first. Do not assume you know its contents from memory or from a similar file.
- Before proposing architecture, read the existing code in that area. The answer is often already in the codebase.

### Communication Style
- Say "I don't know" — never guess, never bluff.
- No fluff. No preambles ("Certainly!", "Great question!", "I'd be happy to"). Get to the point.
- One sentence answers when that's all the user needs. Don't pad.
- Cite sources for factual claims. Real URLs or silence.
- Challenge bad requirements directly. "This will cause X problem" — don't quietly implement something broken.

### Code and Plan Reviews
- Default review output is exactly: `Go ahead.`
- Raise an issue only when the plan has a logical flaw that will prevent its stated goal, the code has a bug that will cause wrong behavior, a crash, or a race condition, or there is a security or data-loss risk.
- If none of those conditions apply, reply only `Go ahead.` Do not suggest improvements, style changes, alternatives, optimizations, or nice-to-haves unless the user explicitly asks for them.
- When raising issues, report every issue that meets the threshold above in one review. For each issue, state only what breaks and why. Do not provide rewrites unless asked.
- If uncertain whether something is a real bug, say `I'm not certain, but check X` instead of presenting it as a problem.
- Review only the currently approved work item and its acceptance criteria. A blocking finding must cite the changed code, the violated current requirement, and the concrete failure it causes now. Future-work requirements must not be imposed on the current PR. Plan conflicts may be reported separately as "roadmap gaps," but they do not block the current PR unless the current implementation makes them impossible.

### Finding Verification Discipline
- Investigate silently before reporting. Never include provisional findings, self-corrections, or stream-of-consciousness reasoning in a review.
- Before raising a finding, trace the complete execution order, inspect the relevant framework behavior, and check whether the existing code or a merged spec under `docs/` already accounts for it.
- A finding must include reproducible evidence: an executed command, an observed response or log line, or an exact code path demonstrating the failure.
- Track resolved findings from the current task. Do not raise them again unless the relevant code changed or new reproducible evidence contradicts the previous resolution.
- If investigation disproves a suspected issue, omit it entirely from the review.
- If no verified blocking findings remain, respond exactly: `Go ahead.`

### TDD & Bug Fixes
- When there's a bug: reproduce it first, then fix until the reproduction is clean. Never fix without a reproduction. There is no test runner in this repo, so reproduce with the dev server, a build, or a direct request against the API, and state the reproduction in the PR.
- After writing code, list the edge cases and suggest test cases to cover them.
- Let errors surface. No empty `catch` blocks, no swallowed errors. A caught error must be rethrown, or handled in a way a doc under `docs/` specifies, and it must be logged.
- When corrected: reflect on what you did wrong and come up with a plan to never make the same mistake again.

### Code Quality
- Simplest solution wins. No overengineering, no "future-proofing" for features that don't exist.
- Show complete code — no "// ... unchanged" gaps. Every line or nothing.
- Remove code instead of commenting it out. Dead code rots. Git remembers.
- All import statements at the top of the file. Never mid-function imports.
- Never use magic numbers — use named constants with meaningful names.
- Write production-ready code. Never use sample data, placeholder values, or `lorem ipsum` unless explicitly told to.
- Avoid unnecessary comments. Code should be self-documenting. Comments explain why, not what.
- Prefer implementation units of 5 files or fewer. For changes affecting 6–10 files, summarize the exact blast radius and get approval before editing. For changes affecting more than 10 files, split the work unless it is one indivisible mechanical change, such as a model rename.
- Every implementation unit must finish with `npx tsc --noEmit` and `npm run build` passing. `npm run lint` must introduce no new errors; it has 4 pre-existing ones in `LiveMap.tsx`, `Reveal.tsx`, and `SignupForm.tsx`.

---

## Security Rules

### Secrets
- Never write API keys, tokens, or passwords into code, config files, or components
- Local configuration goes in `.env.local`. `.gitignore` covers it via `.env*`; only `.env.local.example` is committed
- `NEXT_PUBLIC_*` values are exposed to the browser and must never hold a secret. The API base URL and the Mapbox `pk` token are public; a Mapbox `sk` token is not


## When These Rules Conflict

1. Anti-hallucination rules beat everything. Wrong code is worse than slow code.
2. Security beats scalability. Don't cache secrets. Don't optimize auth checks away.
3. For everything else: read the code first, confirm with the user, then implement.


### Git
- Verb-first commit messages: `fix:`, `feat:`, `refactor:`, `docs:`, `chore:`