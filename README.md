# MLB Schedule Dashboard ⚾

A modern, real-time(ish) MLB schedule dashboard that displays daily game schedules with live updates. Built with React, TypeScript, and the official MLB Stats API.

## Features

### 🏟️ Live Game Tracking

- **Real-time updates** every 30 seconds during games
- **Game status tracking**: Scheduled, In Progress, and Completed games
- **Live scores and inning-by-inning details**
- **Automatic timezone conversion** to your local timezone

### 📅 Schedule Navigation

- **Daily schedule view** with intuitive date navigation
- **Quick jump to today** from any date
- **Organized game sections** by status for easy viewing

### 🎨 Modern UI/UX

- **Glassmorphism design** with backdrop blur effects
- **Responsive layout** that works on all devices
- **Team logos** for all 30 MLB teams (light/dark variants)
- **Clean, accessible interface** with proper ARIA labels

### ⚡ Performance

- **Optimized with React Query** for efficient data fetching and caching
- **Automatic background refetch** when tab is active
- **Smart caching** to minimize API calls

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **URL State**: nuqs for URL-synchronized state
- **Data Source**: Official MLB Stats API
- **Deployment**: Cloudflare Pages

<img width="1554" height="1151" alt="Screenshot" src="https://github.com/user-attachments/assets/4d2817ea-3957-4fd3-b289-6d251fa0605f" />

## Getting Started

### Prerequisites

- Node.js 22
- pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sport-dash
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm analyze` - Analyze bundle size

## Project Structure

```
src/
├── components/           # React components
│   ├── Schedule.tsx     # Main schedule display
│   ├── ScheduleGameCard.tsx  # Individual game cards
│   ├── TeamLogo.tsx     # Team logo component
│   └── ...
├── contexts/            # React contexts
│   └── selected-game-context/  # Game selection state
├── hooks/               # Custom React hooks
│   ├── use-date-param.ts     # URL-synced date state
│   ├── use-local-timezone.ts # Timezone detection
│   └── use-score-change-hook.ts  # Score change notifications
├── types/               # TypeScript type definitions
│   └── mlb/            # MLB API response types
├── utils/               # Utility functions
│   ├── gameState.ts    # Game status helpers
│   └── teamMappings.ts # Team code mappings
public/
└── mlb/                # MLB team logos
    ├── light/          # Light theme logos
    └── dark/           # Dark theme logos
```

## API Integration

This application uses the official MLB Stats API:

- **Base URL**: `https://statsapi.mlb.com/api/v1/`
- **No API key required** - it's a public API (personal, non commercial use only)
- **Real-time data** with 30-second refresh intervals
- **Timezone support** for accurate local game times

## License

This project is open source and available under the [MIT License](LICENSE).
