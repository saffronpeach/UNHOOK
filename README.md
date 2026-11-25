# Escape the Loop 🎮🧠

**One moment. One choice.**

Escape the Loop is a mobile-friendly progressive web app (PWA) that explores whether short, CBT-informed games, brief reflective check-ins, and small real-world actions can help people make more intentional choices about unwanted scrolling. It is designed with ADHD-related attention and task-transition difficulties in mind, but no diagnosis is required to try the prototype.

> **Important:** This is an educational, behavioral-health *prototype*, **not** a medical device, ADHD treatment, diagnostic tool, or substitute for a licensed clinician. The effectiveness of this app has **not** been clinically validated.
> 
**Live Demonstration**
Watch UNHOOK in action: https://youtu.be/fwenJaQ9G2U

## Features

- **Start Unhook:** One focused action on the home screen. Identify a trigger, consider what you are seeking, take an optional pause, and choose what to do next.
- **AI recommendations:** Optionally request a game recommendation and a small next action based on a brief check-in. A local, rule-based alternative works without an API key.
- **Nine standalone skill games:** Each starts with a short CBT-informed self-reflection (trigger, belief rating, urge rating), continues to a playable challenge, and ends with an optional offline mission. Games include Thought Detective, Focus Runner, Infinite Snack Machine, Boredom Blob, Procrastination Dragon, Reward Experiment, Just One More, Notification Ninja, and Tiny Step Quest.
- **AI Behavioral Coach (V20):** Optionally ask **one reflective question before** a game and get **a short follow-up reflection afterward**. Users may opt in to sharing a brief summary of up to five previously rated games to personalize the response.
- **Learn:** Five short psychology-inspired micro-lessons with reflections.
- **Journey:** Locally saved game completions, feedback and selected insights; export, import, or erase local progress.
- **ReelWorld demo:** A **fictional**, finite social-media feed demonstrating how an Unhook prompt could appear before scrolling. The PWA **cannot** monitor, intercept, or block Instagram, TikTok, or other installed apps.

## Requirements

- **Node.js 20 or later** and npm
- A modern browser (Chrome, Edge, Firefox, or Safari)
- Optional: an **OpenAI API key** for model-generated recommendations and coaching. OpenAI API billing is separate from a ChatGPT subscription.

## Quick start

1. Clone this repository and enter the application folder:

   ```bash
   git clone https://github.com/saffronpeach/UNHOOK.git
   cd Unhook 
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. **Optional — enable AI:** Copy the example environment file to `.env`:

   **macOS / Linux**
   ```bash
   cp .env.example .env
   ```

   **Windows PowerShell**
   ```powershell
   Copy-Item .env.example .env
   ```

   Then edit `.env`:

   ```dotenv
   OPENAI_API_KEY=your_api_key_here
   OPENAI_MODEL=gpt-4.1-mini
   PORT=3000
   ```

   **Never commit `.env`, share API keys, or put keys into frontend JavaScript.** Without a valid key, the app still runs with local recommendations and reflective prompts.

4. Start the application:

   ```bash
   npm start
   ```

5. Open **http://localhost:3000** in your browser.

   > Run through Node (`npm start`) rather than relying on `python -m http.server` if you want the `/api/coach` and `/api/behavior-coach` endpoints. A static-only server cannot provide AI responses.

## How to try the complete flow

1. **Home → Start Unhook:** Select why you want to scroll, select what you hope scrolling will provide, and optionally pause.
2. **Recommended activity:** Accept the locally suggested game and lesson, or select **Personalize using AI** (requires a configured API key for model-generated results).
3. **Play:** Choose the recommended game or go to the **Play** tab and select any standalone game.
4. **CBT-informed check-in:** Report a trigger, how strongly you agree with a related thought (0–5), and urge intensity (0–5). Optionally request one AI reflective question.
5. **Finish the challenge:** Game completion is saved **immediately at the end of gameplay**. The offline quest and reflection are optional.
6. **Offline action:** Try the small suggested action away from the device. You may save a reflection, request a coach insight, or finish without AI.
7. **Journey:** Review saved games, reflections, and selected coach insights. Use **Export JSON backup** to save your progress as a file.

## Where the AI lives

```text
Browser PWA (app.js)
    ├── Unhook / game check-ins
    ├── Local progress & rule-based fallback
    └── Optional POST requests
            ↓
Node / Express backend (server.js)
    ├── POST /api/coach           → trigger analysis + existing game suggestion
    └── POST /api/behavior-coach  → before/after game reflection
            ↓
OpenAI Responses API (only if OPENAI_API_KEY is configured)
```

The backend validates accepted game IDs and input fields. Model-generated coaching is **bounded educational reflection**, not psychotherapy. If the API is unconfigured or temporarily unavailable, the backend returns a local fallback.

## Saving progress and privacy

- Gameplay progress and reflections are stored **on your device**, using IndexedDB with a localStorage fallback. There is no user-account database or cross-device sync.
- **Journey → Export JSON backup** downloads a file containing locally saved progress; **Import backup** restores a backup, and **Erase my local progress** deletes app records on that browser.
- Exported JSON backups are **not encrypted** and can contain personal reflections. Store them privately.
- Clearing browser site data, switching browsers/devices, or uninstalling the PWA may remove locally saved data. Export a backup first.
- AI requests require internet connectivity. When the user explicitly requests AI coaching, the relevant check-in/reflection is sent to the server and may be processed by the configured AI provider. Sharing a summary of recent rated games for personalization is **opt-in**.
- Do not enter identifying or highly sensitive health information in this hackathon prototype. The demo has limited safety controls and should not be deployed as a clinical service.

## Project structure

```text
scroll-escape-pwa/
├── index.html            # Main page
├── styles.css            # Calm UI + retro-inspired game styling
├── app.js                # Frontend flows, gameplay, progress and API calls
├── server.js             # Express backend + optional OpenAI endpoints
├── coach.js              # Valid game routes and local recommendation fallback
├── sw.js                 # Service worker for static assets
├── manifest.webmanifest  # PWA metadata
├── icons/                # PWA icons
├── tests/coach.test.js   # Recommendation tests
├── .env.example          # Environment variable template
├── .gitignore            # Excludes .env and node_modules
├── package.json          # Dependencies and npm scripts
└── V20_GUIDE.md          # Additional V20 usage notes
```

## Development and tests

```bash
npm test
node --check app.js
node --check server.js
```

`npm test` covers the recommendation-routing logic. The codebase is a hackathon prototype; these checks **do not** replace hands-on mobile/browser testing or clinical validation.

## PWA installation

The PWA has a web manifest and service worker. Once served from **HTTPS** (or `localhost` during development), supported browsers can offer installation. On iPhone, open the hosted HTTPS site in Safari and use **Share → Add to Home Screen**.

Offline caching helps the static interface remain available after an initial online load, but **remote AI requests still require internet access**. Installability and offline behavior depend on the browser and deployment configuration.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| `npm` command not found | Install Node.js 20+ and restart the terminal. |
| `Cannot find package` | Run `npm install` in the folder containing `package.json`. |
| `EADDRINUSE` on port 3000 | Stop the process using it or set `PORT=3001` in `.env`, then visit `http://localhost:3001`. |
| AI only shows local prompts | Confirm `.env` contains a valid key, restart `npm start`, and check the server terminal. API access/billing are separate from ChatGPT. |
| Game doesn't appear saved | Finish the playable part, then visit **Journey → Recent games**. Stay on the same browser/origin. |
| Progress disappeared | Check you are using the same browser and URL. Restore from **Journey → Import backup** if you previously exported one. |
| Changes don't appear | Reload the page; during development, an installed service worker may cache older static assets. |

## Clinical and research limitations

Escape the Loop draws inspiration from CBT-style cognitive reflection, behavioral experiments, urge awareness, and task initiation strategies. **It does not deliver clinician-supervised CBT and has not been demonstrated to reduce ADHD symptoms or social-media use.** The current version relies primarily on voluntary self-report and does not collect objective usage data from other applications. A future evaluation would require user research, appropriate outcome measures, privacy safeguards, and comparison against a suitable control condition.

## Hackathon

Built as a prototype for **DSH Hacks V2 (AI × Healthcare)**.

**Tagline:** *One moment. One choice.*
