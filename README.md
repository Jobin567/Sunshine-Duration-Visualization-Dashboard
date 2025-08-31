# Weather Dashboard

A comprehensive weather data visualization dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- **Multi-page Dashboard**: Overview, Analytics, Forecasts, and Settings pages
- **Interactive Charts**: Real-time weather data visualization using Recharts
- **Responsive Design**: Optimized for both desktop and mobile platforms
- **Modern UI**: Card-based layout with sidebar navigation using shadcn/ui components
- **API Integration**: Connected to FastAPI backend with error handling and loading states
- **Weather Metrics**: Temperature, sunshine duration, humidity, and forecast data

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── components/          # React components
│   ├── Navigation/      # Navigation components
│   ├── Pages/          # Page components
│   └── ui/             # shadcn/ui components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── services/           # API services
└── styles/             # CSS files
```

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **shadcn/ui** for UI components
- **Recharts** for data visualization
- **Lucide React** for icons
- **Radix UI** for accessible components

## API Integration

The dashboard integrates with a FastAPI backend for weather data. The API service includes:
- Error handling and retry logic
- Loading states
- Mock data for development

## Development

The project follows modern React patterns with:
- TypeScript for type safety
- Custom hooks for data management
- Context for state management
- Responsive design principles
- Error boundaries for graceful error handling

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new files
3. Ensure responsive design
4. Test on both desktop and mobile
5. Follow the component structure in `/components`