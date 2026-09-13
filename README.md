# Maryam Alkholi — portfolio website

A static site. No build step, no dependencies — open `index.html` in a browser and it works.

```
index.html              Home page (about, both galleries, skills, experience,
                        achievements, credentials, testimonials, mission, contact)
games/                  One page per game (10)
projects/               One page per software / web project (10)
assets/img/             All images
assets/css/style.css    All styling, including the light/dark theme
assets/js/main.js       Theme toggle, carousel, skill bars, contact form

portfolio-single-file.html   The whole site squeezed into one file (images
                        embedded). Handy for emailing or opening from a USB
                        stick — but edit the normal files above, not this one.
```

---

## 1. Images you still need to add

Drop these into `assets/img/` using **exactly these file names** and they appear
automatically. Until then each one shows a striped placeholder that names the file
it's waiting for, so nothing looks broken.

`.jpg` or `.png` both work — if the file below says `.jpg` and yours is a PNG, just
save it as `.png` with the same name and the page will find it.

| File name | Where it appears |
|---|---|
| `AboutPhoto.jpg` | About section portrait |
| `DealWithTheDevilLogo.png` | Deal with the Devil card + page |
| `OneEyeLogo.png` | One Eye card + page |
| `TriviaLogo.png` | Trivia Night card + page |
| `TowerOfWobbleLogo.png` | Tower of Wobble card + page |
| `UniversityDegree.jpg` | Credentials — degree |
| `GPA.jpg` | Credentials — GPA / transcript |
| `PythonForEverybody.jpg` | Certificate 1 |
| `Beyound.jpg` | Certificate 2 |
| `Python.jpg` | Certificate 3 |
| `javascirpt.jpg` | Certificate 4 |
| `webdev.jpg` | Certificate 5 |
| `pythonBootcamp.jpg` | Certificate 6 |
| `comptia-security-plus.png` | Currently Working Certificate 1 (CompTIA Security+) |
| `iso27001-foundation.jpg` | Currently Working Certificate 2 (ISO/IEC 27001 Foundation) |
| `DaniaAlsaid.jpg` | Testimonial photo |
| `NourKharis.jpg` | Testimonial photo |
| `MohammedMilhim.jpg` | Testimonial photo |
| `NourAlqudah.jpg` | Testimonial photo |

Testimonial photos fall back to the person's initials in a circle, which looks
deliberate — so you can leave those until you have permission to use the photos.
(LinkedIn photos are the person's own, so it's worth asking before reposting them.)

---

## 2. Things to fill in or check

- **Tower of Wobble** — no description or video yet. The page has a placeholder
  showcase box. Send me the link and I'll embed it, or edit the file directly.
- **One Eye**, **Trivia Night**, **Geodata Mapping**, **iTunes XML Database** — I wrote
  draft descriptions from the project titles and the builds. Each of those pages
  shows a small dashed "Draft copy" note; replace the text with your own words and
  delete that note.
- **Nour Alqudah's LinkedIn** currently points at Mohammed Milhim's profile — that's
  the link that was in your notes. Correct it in `index.html` (search for
  `Nour Alqudah`).
- **Contact email** is `maryamalkholi1@gmail.com` (your notes had one letter missing
  in one place). Search for it if you want to change it.

---

## 3. Editing text

Everything is plain HTML. Open the file in any editor (VS Code) and change the words.

- Home page copy → `index.html`
- A game write-up → `games/<name>.html`
- A software write-up → `projects/<name>.html`

Skill bars: find the skill name in `index.html`, and edit both the `90%` label and
the `--w:90%` value next to it.

---

## 4. Publishing it

Any static host works. The two easiest:

**Netlify (drag and drop)**
1. Go to <https://app.netlify.com/drop>
2. Drag this whole folder onto the page.
3. You get a live URL immediately; rename it in Site settings.

**GitHub Pages**
1. Create a repo, upload this folder's contents to the root of the `main` branch.
2. Settings → Pages → Source: `main` / root.
3. Live at `https://<username>.github.io/<repo>/`.

Both support a custom domain later.

---

## 5. What's already wired up

- **Light / dark theme** — the button in the top right; it follows the visitor's
  system setting by default and remembers a manual choice.
- **Embedded showcases** — YouTube videos and itch.io builds play in the page.
  Every embed also has a fallback link underneath in case a browser blocks iframes.
- **Contact form** — opens the visitor's email app with the message pre-filled and
  addressed to you. If you'd rather receive submissions without them needing an
  email client, a free service like Formspree is a 2-line change.
- **Responsive** — tested down to phone width; the nav collapses into a menu.
