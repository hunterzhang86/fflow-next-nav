---
title: Installation
description: How to install the project.
---

### Create project

Start by creating a new Next.js project using `create-next-app`:

```bash
npx create-next-app my-saas-project --example "https://github.com/hunterzhang86/fflow-next"
```

Or deploy with Vercel :

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhunterzhang86%2Ffflow-next)

A good way to create your repository, but the deployment will fail because you
need to add your environment variables locally in your project. Follow the
documentation for that.

### Install dependencies

Enter in the folder and install dependencies for your project:

```bash
cd my-saas-project
pnpm install
```

### Create a `.env` file

Copy/paste the `.env.example` in the `.env` file:

```md title=".env"
NEXT_PUBLIC_APP_URL=http://localhost:3000

AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_OAUTH_TOKEN=

DATABASE_URL=

RESEND_API_KEY=
EMAIL_FROM=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID=
NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID=
NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID=
NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID=
```

### Configuration part

Let's check the configuration part for update all environment variables before use `pnpm run dev`.