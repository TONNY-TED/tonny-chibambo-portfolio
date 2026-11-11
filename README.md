# TONNY CHIBAMBO — PROFESSIONAL PERSONAL PORTFOLIO

A modern, responsive, and standards-compliant personal portfolio website engineered for **Tonny Chibambo**, a Computer Science student, software developer, and technology enthusiast.

This project was built to satisfy the requirements of a front-end practical academic assignment, demonstrating proficiency in core web standards: **HTML5 semantic architecture**, **CSS3 responsive styling and keyframe animations**, and **Vanilla JavaScript interactivity** without external heavyweight frameworks or libraries.

---

## 1. Project Overview & Architecture

The website is structured into four main pages, linked through a unified, accessible navigation system:

| File | Page Name | Description |
| :--- | :--- | :--- |
| `index.html` | **Home** | Hero section with dynamic typing effect, profile photo card, background image placeholder, academic highlights, and social links. |
| `about.html` | **About Me** | In-depth professional biography, educational background table, technical skill cards with progress bars, interests, career aspirations, and functional contact links. |
| `projects.html` | **Projects** | Showcase of academic and personal software engineering projects (VoiceHealth, Student Management System, Portfolio) with problem statements, technologies, and GitHub links. |
| `animations.html` | **Animated Concepts** | Dedicated laboratory demonstrating 5 animation concepts: dynamic typing, micro-interaction hovers, moving gradient background, animated skill indicators, and scroll reveal effects. |

---

## 2. Technologies Used

- **HTML5:** Semantic document structuring (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<table>`, `<ul>`, `<ol>`, `<form>`, `<kbd>`, `<dialog>`).
- **CSS3:**
  - Modern CSS Custom Properties (Variables) for palette and design tokens.
  - CSS Grid and Flexbox for modern, responsive layouts.
  - Hardware-accelerated CSS Keyframes (`@keyframes`) for smooth animations.
  - Responsive design with fluid typography and breakpoints for desktop, tablet, and mobile.
- **Vanilla JavaScript (ES6+):**
  - Modular, cleanly commented code in `js/script.js`.
  - Accessible mobile drawer navigation toggle with keyboard (`Escape`) and click-outside dismissal.
  - Character-by-character typewriter effect with backspacing simulation.
  - `IntersectionObserver` for performant scroll-triggered animations and skill progress bars.
  - Interactive Lightbox modal for previewing placeholder images.
  - Clipboard copy utility for quick email copying.
- **Image Assets:**
  - Dedicated `images/` directory containing clearly marked placeholder image assets.

---

## 3. Directory Structure

```text
PersonalPortfolio/
│
├── index.html                 # Homepage (Hero, Typing Animation, Highlights)
├── about.html                 # Biography, Education Table, Skills, Contact
├── projects.html              # Featured Project Cards & Problem Statements
├── animations.html            # Animation Concepts & Interactive Laboratory
│
├── css/
│   └── style.css              # Master external stylesheet (variables, grid, animations)
│
├── js/
│   └── script.js              # Vanilla JavaScript (nav, typewriter, scroll reveals)
│
├── images/
│   ├── profile-placeholder.png       # Profile photo placeholder (800x800)
│   ├── background-placeholder.png    # Hero background banner placeholder (1920x1080)
│   ├── project1-placeholder.png      # VoiceHealth screenshot placeholder (800x500)
│   ├── project4-placeholder.png      # CareQueue hospital queue system placeholder (800x500)
│   ├── project5-placeholder.png      # Funsa Suppliers corporate platform placeholder (800x500)
│   ├── project6-placeholder.png      # Smart Health Watch IoT placeholder (800x500)
│   ├── project7-placeholder.png      # Surveillance & Exploration Robot placeholder (800x500)
│   ├── project8-placeholder.png      # Business Branding Package placeholder (800x500)
│   ├── project2-placeholder.png      # Student Management System placeholder (800x500)
│   └── project3-placeholder.png      # Portfolio website screenshot placeholder (800x500)
│
└── README.md                  # Documentation, setup & GitHub Pages deployment guide
```

---

## 4. How to Run Locally in Visual Studio Code

### Method 1: Using the Live Server Extension (Recommended)
1. Open **Visual Studio Code**.
2. Go to **File &rarr; Open Folder...** and select the `PersonalPortfolio` folder.
3. Install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions Marketplace (`Ctrl + Shift + X` or `Cmd + Shift + X`).
4. Right-click `index.html` in the file explorer and select **"Open with Live Server"**.
5. Your default browser will launch at `http://127.0.0.1:5500/index.html`.

### Method 2: Direct Browser Launch
Because all links and assets use standard relative paths (`css/style.css`, `js/script.js`, `images/...`), you can double-click `index.html` in your file manager (Explorer / Finder) to run the website directly in any web browser without needing any server setup.

### Method 3: Using Node / Vite (If working inside this workspace)
Run the development server:
```bash
npm run dev
```
Preview is served at `http://localhost:3000`.

---

## 5. Placeholders to Customize Before Final Presentation

All placeholders are clearly bracketed and easily searchable across the files:

### Configured Credentials
The following authentic details are now actively wired throughout the website:
- **Institution:** `DMI St. John the Baptist University`
- **Academic Period:** `2024 – 2027`
- **Email Address:** `tonnychibambo@gmail.com`
- **GitHub Profile:** `https://github.com/TONNY-TED`

### Remaining Optional Placeholders
To customize the remaining items, search for and replace:

| Placeholder | Location | Description |
| :--- | :--- | :--- |
| `[LINKEDIN PROFILE URL]` | All pages | Your LinkedIn profile URL (e.g., `https://linkedin.com/in/tonnychibambo`). |
| `[INSERT ACTUAL REPOSITORY URL]` | `projects.html` | Individual GitHub repo URLs for the 8 featured projects. |
| `[CITY, COUNTRY]` | `about.html` | Your current location or base (e.g., *Blantyre, Malawi* or *Mangochi, Malawi*). |
| `[CAREER GOALS]` | `about.html` | Detailed personal career statement. |
| `[INSERT PERSONAL HOBBY]` | `about.html` | Your personal hobbies (e.g., chess, football, open-source). |
| `[QUALIFICATION IN PROGRESS]` | `about.html` | Degree status badge (e.g., *In Progress* or *Bachelor of Science*). |
| `[SECONDARY INSTITUTION NAME]`| `about.html` | Your former high school or secondary school name. |
| `[COMPLETED]` | `about.html` | Secondary school completion status. |

### Image Placement Guide
You can drop in your own photos and project screenshots using these short, intuitive filenames in the `images/` folder. The website automatically supports **PNG**, **JPG**, and **JPEG**:

| Image File Name | Recommended Size | Used For |
| :--- | :--- | :--- |
| `images/tonny.png` *(or `.jpg`)* | 800 &times; 800 px (1:1 square) | Your portrait photograph (Hero card & About Me) |
| `images/voice.png` *(or `.jpg`)* | 800 &times; 500 px (16:10) | **VoiceHealth** Mobile Application screenshot |
| `images/care.png` *(or `.jpg`)* | 800 &times; 500 px (16:10) | **CareQueue** Patient Flow System screenshot |
| `images/funsa.png` *(or `.jpg`)* | 800 &times; 500 px (16:10) | **Funsa Suppliers** E-Commerce platform screenshot |
| `images/watch.png` *(or `.jpg`)* | 800 &times; 500 px (16:10) | **Smart Health Watch** IoT hardware & telemetry |
| `images/robot.png` *(or `.jpg`)* | 800 &times; 500 px (16:10) | **Surveillance & Exploration Robot** rover photo |
| `images/branding.png` *(or `.jpg`)* | 800 &times; 500 px (16:10) | **Business Branding Package** visual design |
| `images/sms.png` *(or `.jpg`)* | 800 &times; 500 px (16:10) | **Student Management System** UI or database schema |
| `images/portfolio.png` *(or `.jpg`)* | 800 &times; 500 px (16:10) | **Personal Portfolio Website** preview |

*Note: The built-in JavaScript image loader automatically tries `.png`, `.jpg`, and `.jpeg` sequentially and provides graceful fallback graphics if a file is not yet added.*

---

## 6. How to Deploy on GitHub Pages

Deploying this portfolio online for free with GitHub Pages takes less than two minutes:

1. **Create a GitHub Repository:**
   - Log in to your GitHub account at [github.com](https://github.com).
   - Click the **"+"** icon in the upper right corner and select **"New repository"**.
   - Name your repository (e.g., `tonny-chibambo-portfolio` or `tonnychibambo.github.io`).
   - Set the repository to **Public** and click **"Create repository"**.

2. **Push Project Files to GitHub:**
   - In VS Code, open the integrated terminal (`Ctrl + ~`) in the project directory.
   - Run the following git commands:
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Tonny Chibambo Personal Portfolio"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo-name>.git
     git push -u origin main
     ```

3. **Activate GitHub Pages:**
   - In your GitHub repository, navigate to **Settings** &rarr; **Pages** (under the "Code and automation" section).
   - Under **Build and deployment &rarr; Source**, choose **"Deploy from a branch"**.
   - Under **Branch**, select `main` and root directory `/(root)`.
   - Click **Save**.
   - GitHub Pages will build your site within 1–2 minutes at:
     `https://<your-username>.github.io/<your-repo-name>/`

---

## 7. Assignment Compliance Checklist

- [x] HTML5 semantic tags utilized correctly (`header`, `nav`, `main`, `section`, `article`, `footer`, `table`, `ol`, `ul`, `h1`-`h6`, `strong`, `em`, `u`, `hr`).
- [x] Educational background formatted with a clean HTML table.
- [x] CSS3 external stylesheet with CSS variables, Flexbox, Grid, transitions, and keyframes.
- [x] Responsive layout tested for mobile, tablet, and desktop viewports.
- [x] Vanilla JavaScript implementation without external frameworks or dependencies.
- [x] Dynamic typewriter effect cycling through all 4 specified roles.
- [x] 5 distinct animation concepts demonstrated in `animations.html`.
- [x] Image placeholders organized in `/images/` with clear labels and fallback support.
- [x] No broken links; all internal and external anchors configured with proper attributes.
- [x] Clean, well-commented code ready for practical demonstration and evaluation.
