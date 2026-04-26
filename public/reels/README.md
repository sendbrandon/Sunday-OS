# /public/reels/ — video clip drop folder

Five PD-verified clips need to be downloaded from archive.org, trimmed to ~15–30 seconds, and saved here with the expected filenames listed in [`lib/reels.ts`](../../lib/reels.ts).

The Player component reads from `lib/reels.ts` and looks for the trimmed `.mp4` files at the paths below. Until each file exists, the Player gracefully falls back to its styled placeholder.

## Required filenames

| Save as | Source |
|---------|--------|
| `reel-002-skating.mp4` | https://archive.org/details/AmateurS1950 |
| `reel-003-babies.mp4` | https://archive.org/details/all-my-babies-1952 |
| `reel-005-village.mp4` | https://archive.org/details/Greenwic1960 |
| `reel-006-palmour.mp4` | https://archive.org/details/PalmourS1957 |
| `reel-010-stoop.mp4` | https://archive.org/details/PlayStreet |

## Trim workflow (per clip)

1. Download the full file from archive.org (use the `.mp4` or `.mpeg` link in the right-side download list).
2. Pick the strongest 15–30 second moment — the moment that reads as found-footage tucked in a church basement.
3. Trim with `ffmpeg`:
   ```bash
   ffmpeg -ss 00:01:23 -i source.mp4 -t 25 -c:v libx264 -crf 23 -preset slow \
     -c:a aac -b:a 96k -movflags +faststart reel-002-skating.mp4
   ```
   - Replace `00:01:23` with the in-point you picked
   - `-t 25` = 25-second clip length (adjust per reel)
   - Aim for under 2 MB final size

4. Save into this folder. The Player will pick it up automatically on next request.

## License hygiene

Each source item is verified PD or CC0 — see the `license` field in `lib/reels.ts` for per-clip provenance. Keep a copy of each source page archived (Wayback Machine snapshot is fine) so the license proof survives if archive.org metadata ever shifts.
