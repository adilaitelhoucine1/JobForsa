# 🚀 JobForsa - Job Search Application

A modern, full-featured job search platform built with **Angular 21**, **NgRx** state management, **Tailwind CSS**, and **Server-Side Rendering (SSR)**. JobForsa connects job seekers with thousands of opportunities from the USAJobs API.

![Angular](https://img.shields.io/badge/Angular-21.0.0-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)
![NgRx](https://img.shields.io/badge/NgRx-21.0.1-purple?logo=ngrx)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1+-38B2AC?logo=tailwind-css)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Usage](#-usage)
- [NgRx State Management](#-ngrx-state-management)
- [API Integration](#-api-integration)
- [Authentication](#-authentication)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## ✨ Features

### 🔍 Job Search
- **Advanced Search** - Search by keyword, location, and filters
- **Real-time Results** - Powered by USAJobs API
- **Pagination** - Browse through thousands of job listings
- **Job Details** - Comprehensive job information

### 👤 User Management
- **User Registration** - Create account with validation
- **Secure Login** - Email/password authentication
- **Profile Management** - Update personal information
- **Account Deletion** - Remove account with confirmation

### ⭐ Favorites & Applications
- **Save Favorites** - Bookmark interesting jobs
- **Track Applications** - Monitor application status
- **Application History** - View all submitted applications
- **Status Updates** - Track application progress

### 🎨 Modern UI/UX
- **Responsive Design** - Works on all devices
- **Tailwind CSS** - Beautiful, utility-first styling
- **Loading States** - Smooth user experience
- **Error Handling** - User-friendly error messages
- **Form Validation** - Real-time reactive forms validation

### 🚀 Performance
- **Server-Side Rendering (SSR)** - Fast initial load
- **Lazy Loading** - Optimized bundle sizes
- **State Management** - Efficient NgRx store
- **HTTP Interceptors** - Automatic API key injection

---

## 🛠 Tech Stack

### Frontend Framework
- **Angular 21** - Latest Angular with standalone components
- **TypeScript 5+** - Type-safe development
- **RxJS 7.8** - Reactive programming

### State Management
- **NgRx Store** - Centralized state management
- **NgRx Effects** - Side effects handling
- **Selectors** - Optimized state queries

### Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Custom Components** - Reusable UI components
- **Responsive Design** - Mobile-first approach

### Backend & Data
- **JSON Server** - Mock REST API
- **USAJobs API** - Live job data
- **Express** - SSR server
- **HTTP Client** - Angular HTTP module

### Development Tools
- **Angular CLI** - Project scaffolding
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 📁 Project Structure

```
JobForsa/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── application-card/
│   │   │   ├── favorite-card/
│   │   │   ├── job-card/
│   │   │   ├── page-header/
│   │   │   ├── profile-info/
│   │   │   ├── search-bar/
│   │   │   └── stats-card/
│   │   │
│   │   ├── pages/               # Application pages
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── profile/
│   │   │   ├── job-search/
│   │   │   ├── favorites/
│   │   │   └── applications/
│   │   │
│   │   ├── store/               # NgRx state management
│   │   │   ├── auth/
│   │   │   │   ├── actions.auth.ts
│   │   │   │   ├── effects.auth.ts
│   │   │   │   ├── reducer.auth.ts
│   │   │   │   ├── selectors.auth.ts
│   │   │   │   └── state.auth.ts
│   │   │   ├── applications/
│   │   │   └── favorites/
│   │   │
│   │   ├── services/            # Business logic services
│   │   │   ├── authService.ts
│   │   │   ├── jobService.ts
│   │   │   ├── applicationsService.ts
│   │   │   └── favoritesService.ts
│   │   │
│   │   ├── guards/              # Route guards
│   │   │   ├── auth-guard.ts
│   │   │   └── visiteur-guard.ts
│   │   │
│   │   ├── interceptors/        # HTTP interceptors
│   │   │   └── usajobs.interceptor.ts
│   │   │
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── model/               # Data models
│   │   └── validators/          # Custom validators
│   │
│   ├── environments/            # Environment configs
│   ├── styles.css              # Global styles
│   └── index.html              # Entry HTML
│
├── public/                      # Static assets
├── db.json                      # Mock database
├── angular.json                 # Angular config
├── tailwind.config.js          # Tailwind config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies

```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **npm** >= 11.x
- **Angular CLI** 21.x

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd JobForsa
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy environment example
cp .env.example .env

# Edit environment files with your API keys
# src/environments/environment.ts
# src/environments/environment.development.ts
```

4. **Get USAJobs API Key**
- Visit [USAJobs Developer Portal](https://developer.usajobs.gov/APIRequest/Index)
- Request an API key
- Add to environment files

5. **Start the development servers**

```bash
# Terminal 1 - Angular dev server
npm start

# Terminal 2 - JSON Server (mock API)
npm run server
```

6. **Open your browser**
```
http://localhost:4200
```

---

## 🔐 Environment Setup

### Environment Files

Create these files for API configuration:

**`src/environments/environment.ts`** (Production)
```typescript
export const environment = {
  production: true,
  usaJobsApiKey: 'YOUR_API_KEY_HERE'
};
```

**`src/environments/environment.development.ts`** (Development)
```typescript
export const environment = {
  production: false,
  usaJobsApiKey: 'YOUR_API_KEY_HERE'
};
```

### Security
- ✅ Environment files are in `.gitignore`
- ✅ Never commit API keys
- ✅ Use `.env.example` for team sharing
- ✅ Different keys for dev/prod

📖 **Full guide**: See `ENVIRONMENT_SETUP.md`

---

## 📘 Usage

### Development

```bash
# Start dev server
npm start

# Start with SSR
npm run serve:ssr:JobForsa

# Build for production
npm run build

# Watch mode (auto-rebuild)
npm run watch

# Run tests
npm test

# Start mock API
npm run server
```

### User Workflows

#### 1. Register & Login
```
1. Navigate to /register
2. Fill registration form
3. Submit → Auto login
4. Redirect to home
```

#### 2. Search Jobs
```
1. Enter keyword/location
2. Click search
3. Browse results
4. View job details
```

#### 3. Save Favorites
```
1. Click ❤️ on job card
2. View in /favorites
3. Remove anytime
```

#### 4. Track Applications
```
1. Click "Track Application"
2. View in /applications
3. Update status
```

#### 5. Manage Profile
```
1. Go to /profile
2. Edit information
3. Save changes
4. Or delete account
```

---

## 🔄 NgRx State Management

### Store Structure

```typescript
{
  auth: {
    user: UserResponse | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  },
  favorites: {
    favorites: FavoriteOffer[],
    loading: boolean,
    error: string | null
  },
  applications: {
    applications: Application[],
    loading: boolean,
    error: string | null
  }
}
```

### Actions

```typescript
// Auth Actions
login(email, password)
loginSuccess(user)
loginFailure(error)
register(userData)
updateProfile(userId, userData)
deleteUser(userId)
logout()

// Favorites Actions
loadFavorites(userId)
addFavorite(favorite)
removeFavorite(id)

// Applications Actions
loadApplications(userId)
addApplication(application)
updateApplicationStatus(id, status)
```

### Effects

- ✅ Async operations
- ✅ API calls
- ✅ Error handling
- ✅ Side effects (navigation)

---

## 🌐 API Integration

### USAJobs API

**Base URL**: `https://data.usajobs.gov/api/search`

**Features**:
- Job search by keyword
- Location-based search
- Pagination
- Automatic API key injection (via interceptor)

**Example Request**:
```typescript
searchJobs({
  keyword: 'developer',
  location: 'California',
  page: 1,
  resultsPerPage: 10
})
```

### Mock API (JSON Server)

**Base URL**: `http://localhost:3000`

**Endpoints**:
- `GET /users` - Get all users
- `POST /users` - Register user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /favoritesOffers` - Get favorites
- `POST /favoritesOffers` - Add favorite
- `DELETE /favoritesOffers/:id` - Remove favorite
- `GET /applications` - Get applications
- `POST /applications` - Add application

---

## 🔒 Authentication

### Features
- ✅ JWT-based (localStorage)
- ✅ Route guards
- ✅ Auto-redirect
- ✅ Session persistence
- ✅ Secure password handling

### Route Protection

```typescript
// Protected Routes (require auth)
/profile
/favorites
/applications

// Guest Routes (require no auth)
/login
/register

// Public Routes
/
/jobs
```

### Guards

**AuthGuard**: Protects authenticated routes
```typescript
canActivate: [AuthGuard]
```

**VisiteurGuard**: Prevents authenticated users from accessing guest pages
```typescript
canActivate: [VisiteurGuard]
```

---

## 📚 Documentation

Comprehensive documentation available:

- **[FORM_VALIDATION_GUIDE.md](FORM_VALIDATION_GUIDE.md)** - Complete form validation reference
- **[ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)** - Environment configuration guide
- **[INFINITE_LOADING_FIX.md](INFINITE_LOADING_FIX.md)** - Bug fixes documentation
- **[IMPROVEMENTS_SUMMARY.md](IMPROVEMENTS_SUMMARY.md)** - Code improvements log

---

## 🎨 Components

### Reusable Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `JobCard` | Display job listing | `job: JobOffer` |
| `ApplicationCard` | Show application | `application: Application` |
| `FavoriteCard` | Favorite job item | `favorite: FavoriteOffer` |
| `PageHeader` | Page title/subtitle | `title, subtitle, icon` |
| `SearchBar` | Search input fields | `keyword, location, loading` |
| `StatsCard` | Statistics display | `stats: Array<{value, label}>` |
| `ProfileInfo` | User profile header | `user: UserResponse` |

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/JobForsa/`

### SSR Deployment

```bash
# Build with SSR
npm run build

# Start SSR server
npm run serve:ssr:JobForsa
```

### Environment Variables

Set on your hosting platform:
- `USAJOBS_API_KEY` - Your API key
- `NODE_ENV=production`

**Recommended Platforms**:
- Vercel
- Netlify
- AWS Amplify
- Firebase Hosting

---

## 🐛 Known Issues & Solutions

### Issue: Infinite Loading on Login Failure
**Solution**: Fixed in reducer - `loading: false` on login failure

### Issue: 404 on Favorites Route (SSR)
**Solution**: Normal during SSR, works in browser

### Issue: API Key Exposed
**Solution**: Moved to environment files

📖 **Full details**: See `INFINITE_LOADING_FIX.md`

---

## 🔧 Configuration Files

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {}
  }
}
```

### TypeScript Config
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ES2022"
  }
}
```

---

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Style

- **Angular Style Guide** - Follow official guidelines
- **Prettier** - Auto-format on save
- **ESLint** - Lint before commit
- **TypeScript** - Strict mode enabled

---

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server (port 4200) |
| `npm run build` | Build for production |
| `npm run watch` | Watch mode with auto-rebuild |
| `npm test` | Run unit tests |
| `npm run server` | Start JSON server (port 3000) |
| `npm run serve:ssr:JobForsa` | Start SSR server |

---

## 🎯 Roadmap

### Phase 1 (Current) ✅
- [x] User authentication
- [x] Job search integration
- [x] Favorites management
- [x] Applications tracking
- [x] Profile management
- [x] Responsive design

### Phase 2 (Planned) 🚧
- [ ] Email notifications
- [ ] Resume upload
- [ ] Advanced filters
- [ ] Company profiles
- [ ] Real-time chat
- [ ] Job recommendations AI

### Phase 3 (Future) 💡
- [ ] Mobile app (Ionic)
- [ ] Social features
- [ ] Interview scheduling
- [ ] Salary insights
- [ ] Skills assessments

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Project by**: Youcode Students  
**Course**: Front End Development  
**Date**: February 2026

---

## 📞 Support

For issues, questions, or contributions:

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@jobforsa.com

---

## 🙏 Acknowledgments

- **USAJobs API** - Job data provider
- **Angular Team** - Amazing framework
- **NgRx Team** - State management solution
- **Tailwind CSS** - Styling framework
- **Youcode** - Educational support

---

## 📊 Project Stats

- **Angular Version**: 21.0.0
- **TypeScript**: 5.0+
- **Components**: 15+
- **Pages**: 7
- **State Slices**: 3
- **Bundle Size**: ~350 KB (initial)
- **Build Time**: ~5 seconds

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Built with ❤️ using Angular & NgRx**

[Report Bug](https://github.com/your-repo/issues) · [Request Feature](https://github.com/your-repo/issues) · [Documentation](https://github.com/your-repo/wiki)

</div>

