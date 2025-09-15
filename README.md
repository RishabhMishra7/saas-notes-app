# SaaS Notes App

A full-stack SaaS application for managing notes with user authentication and multi-tenancy support.

## Features

- User authentication and authorization
- Multi-tenant architecture
- Create, read, update, and delete notes
- Secure API with JWT tokens
- Modern React frontend with Next.js
- Node.js/Express backend with TypeScript
- Prisma ORM with database migrations
- Deployed on Vercel

## Tech Stack

### Frontend

- Next.js 14
- React
- TypeScript
- Tailwind CSS (via globals.css)

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT authentication
- bcryptjs for password hashing

### Database

- Prisma with migration support

### Deployment

- Vercel (Backend and Frontend)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/RishabhMishra7/saas-notes-app.git
cd saas-notes-app
```

2. Install dependencies for both frontend and backend:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Set up environment variables:

For backend, copy `backend/.env` and update the values:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
```

For frontend, copy `frontend/.env.local` and update:

```env
NEXT_PUBLIC_API_URL="your_backend_url"
```

4. Set up the database:

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

5. Run the development servers:

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is deployed on Vercel:

- **Frontend**: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)
- **Backend**: [https://backend-3swa15xlj-rishabhmishra7s-projects.vercel.app](https://backend-3swa15xlj-rishabhmishra7s-projects.vercel.app)

## Project Structure

```
saas-notes-app/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── prisma/
│   └── vercel.json
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
└── README.md
```

## API Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /notes` - Get all notes
- `POST /notes` - Create a note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note
- `GET /tenants` - Get tenants (admin)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
