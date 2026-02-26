# OpenRouter

A unified AI model aggregation platform that provides a single API gateway to multiple Large Language Model (LLM) providers including OpenAI, Claude, and Gemini. Built with modern TypeScript technologies and designed for scalability.

## 🚀 Features

- **Unified API Gateway**: Single endpoint for multiple LLM providers (OpenAI, Claude, Gemini)
- **User Management**: Complete authentication and authorization system
- **API Key Management**: Generate and manage multiple API keys per user
- **Credit-Based Billing**: Track usage and manage credits for API consumption
- **Multi-Provider Routing**: Intelligent routing to different LLM providers based on model selection
- **Usage Analytics**: Track conversations, token counts, and credit consumption
- **Web Dashboard**: Intuitive React-based dashboard for managing API keys, credits, and usage
- **Type-Safe**: End-to-end type safety with TypeScript and Prisma

## 🏗 Architecture

This is a Turborepo monorepo containing three applications and two shared packages:

### Applications

- **`api-backend`**: LLM aggregation service that routes requests to OpenAI, Claude, and Gemini
  - Port: Configured for API routing
  - Handles chat completions and model routing
  - Manages token counting and credit deduction

- **`main-backend`**: Core business logic server
  - Port: 3000
  - User authentication and authorization
  - API key CRUD operations
  - Payment and credit management
  - Model and provider configuration

- **`frontend-dashboard`**: React-based web interface
  - Port: 3001
  - User signup/signin
  - Dashboard with usage analytics
  - API key management
  - Credit management

### Packages

- **`db`**: Shared Prisma database package
  - PostgreSQL schema definitions
  - Type-safe database client
  - Migrations management

- **`eslint-config`**: Shared ESLint configurations
- **`typescript-config`**: Shared TypeScript configurations

## 🛠 Tech Stack

### Backend

- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- **Framework**: [Elysia.js](https://elysiajs.com/) - Ergonomic web framework for Bun
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: JWT-based authentication with Elysia JWT plugin
- **LLM SDKs**:
  - Anthropic SDK for Claude
  - OpenAI SDK for GPT models
  - Gemini SDK for Google models

### Frontend

- **Framework**: React 19
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom component library built with Base UI
- **State Management**: TanStack Query (React Query)
- **Type Safety**: Eden Treaty for end-to-end type safety with Elysia backend

### DevOps

- **Monorepo**: [Turborepo](https://turbo.build/repo) for fast, efficient builds
- **Package Manager**: Bun
- **Language**: TypeScript 5.9
- **Code Quality**: ESLint + Prettier with auto-sorting imports

## 📋 Prerequisites

- [Bun](https://bun.sh/) >= 1.3.8
- Node.js >= 18 (for Turborepo compatibility)
- PostgreSQL database
- API keys for LLM providers:
  - OpenAI API key
  - Anthropic (Claude) API key
  - Google (Gemini) API key

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dev0jha/Openrouter.git
cd Openrouter
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment Variables

Create `.env` files in the respective applications:

**`packages/db/.env`**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/openrouter"
```

**`apps/main-backend/.env`**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/openrouter"
JWT_SECRET="your-jwt-secret-key"
```

**`apps/api-backend/.env`**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/openrouter"
OPENAI_API_KEY="your-openai-key"
ANTHROPIC_API_KEY="your-anthropic-key"
GEMINI_API_KEY="your-gemini-key"
```

### 4. Set Up the Database

```bash
cd packages/db
bun run prisma migrate dev
bun run prisma generate
```

### 5. Start Development Servers

From the root directory:

```bash
# Start all applications in development mode
bun run dev

# Or start individual apps
cd apps/main-backend && bun run dev
cd apps/api-backend && bun run dev
cd apps/frontend-dashboard && bun run dev
```

The services will be available at:

- Main Backend: http://localhost:3000
- API Backend: (configured port)
- Frontend Dashboard: http://localhost:3001

## 📁 Project Structure

```
.
├── apps/
│   ├── api-backend/          # LLM aggregation service
│   │   ├── src/
│   │   │   ├── llms/         # LLM provider implementations
│   │   │   │   ├── Base.ts   # Base LLM interface
│   │   │   │   ├── Claude.ts # Anthropic Claude integration
│   │   │   │   ├── Gemini.ts # Google Gemini integration
│   │   │   │   └── OpenAi.ts # OpenAI integration
│   │   │   ├── index.ts      # Main API routes
│   │   │   └── types.ts      # Type definitions
│   │   └── package.json
│   │
│   ├── main-backend/         # Core business logic
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/     # Authentication module
│   │   │   │   ├── apikeys/  # API key management
│   │   │   │   ├── models/   # Model configuration
│   │   │   │   └── payment/  # Payment & credits
│   │   │   ├── app.ts        # Application setup
│   │   │   └── index.ts      # Server entry point
│   │   └── package.json
│   │
│   └── frontend-dashboard/   # Web dashboard
│       ├── src/
│       │   ├── components/   # React components
│       │   ├── pages/        # Page components
│       │   ├── hooks/        # Custom React hooks
│       │   ├── providers/    # Context providers
│       │   └── App.tsx       # Main app component
│       └── package.json
│
├── packages/
│   ├── db/                   # Shared database package
│   │   ├── prisma/
│   │   │   ├── schema.prisma # Database schema
│   │   │   └── migrations/   # Migration files
│   │   └── generated/        # Generated Prisma client
│   │
│   ├── eslint-config/        # Shared ESLint configs
│   └── typescript-config/    # Shared TS configs
│
├── package.json              # Root package.json
├── turbo.json                # Turborepo configuration
└── README.md                 # This file
```

## 🔑 API Documentation

### Authentication

All API requests require authentication via API key in the Bearer token format:

```bash
Authorization: Bearer YOUR_API_KEY
```

### Chat Completions Endpoint

**POST** `/api/v1/chat/completions`

Unified endpoint for chat completions across all supported LLM providers.

**Request Body:**

```json
{
  "model": "openai/gpt-4",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "stream": false
}
```

**Supported Models:**

- `openai/gpt-4`
- `openai/gpt-3.5-turbo`
- `anthropic/claude-3-opus`
- `anthropic/claude-3-sonnet`
- `google/gemini-pro`
- And more...

**Response:**

```json
{
  "id": "chatcmpl-xxx",
  "model": "openai/gpt-4",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "I'm doing well, thank you!"
      }
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 8,
    "total_tokens": 18
  }
}
```

## 📊 Database Schema

The application uses PostgreSQL with the following main entities:

- **User**: User accounts with email/password and credit balance
- **ApiKey**: Multiple API keys per user with usage tracking
- **Company**: LLM provider companies (OpenAI, Anthropic, Google)
- **Model**: Available models (GPT-4, Claude, Gemini, etc.)
- **Provider**: Infrastructure providers for each model
- **ModelProviderMapping**: Maps models to providers with pricing
- **Conversation**: Tracks all API calls with token counts
- **OnrampTransaction**: Payment and credit purchase history

## 🧪 Development

### Available Scripts

```bash
# Development
bun run dev              # Start all apps in development mode

# Building
bun run build            # Build all apps and packages

# Code Quality
bun run lint             # Lint all packages
bun run format           # Format code with Prettier
bun run check-types      # Type-check all packages

# Database
cd packages/db
bun run prisma migrate dev    # Run migrations
bun run prisma generate       # Generate Prisma client
bun run prisma studio         # Open Prisma Studio
```

### Adding a New LLM Provider

1. Create a new class in `apps/api-backend/src/llms/` extending the `Base` class
2. Implement the required methods for chat completions
3. Add the provider to the routing logic in `apps/api-backend/src/index.ts`
4. Update the database with new provider and model entries

## 🔒 Security Considerations

- API keys are hashed before storage
- JWT tokens for user authentication
- Rate limiting should be implemented for production
- CORS is configured for the frontend origin
- Database credentials should be stored securely
- LLM provider API keys should never be exposed to the client

## 🚀 Deployment

### Building for Production

```bash
bun run build
```

### Environment Setup

Ensure all environment variables are properly configured for production:

- Database connection strings
- JWT secrets
- LLM provider API keys
- CORS origins

### Recommended Infrastructure

- **Database**: Managed PostgreSQL (AWS RDS, Neon, Supabase)
- **Backend**: Container service (Docker, AWS ECS, Fly.io)
- **Frontend**: Static hosting (Vercel, Netlify, Cloudflare Pages)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and maintained by [@dev0jha](https://github.com/dev0jha).

## 🙏 Acknowledgments

- Built with [Turborepo](https://turbo.build/repo)
- Powered by [Bun](https://bun.sh/) and [Elysia.js](https://elysiajs.com/)
- Inspired by [OpenRouter](https://openrouter.ai/)

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
