# Crowd App - Next.js + Prisma + NextAuth

A full-stack web application built with Next.js, Prisma, and NextAuth for user authentication and post management.

## Features

- 🔐 **Authentication**: Sign up and sign in with email/password
- 📝 **Create Posts**: Users can create, view, and delete their own posts
- 🎨 **Modern UI**: Beautiful responsive design with Tailwind CSS
- 🔒 **Secure**: Password hashing with bcryptjs, session management with NextAuth
- ⚡ **Fast**: Powered by Next.js 16 and Prisma ORM

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- PostgreSQL database (provided via Prisma Data Proxy)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

The `.env.local` file is already configured with your database URL and NextAuth settings:

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your_key"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
```

> ⚠️ **Important**: Change `NEXTAUTH_SECRET` in production. Generate a secure key with:
>
> ```bash
> openssl rand -base64 32
> ```

### 3. Push Database Schema

Set up your database schema:

```bash
npx prisma db push
```

This will create the following tables:

- **User**: Stores user account information
- **Post**: Stores user posts with timestamps

### 4. (Optional) View Database

To view and manage your database data:

```bash
npx prisma studio
```

### 5. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── [...]nextauth]/route.js    # NextAuth configuration
│   │   └── signup/route.js            # Sign up endpoint
│   └── posts/
│       ├── route.js                   # Get and create posts
│       └── [id]/route.js              # Delete post
├── dashboard/page.js                  # Dashboard page
├── signin/page.js                     # Sign in page
├── signup/page.js                     # Sign up page
├── page.js                            # Home page
└── layout.js                          # Root layout with SessionProvider

components/
└── DashboardClient.js                 # Dashboard client component

lib/
├── auth.js                            # NextAuth configuration
└── prisma.js                          # Prisma client singleton

prisma/
└── schema.prisma                      # Database schema
```

## Usage

### 1. Create an Account

- Visit `http://localhost:3000`
- Click "Sign Up"
- Fill in your name, email, and password
- Account is created and you're ready to sign in

### 2. Sign In

- Click "Sign In" or go to `/signin`
- Enter your email and password
- Access your dashboard

### 3. Create Posts

- On the dashboard, fill in the post title and content
- Click "Create Post"
- Your post appears in the list below

### 4. Manage Posts

- View all your posts on the dashboard
- Delete any post with the "Delete" button
- Posts are timestamped for easy tracking

## Key Technologies

- **Next.js 16.2**: React framework for production
- **Prisma 7.8**: Next-generation ORM
- **NextAuth 4.24**: Authentication solution
- **Tailwind CSS 4**: Utility-first CSS framework
- **bcryptjs 3.0**: Password hashing
- **React Hook Form 7.75**: Form handling

## Database Schema

### User Model

```prisma
model User {
  id        String     @id @default(cuid())
  name      String?
  email     String     @unique
  password  String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  posts     Post[]
}
```

### Post Model

```prisma
model Post {
  id        String     @id @default(cuid())
  title     String
  content   String?
  published Boolean    @default(false)
  author    User       @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints (signin, signout, etc.)

### Posts

- `GET /api/posts` - Get user's posts
- `POST /api/posts` - Create new post
- `DELETE /api/posts/[id]` - Delete post by ID

## Environment Variables

| Variable          | Description                   | Example                 |
| ----------------- | ----------------------------- | ----------------------- |
| `DATABASE_URL`    | PostgreSQL connection string  | `prisma+postgres://...` |
| `NEXTAUTH_URL`    | NextAuth callback URL         | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret for session encryption | `random-secret-key`     |

## Production Deployment

### 1. Update Environment Variables

- Set `NEXTAUTH_URL` to your production domain
- Generate a new `NEXTAUTH_SECRET`

### 2. Build

```bash
npm run build
```

### 3. Start

```bash
npm start
```

### 4. Deploy

Deploy to your preferred platform (Vercel, Netlify, etc.)

## Troubleshooting

### Database Connection Issues

- Verify your DATABASE_URL is correct
- Check your API key in Prisma Data Proxy
- Ensure you have internet connection for Prisma Accelerate

### Authentication Issues

- Clear browser cookies
- Verify NEXTAUTH_SECRET is set
- Check `next-auth` configuration in `lib/auth.js`

### Missing Dependencies

```bash
npm install
```

## License

MIT

## Support

For issues or questions, please check the official documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
