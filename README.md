This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


cat > README.md << 'EOF'
# E-commerce Platform

E-commerce platform built with Next.js and PostgreSQL

## System Requirements

- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone the repository
```bash
git clone https://github.com/rsme834/ecommerce-platform.git
cd ecommerce-platform
2. Install dependencies
bashnpm install
3. Start database services
bashnpm run docker:up
4. Apply database migrations
bashnpm run db:migrate
5. Seed initial data
bashnpm run db:seed
6. Start development server
bashnpm run dev
Daily Workflow
Before starting work:
bashgit pull origin main
npm run db:migrate
After finishing work:
bashgit add .
git commit -m "Description of changes"
git push origin main
Useful Commands

npm run db:studio - Open Prisma Studio
npm run docker:down - Stop database services
npm run docker:up - Start database services
npm run dev - Start development server

Default Admin User

Email: admin@ecommerce.com
Password: admin123

Database
The project uses PostgreSQL with Prisma ORM. Sample data includes:

3 product categories (Smartphones, Computers, Accessories)
3 sample products (iPhone 15, MacBook Pro, AirPods Pro)
Admin user for testing

Development Notes

Database runs on localhost:5432
Redis runs on localhost:6379
Web server runs on localhost:3000 (or next available port)
Prisma Studio available at localhost:5555
EOF
```

