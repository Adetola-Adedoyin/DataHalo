# DataHalo Drive - Frontend

A modern, responsive cloud storage application built with React and Vite, featuring drag-and-drop file uploads, offline storage, and a beautiful dark/light theme interface.

## 🚀 Features

- **Authentication System**: Sign up/login with form validation
- **File Management**: Upload, download, and delete files with drag-and-drop support
- **Offline Storage**: Uses IndexedDB for client-side file storage
- **Progressive Web App**: Service worker for offline functionality
- **Dark/Light Theme**: Toggle between themes with smooth animations
- **File Type Recognition**: Categorizes files by type (images, videos, audio, documents, archives)
- **Storage Analytics**: Visual storage usage with progress bars
- **Responsive Design**: Mobile-first approach with modern UI
- **Smooth Animations**: Framer Motion for enhanced user experience

## 🛠️ Tech Stack

- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Styling**: CSS3 with custom properties and animations
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Storage**: IndexedDB for client-side file storage
- **PWA**: Service Worker for offline functionality

## 📁 Project Structure

```
Front-end/
├── src/
│   ├── components/
│   │   ├── Auth.jsx          # Authentication component
│   │   ├── Dashboard.jsx     # Main dashboard interface
│   │   └── FileItem.jsx      # Individual file display component
│   ├── utils/
│   │   └── storage.js        # IndexedDB storage utilities
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles and theme definitions
├── components/               # Legacy components (JS versions)
├── utils/                    # Legacy utilities
├── index.html                # HTML template
├── sw.js                     # Service worker for PWA functionality
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── style.css                 # Additional styles
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager

### Local Development Setup

1. **Navigate to the Front-end directory**
   ```bash
   cd Data-Halo/Front-end
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```
   This will install all packages listed in `package.json`:
   - React & React DOM
   - Vite (build tool)
   - Lucide React (icons)
   - Framer Motion (animations)
   - TypeScript definitions

3. **Start the development server**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:3000`
   - Hot reload enabled
   - Development mode with debugging

4. **Access the application**
   - Open your browser to `http://localhost:3000`
   - You should see the DataHalo Drive login page

### Production Build

1. **Build for production**
   ```bash
   npm run build
   ```
   - Creates optimized build in `dist/` folder
   - Minifies and bundles all assets

2. **Preview production build locally**
   ```bash
   npm run preview
   ```
   - Serves the production build locally
   - Test production performance

### Troubleshooting

**If you encounter issues:**

1. **Clear npm cache**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Node.js version**
   ```bash
   node --version
   npm --version
   ```

## 📋 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🔧 Core Components

### Authentication (`src/components/Auth.jsx`)
- **Purpose**: Handles user registration and login
- **Features**:
  - Toggle between sign-up and login modes
  - Form validation for required fields
  - Password confirmation for registration
  - Responsive form design
- **Props**: `onLogin(userData)` - Callback for successful authentication

### Dashboard (`src/components/Dashboard.jsx`)
- **Purpose**: Main application interface after login
- **Features**:
  - File upload via drag-and-drop or file picker
  - Storage analytics with visual progress bars
  - File categorization by type
  - Download and delete file actions
  - Dark/light theme toggle
  - User profile display
- **Props**: 
  - `user` - User object with username and email
  - `onLogout()` - Callback for logout action

### Storage Utilities (`src/utils/storage.js`)
- **Purpose**: IndexedDB operations for file management
- **Functions**:
  - `saveFile(file)` - Store file in IndexedDB
  - `getFiles()` - Retrieve all stored files
  - `deleteFile(filename)` - Remove file from storage
- **Database**: Uses 'DriveAppDB' with 'files' object store

## 🎨 Styling & Theming

### CSS Architecture
- **Global Styles**: Defined in `src/index.css`
- **Theme System**: CSS custom properties for light/dark themes
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Animations**: Smooth transitions and hover effects

### Theme Toggle
```javascript
const [darkMode, setDarkMode] = useState(false)
// Toggle adds 'dark' class to dashboard container
```

### File Type Styling
- **Images**: Green (#10b981)
- **Videos**: Orange (#f59e0b)
- **Audio**: Purple (#8b5cf6)
- **Documents**: Blue (#3b82f6)
- **Archives**: Orange (#f97316)
- **Other**: Gray (#6b7280)

## 💾 Storage System

### IndexedDB Implementation
- **Database Name**: 'DriveAppDB'
- **Object Store**: 'files' with keyPath 'name'
- **File Structure**:
  ```javascript
  {
    name: string,      // Original filename
    type: string,      // MIME type
    data: Array        // File data as Uint8Array
  }
  ```

### Storage Limits
- **Maximum Storage**: 5GB (configurable)
- **File Size**: No explicit limit (browser dependent)
- **File Types**: All types supported

## 🔄 Service Worker (PWA)

### Cache Strategy (`sw.js`)
- **Cache Name**: 'drive-app-cache-v2'
- **Cached Assets**:
  - Root path (/)
  - index.html
  - Main JavaScript and CSS files
- **Strategy**: Cache first, then network fallback

### PWA Features
- Offline file access
- App-like experience
- Fast loading with cached resources

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Single column layout for stats grid
- Smaller file grid items
- Touch-friendly buttons
- Reduced padding and margins

## 🎭 Animations

### Framer Motion Integration
- **Page Transitions**: Smooth enter/exit animations
- **Hover Effects**: Scale and elevation changes
- **Loading States**: Skeleton animations
- **Drag Interactions**: Visual feedback for file uploads

### Animation Examples
```javascript
// Card hover animation
<motion.div 
  whileHover={{ scale: 1.05, y: -10 }}
  transition={{ type: "spring", stiffness: 300 }}
>
```

## 🔐 Security Considerations

### Client-Side Storage
- Files stored locally in IndexedDB
- No server-side storage or transmission
- User data remains on device

### Authentication
- Basic form validation
- No password encryption (demo purposes)
- Session persistence via localStorage

## 🐛 Known Issues & Limitations

1. **File Size**: Large files may cause performance issues
2. **Browser Support**: IndexedDB required (modern browsers only)
3. **Storage Quota**: Browser-dependent storage limits
4. **Authentication**: Demo-level security implementation

## 🚀 Future Enhancements

- [ ] Real backend integration
- [ ] File sharing capabilities
- [ ] Advanced search and filtering
- [ ] File versioning
- [ ] Collaborative features
- [ ] Enhanced security measures
- [ ] Cloud synchronization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the DataHalo Drive application suite.

---

**Built with ❤️ using React and modern web technologies**