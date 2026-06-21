# HemdanOS - Interactive Portfolio

![HemdanOS](https://via.placeholder.com/1200x600?text=HemdanOS+Portfolio)

## 🖥️ Overview

HemdanOS is an interactive portfolio website styled as an operating system, providing a unique and engaging way to showcase my skills, projects, and professional experience. The interface mimics a desktop environment with windows, apps, and a dock, creating an immersive user experience.

## ✨ Features

- **OS-Style Interface**: Complete with a boot loader, desktop, windows, and dock
- **Responsive Design**: Optimized for both desktop and mobile experiences
- **Interactive Applications**:
  - About Me Terminal
  - Experience Viewer
  - Project Showcase
  - Education Timeline
  - Skills Dashboard
  - Resume Viewer
  - Contact Form
- **Realistic OS Interactions**:
  - Draggable windows with resize functionality
  - Window minimize, maximize, and close controls
  - Boot animation sequence with progress indicator
  - Mobile-optimized experiences with haptic feedback

## 🛠️ Technologies

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **Build Tool**: Vite
- **Animations**: Custom animations with CSS and React transitions

## 📱 Responsive Design

The portfolio adapts to different screen sizes:

- **Desktop**: Full OS experience with windows and dock
- **Mobile**: iOS-inspired interface with optimized controls and animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hemdan217/hemdan-portfolio.git

# Navigate to the project directory
cd hemdan-portfolio

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000` by default.

### Build for Production

```bash
# Create a production build
npm run build
# or
yarn build

# Preview the production build locally
npm run preview
# or
yarn preview
```

## 🏗️ Project Structure

```
hemdan-portfolio/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── apps/      # Individual application components
│   │   └── ...
│   ├── hooks/         # Custom React hooks
│   ├── layouts/       # Page layout components
│   ├── lib/           # Utility functions
│   ├── styles/        # Global styles
│   ├── App.tsx        # Main App component
│   └── main.tsx       # Entry point
└── ...
```

## 🎨 Customization

This portfolio can be customized by editing:

- `src/components/apps/` - Add or modify application components
- `tailwind.config.ts` - Adjust theme colors and animations
- `public/` - Replace with your own assets and favicon

## 🧠 Design Decisions

- **OS Interface**: Creates a memorable, interactive experience that stands out from typical portfolios
- **Responsive Design**: Separate UX for desktop and mobile ensures optimal experience across devices
- **Animation Details**: Boot sequence and window transitions add authenticity to the OS experience
- **Content Organization**: Information is compartmentalized into "apps" for intuitive navigation

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Contact

- **Portfolio**: [hemdan-portfolio.com](https://hemdan-portfolio.com)
- **GitHub**: [hemdan217](https://github.com/hemdan217)
- **LinkedIn**: [Hemdan Khalifa](https://linkedin.com/in/hemdan-khalifa)
- **Email**: hemdan219@gmail.com

---

💼 Built with passion by Hemdan Khalifa
