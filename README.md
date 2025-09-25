# Notion Clone

A feature-rich Notion clone built with modern web technologies, offering real-time collaboration, rich text editing, and AI-powered features.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nana-notion-clone.vercel.app/)

## 🚀 Features

- **Real-time Collaboration** - Work simultaneously with others using Liveblocks
- **Rich Text Editing** - Powered by BlockNote with a Notion-like editor
- **Authentication** - Secure user authentication with Clerk
- **AI-Powered** - Text summarization and language translation using OpenAI
- **Modern UI** - Built with shadcn/ui and Tailwind CSS
- **Cloud Storage** - Documents stored in Firebase Firestore
- **Dark Mode** - Built-in dark/light theme support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **Database**: Firebase Firestore
- **Real-time**: Liveblocks
- **Rich Text Editor**: BlockNote
- **AI**: OpenAI Integration via Cloudflare Workers
- **Edge Functions**: Cloudflare Workers with Hono
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Firebase project with Firestore
- Clerk account for authentication
- Liveblocks account
- OpenAI API key (for AI features)
- Cloudflare account (for Workers AI)

### Cloudflare Workers Setup

1. Install Wrangler CLI (if not already installed):
   ```bash
   npm install -g wrangler@latest
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy your worker:
   ```bash
   cd workers-ai
   wrangler deploy
   ```

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/nana-s-clone-youtube.git
   cd nana-s-clone-youtube
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory and add the following:
   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Liveblocks
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
   LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
   
   # Application
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # Firebase
   FIREBASE_SERVICE_KEY=your_firebase_service_key
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Project Structure

- `/app` - Next.js 13+ app directory with routing
- `/components` - Reusable UI components
- `/lib` - Utility functions and configurations
- `/public` - Static assets
- `/styles` - Global styles and Tailwind configuration



## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Liveblocks](https://liveblocks.io/) - Real-time collaboration
- [Clerk](https://clerk.dev/) - Authentication
- [BlockNote](https://www.blocknotejs.org/) - Block-based rich text editor
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge computing platform
- [Hono](https://hono.dev/) - Fast web framework for Cloudflare Workers