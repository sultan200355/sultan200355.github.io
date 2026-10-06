# Your portfolio: the guide

This file explains how your website works, how to finish it, and how to publish it.
Read it once from top to bottom. Keep it for later.

---

## 1. What is in the folder

```
poritfoilo/
├── index.html                  Home page
├── about.html                  About page
├── contact.html                Contact page
├── 404.html                    "Page not found" page (GitHub shows it for wrong addresses)
├── projects/
│   ├── beit-al-mukhtar.html    Project 1 (with the before/after slider)
│   ├── syrian-emirati-council.html   Project 2
│   ├── artc.html               Project 3
│   ├── social-media.html       Project 4: "Social Media, Print & Web" (freelance clients, gallery, video)
│   └── atalla-trading.html     Project 5 (logo)
├── css/
│   └── style.css               ALL the styling for every page (colours, fonts, layout)
├── js/
│   └── main.js                 Small extras: fade-in, slider, lightbox, footer year
├── fonts/
│   ├── archivo-latin.woff2     The main font (all weights and widths in one file)
│   └── noto-kufi-arabic.woff2  The Arabic font
├── images/                     Your images (one folder per project)
│   └── og-image.jpg            The picture shown when someone shares your link
├── favicon.svg                 The small "SJ" icon in the browser tab
├── favicon.ico                 The same icon in the older format some browsers look for
├── robots.txt                  Tells Google it may read the site
├── sitemap.xml                 A list of all pages, for Google
├── .nojekyll                   Tells GitHub: "serve these files exactly as they are"
├── .gitignore                  Files Git should not upload
└── GUIDE.md                    This guide
```

**How the three languages work together**

- **HTML** (`.html` files) = the content: text, images, links. *What* is on the page.
- **CSS** (`style.css`) = the look: colours, sizes, layout. *How* it looks.
- **JavaScript** (`main.js`) = behaviour: things that react when you click or scroll.

Every page loads the same `style.css` and `main.js`, so the whole site looks and works the same.

**Why plain HTML and not a framework (like React)?** There is nothing to install or build. What you
see in the file is exactly what the browser shows. That makes it easy to understand, easy to
explain, and free to host.

**The one downside:** the header and footer are copied into every HTML file. If you change the
menu, change it in every file. In VS Code, use **Ctrl+Shift+H** (Replace in Files) to do it in one go.

---

## 2. See the site on your computer

Double-clicking `index.html` mostly works, but a tiny local web server is closer to the real thing.
Open a terminal in the folder and run:

```
python -m http.server 8000
```

Then open http://localhost:8000 in your browser. Press **Ctrl+C** in the terminal to stop it.

---

## 3. Fill in the placeholders

Every unfinished spot is marked with square brackets, like `[WRITE IN YOUR OWN WORDS: ...]`
or `[ADD IMAGE: ...]`. On the website these show as **dashed orange boxes** or **striped boxes**,
so you can't miss them.

**To find them all:** in VS Code press **Ctrl+Shift+F** and search for `[WRITE`, then `[ADD`, then `[MY`.

### 3a. Replace a text placeholder

You will see something like this:

```html
<div class="placeholder">[WRITE IN YOUR OWN WORDS: The result]</div>
```

Delete that whole line and write your text in paragraph tags:

```html
<p>Your first paragraph.</p>
<p>Your second paragraph.</p>
```

### 3b. Writing in Arabic

Add `lang="ar"` (the language is Arabic) and `dir="rtl"` (read right-to-left):

```html
<p lang="ar" dir="rtl">اكتب النص هنا</p>
```

The site then switches to the Arabic font automatically, and the text runs right-to-left.
Never add letter-spacing to Arabic: it breaks the joined letters.

### 3c. Replace an image placeholder

You will see something like this:

```html
<div class="ph-img ratio-16x9">[ADD IMAGE: ARTC home page screenshot]</div>
```

1. Put your image in the right folder, for example `images/artc/home-desktop.jpg`.
2. Replace the whole `<div ...>` line with an `<img>`:

```html
<img src="../images/artc/home-desktop.jpg"
     width="1920" height="1080"
     loading="lazy" decoding="async"
     alt="Home page of the ARTC Training Center website on desktop">
```

- `src` = where the file is. Pages in `projects/` start with `../` (meaning "go up one folder").
  Pages in the main folder (`index.html`, `about.html`) start with just `images/...`.
- `width` and `height` = the real size of the image in pixels. In Windows: right-click the file,
  **Properties**, **Details**. The browser uses them to save space for the image, so the page
  doesn't jump while loading.
- `loading="lazy"` = only download the image when the visitor scrolls near it. Leave this out
  for the first big image at the top of a page.
- `alt` = a short description of the image, for blind visitors (screen readers) and for Google.
  Describe what is *in* the image.

### 3d. Add an image to a gallery (it opens bigger when clicked)

Copy this block into the gallery and change the file name (twice) and the alt text:

```html
<a class="gallery__item" href="../images/social-media/ramadan-1.jpg" data-lightbox="social">
  <img src="../images/social-media/ramadan-1.jpg" width="1080" height="1350"
       loading="lazy" decoding="async"
       alt="Ramadan campaign post with a crescent moon">
</a>
```

`data-lightbox="social"` puts the image in a group. In the big viewer you can click through all
images with the same group name.

### 3e. Add a video

Put the video in the project's image folder and use this pattern (see the BLU video on
`social-media.html`):

```html
<figure class="video-item">
  <video controls playsinline preload="none"
         width="720" height="1280"
         poster="../images/social-media/my-video-poster.jpg"
         aria-label="Short description of the video">
    <source src="../images/social-media/my-video.mp4" type="video/mp4">
  </video>
  <figcaption>Short caption</figcaption>
</figure>
```

- `poster` = the still picture shown before the video plays.
- `preload="none"` = the video only downloads when someone presses play. That keeps the page fast.
- Keep videos small: about 720 pixels wide and under 10 MB. GitHub's upload page refuses files over 25 MB.

### 3f. The text on the site

All project texts and the About page were written by Claude from what you told me (cleaned up
and put into simple English). Nothing was added that you did not say, except facts from the
clients' own websites. **Read every page once before you publish** and change anything that
doesn't sound like you.

The Atalla Trading page only describes the logo itself. When you want to tell that project's
story, copy the "The challenge", "Process" and "Result" sections from another project page.

### 3g. Good image sizes

Your current images are already web-ready (all under 400 KB). For new images:
about **1600 to 2000 pixels** on the longest side, and under **400 KB**.
The free tool https://squoosh.app makes images smaller without visible quality loss.

---

## 4. Change the look

Open `css/style.css` and look at section **2. DESIGN TOKENS** at the top.

- **Accent colour:** change `--color-accent: #f0581f;` and the whole site follows.
- **Background:** `--color-bg`.
- **Text sizes:** the `--step-...` values.

---

## 5. Design decisions (so you can explain them)

| Decision | Why |
|---|---|
| Dark background, one orange accent | Bold and professional, and your work stands out against it. The orange comes from the Beit Al Mukhtar flame, so the site is connected to your own brand. It is used only for buttons, links and Arabic names, so it always means "look here". |
| Font: Archivo | One font file contains every weight *and* every width. Headings use the extra-wide version, which looks like shop signage, matching your sign work. |
| Arabic font: Noto Kufi Arabic | Clean, bold Kufi style that sits well next to Archivo. It only downloads on pages that contain Arabic. |
| Fonts stored in the site, not loaded from Google | Faster, and visitors' data is not sent to Google. That matters for privacy rules in the EU (GDPR). |
| Sharp corners everywhere | Feels like print and signage, not like an app template. One rule, used everywhere. |
| Big name on the home page, then your best project right away | Visitors see who you are and your strongest work within one scroll. |
| Before/after slider | Shows the moment your design became a real building. That is the strongest proof in the portfolio. |
| "Designed for production" section | Shows you can deliver print-ready files with dielines, not only nice pictures. |
| Packaging grouped into boxes, bags, paper | 22 images in one block would be tiring. Groups are easier to scan. |
| Masonry gallery for social media | Posts, stories and business cards have different shapes. Masonry lets each keep its shape. |
| Logos shown on a light panel | A navy logo would disappear on the dark page. The light panel works like a sheet of paper. |
| Website screenshots as desktop + phone, side by side | Shows the site works on both. The two columns are sized so both screenshots are exactly the same height. |
| Small animations only | Content fades in on scroll and images zoom a little on hover. If a visitor turned on "reduce motion" on their device, all animation is switched off. |

**Accessibility (usable for everyone)**

- Every image has `alt` text.
- A hidden "Skip to content" link appears when you press Tab, for keyboard users.
- An orange focus ring shows where you are when using the keyboard.
- The slider also works with the arrow keys and is announced to screen readers.
- The lightbox uses the browser's own `<dialog>` element: Esc closes it, and focus returns to the
  image you clicked.
- Text colours have strong contrast against the background.

**Speed**

- Images load only when needed (`loading="lazy"`).
- Every image has a width and height, so the page doesn't jump.
- The main font starts loading first (`preload`).
- No frameworks or libraries: the whole JavaScript file is very small.

**SEO (being found on Google and shared nicely)**

- Every page has its own `<title>` and `<meta name="description">`.
- Open Graph tags (`og:...`) control the preview card on WhatsApp, LinkedIn and Facebook.
- `sitemap.xml` lists all pages for Google. `robots.txt` points to it.
- The home page tells Google, in a special format (JSON-LD), that this site is about a person.

---

## 6. Publish on GitHub Pages (free)

GitHub Pages hosts your site for free at `https://YOUR-USERNAME.github.io`.

> Note: on a free GitHub account, the repository must be **public**. Everyone can see the files,
> including this guide. That is normal for websites.

### Step 1: Create a GitHub account
Go to https://github.com and sign up. Pick your username carefully: it becomes your web address.

### Step 2: Put your username in the site
In VS Code press **Ctrl+Shift+H** (Replace in Files):
- Search: `YOUR-USERNAME`
- Replace with: your GitHub username, in lowercase (for example `sultanjaramani`)
- Click **Replace All**.

This fixes the share-preview links, `sitemap.xml` and `robots.txt`.

### Step 3: Create the repository
1. On GitHub, click **+** (top right), then **New repository**.
2. Repository name: **exactly** `YOUR-USERNAME.github.io` (your username, then `.github.io`).
3. Choose **Public**. Don't tick any of the "Add a README" options.
4. Click **Create repository**.

Why this exact name? GitHub then serves the site at the main address
`https://YOUR-USERNAME.github.io`, and the `404.html` page works correctly.

### Step 4: Upload the files

**Option A: in the browser (easiest)**
1. On your new repository page, click **uploading an existing file**.
2. Open `C:\poritfoilo` in Windows Explorer. Select everything **except the `.claude` folder**,
   and drag it into the browser window. Folders upload with their contents.
3. At the bottom, write a message like "First version" and click **Commit changes**.

**Option B: with Git in the terminal (better for later updates)**
Open a terminal in `C:\poritfoilo` and run these one by one (use your username):

```
git init
git add .
git commit -m "First version of my portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

The first time, a window asks you to log in to GitHub. The `.gitignore` file makes sure the
`.claude` folder is not uploaded.

### Step 5: Turn on GitHub Pages
1. In the repository, click **Settings**, then **Pages** (left menu).
2. Under **Build and deployment**: Source = **Deploy from a branch**,
   Branch = **main**, folder = **/ (root)**. Click **Save**.
3. Wait 1 to 2 minutes, then refresh. GitHub shows "Your site is live at ...".

### Step 6: Check it
- Open `https://YOUR-USERNAME.github.io` on your laptop **and** your phone.
- Paste your link into the LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/)
  to see the share preview.

### Updating the site later
- **Option A:** on GitHub, open the file, click the pencil icon, edit, and **Commit changes**.
  To add images, open the folder on GitHub, then **Add file**, **Upload files**.
- **Option B:** edit on your computer, then:
  ```
  git add .
  git commit -m "Describe what you changed"
  git push
  ```

The live site updates about a minute later.

### Optional: Google Search Console
To help Google find you faster: go to https://search.google.com/search-console, add your site,
and submit `https://YOUR-USERNAME.github.io/sitemap.xml`.
