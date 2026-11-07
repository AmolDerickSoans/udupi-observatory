# Lead intake deployment

The workspace is local to the browser unless a public intake endpoint is configured. Shared intake requires a Cloudflare account, D1 database, Worker and rate-limit binding. No credentials belong in frontend code.

1. Create a D1 database named `coastalledger-leads` and replace `database_id` in `backend/wrangler.jsonc` with its ID.
2. Apply `backend/schema.sql` to that database, set `ADMIN_TOKEN` as a Worker secret, then deploy `backend/` using the pinned project Wrangler version.
3. Supply the deployed Worker URL as `apiUrl` to `initLeadsWorkspace`. The allowed browser origins are `https://amoldericksoans.github.io`, `http://localhost:5173` and `http://127.0.0.1:5173`, `http://127.0.0.1:4173` and `http://127.0.0.1:4174`. Edit the allowlist deliberately for other origins.
4. Verify POST `/api/intake` returns 201 and the protected GET `/api/leads` returns 401 without a token before sharing the form. Retrieve submissions server-side with `Authorization: Bearer <ADMIN_TOKEN>`; never embed the token in frontend source, a URL, browser storage or a repository. The management endpoint returns the latest 500 records with JSON `payload` strings; the owner may explicitly pull these into the local workspace using a session-only token. This is not automatic sync.

Intake accepts JSON `title` and `locationApprox` (required), `locationPrecision` (`approximate`, `locality`, or `exact`), and optional `sourceUrl`, `price`, `area`, `developer`, `notes`, `contact`, `consent`, `website` (honeypot). Contact requires `consent: true`. The endpoint limits request size, validates fields and URLs, and uses Cloudflare's approximate per-location rate limiter. CORS is a browser access control, not authentication. Public submissions are unverified and require review. No sensitive values are logged by the application. The owner controls stored records in the separate D1 database; browser exports and local copies are separate records.
