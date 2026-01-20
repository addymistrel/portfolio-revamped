# 🖥️ macOS-Style Developer Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

**A stunning, interactive portfolio website inspired by macOS design language.**

[Live Demo](#) • [Features](#-features) • [Getting Started](#-getting-started) • [Customization](#-customization)

</div>

---

## ✨ Features

🪟 **macOS-Style Windows** — Draggable, resizable windows with authentic minimize, maximize, and close animations

📁 **Finder Interface** — Browse projects in a familiar folder structure

🖼️ **Gallery** — Showcase certifications and achievements with image previews

💻 **Terminal** — Display your tech stack in a terminal-style interface

📝 **Safari Browser** — Present blog posts and articles

📄 **Resume Viewer** — Embedded PDF resume viewer

📬 **Contact Window** — Clean contact form with social links

🎨 **Smooth Animations** — Powered by GSAP with Mac-like bounce and genie effects

🌐 **Responsive Design** — Built with Tailwind CSS for modern styling

---

## 🛠️ Tech Stack

<div align="center">

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Styling

![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Animation & UI

![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white)

### State Management

![Zustand](https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=react&logoColor=white)
![Immer](https://img.shields.io/badge/Immer-00E7C3?style=for-the-badge&logo=immer&logoColor=black)

### Tools & Utilities

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/addymistrel/portfolio-revamped.git

# Navigate to project directory
cd portfolio-revamped

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Dock.jsx        # macOS-style dock
│   ├── Navbar.jsx      # Top menu bar
│   ├── Home.jsx        # Desktop with folder icons
│   └── Welcome.jsx     # Boot screen animation
├── windows/            # Window components
│   ├── Finder.jsx      # File browser for projects
│   ├── Photos.jsx      # Gallery for certifications
│   ├── Terminal.jsx    # Tech stack display
│   ├── Safari.jsx      # Blog posts
│   ├── Resume.jsx      # PDF resume viewer
│   └── Contact.jsx     # Contact form
├── constants/          # Data and configuration
├── store/              # Zustand state management
└── hoc/                # Higher-order components
```

---

## 🎨 Customization

### Update Your Information

Edit `src/constants/index.js` to customize:

- **Projects** — Add your work in the `WORK_LOCATION` object
- **Blog Posts** — Update `blogPosts` array
- **Tech Stack** — Modify `techStack` categories
- **Social Links** — Edit `socials` array
- **Gallery** — Add certifications/achievements to `gallery`

### Add Your Images

Place your images in `public/images/`:

- `wallpaper.png` — Desktop background
- `gal1.png`, `gal2.png`, etc. — Gallery images
- `project-1.png`, `project-2.png` — Project screenshots

---

## 📝 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ and ☕**

⭐ Star this repo if you find it helpful!

</div>
