# React User Listing - Kwanso Assessment

A modern React application built with TypeScript, Vite, Redux Toolkit (RTK Query), and Tailwind CSS 4. This application demonstrates a user listing component with pagination, filtering, and search functionality using the Atomic Design pattern.

## 🚀 Features

- ✅ **User Listing** with pagination
- ✅ **Gender Filtering** with persistence (survives navigation)
- ✅ **Search Functionality** (fixed - works with pagination)
- ✅ **User Profile Pages** with React Router navigation
- ✅ **Google Maps Integration** on profile pages (bonus)
- ✅ **Nationality Flags** displayed throughout (bonus)
- ✅ **Responsive Design** using Tailwind CSS 4
- ✅ **Atomic Design Pattern** for component architecture
- ✅ **RTK Query** for data fetching and caching
- ✅ **Redux Toolkit** for state management
- ✅ **TypeScript** for type safety

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Approach](#architecture-approach)
  - [Atomic Design Pattern](#atomic-design-pattern)
  - [Filter Persistence Strategy](#filter-persistence-strategy)
  - [Search Functionality Approach](#search-functionality-approach)
  - [Pagination Implementation](#pagination-implementation)
- [Getting Started](#getting-started)
- [Component Documentation](#component-documentation)
- [API Integration](#api-integration)

## 🛠 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Atomic Design** - Component architecture pattern

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/              # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Avatar.tsx
│   │   └── Badge.tsx
│   ├── molecules/          # Simple component groups
│   │   ├── SearchBar.tsx
│   │   ├── FilterDropdown.tsx
│   │   ├── Pagination.tsx
│   │   └── UserCard.tsx
│   ├── organisms/          # Complex UI components
│   │   └── UserListing.tsx
│   └── templates/          # Page layouts (future use)
├── hooks/
│   └── useFilterPersistence.ts  # Custom hook for filter persistence
├── interface/
│   └── index.ts            # TypeScript interfaces
├── services/
│   └── randomUserApi.ts    # RTK Query API service
├── store/
│   ├── slices/             # Redux slices
│   ├── selectors/          # Redux selectors
│   ├── hooks.ts            # Typed Redux hooks
│   └── store.ts            # Redux store configuration
└── App.tsx                 # Root component
```

## 🏗 Architecture Approach

### Atomic Design Pattern

This project follows the **Atomic Design** methodology, which breaks down interfaces into hierarchical components:

#### **Atoms** (`src/components/atoms/`)
Fundamental building blocks that cannot be broken down further:
- `Button` - Reusable button with variants (primary, secondary, outline, ghost)
- `Input` - Text input with labels, icons, and error states
- `Select` - Dropdown select component
- `Card` - Container component with padding and hover effects
- `Avatar` - User avatar with fallback initials
- `Badge` - Status badge with color variants

**Why Atoms?**
- Highly reusable across the application
- Single responsibility principle
- Easy to test and maintain
- Consistent styling through Tailwind utilities

#### **Molecules** (`src/components/molecules/`)
Simple combinations of atoms that form functional units:
- `SearchBar` - Input with search icon and debouncing
- `FilterDropdown` - Select wrapper with label and placeholder handling
- `Pagination` - Navigation controls for paginated data
- `UserCard` - Card displaying user information using Avatar, Card, and Badge atoms

**Why Molecules?**
- Encapsulate common UI patterns
- Composable from atoms
- Still reusable but more specific to use cases

#### **Organisms** (`src/components/organisms/`)
Complex components combining molecules and atoms:
- `UserListing` - Complete listing page with search, filters, pagination, and user cards

**Why Organisms?**
- Represent distinct sections of an interface
- Combine multiple molecules and atoms
- Can manage their own state and data fetching

### Filter Persistence Strategy

**Problem**: Filters should persist when navigating away from the page, ensuring users don't lose their filter preferences.

**Solution**: Custom `useFilterPersistence` hook using `localStorage`.

#### Implementation Details

```typescript
// src/hooks/useFilterPersistence.ts
export const useFilterPersistence = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  // 1. Read from localStorage on mount
  // 2. Save to localStorage on change
  // 3. Handle errors gracefully
}
```

#### Usage

```typescript
// In UserListing component
const [genderFilter, setGenderFilter] = useFilterPersistence<string>("gender", "");
const [currentPage, setCurrentPage] = useFilterPersistence<number>("page", 1);
```

#### Benefits

1. **Persistence**: Filters survive page refreshes and navigation
2. **Type-safe**: Full TypeScript support with generics
3. **Error handling**: Graceful fallback to initial values
4. **Automatic**: No manual save/load logic needed
5. **Scalable**: Easy to add more persistent filters

#### Storage Keys

All filters are stored with the prefix `user_listing_filter_`:
- `user_listing_filter_gender` - Gender filter value
- `user_listing_filter_page` - Current page number

#### Why localStorage?

- ✅ Simple and fast
- ✅ Works across browser sessions
- ✅ No server-side setup required
- ✅ Automatic cleanup possible if needed
- ⚠️ Limited to ~5-10MB per domain
- ⚠️ Synchronous (can block main thread)

**Alternative Approaches Considered:**
- **URL Parameters**: Good for shareable links but requires router setup
- **Redux Persist**: Overkill for simple filter persistence
- **SessionStorage**: Doesn't persist across browser sessions

### Search Functionality Approach

**Problem**: Enable users to search through the user listing by name, email, or username.

**Solution**: **Client-side filtering** with debounced input.

#### Why Client-Side Search?

1. **Immediate Results**: No API delay for instant feedback
2. **Reduced API Calls**: Server handles pagination; client handles search
3. **Better UX**: Fast, responsive search experience
4. **Cost Efficient**: Less server load and bandwidth

#### Implementation

```typescript
// Search is debounced to avoid excessive filtering
const [searchTerm, setSearchTerm] = useState("");

// Client-side filtering using useMemo for performance
const filteredUsers = useMemo(() => {
  if (!data?.results || !searchTerm.trim()) {
    return data?.results || [];
  }
  
  const term = searchTerm.toLowerCase();
  return data.results.filter(
    (user) =>
      user.name.first.toLowerCase().includes(term) ||
      user.name.last.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.login.username.toLowerCase().includes(term)
  );
}, [data?.results, searchTerm]);
```

#### Search Features

- **Debouncing**: 300ms delay to reduce filtering operations
- **Multi-field Search**: Searches across name, email, and username
- **Case-insensitive**: Converts to lowercase for matching
- **Real-time**: Updates as user types
- **Memory Efficient**: Uses `useMemo` to prevent unnecessary recalculations

#### Search vs. API Filters

| Feature | Client-Side Search | API Filtering |
|---------|-------------------|---------------|
| Speed | Instant | Network delay |
| Fields | Any field | Limited to API params |
| Pagination | Filters current page | Works with pagination |
| Use Case | User lookup | Data filtering |

**Hybrid Approach**: This project uses both:
- **API filters** for gender (affects paginated results)
- **Client-side search** for text search (filters displayed results)

### Pagination Implementation

**Problem**: Display large datasets in manageable chunks.

**Solution**: Server-side pagination with RTK Query.

#### Approach

```typescript
const RESULTS_PER_PAGE = 12;

const { data } = useGetUsersQuery({
  results: RESULTS_PER_PAGE,
  page: currentPage,
  gender: genderFilter || undefined,
});
```

#### Features

1. **Server-Side Pagination**: API handles page slicing
2. **Persistent Page**: Current page persists using `useFilterPersistence`
3. **Smart Navigation**: Ellipsis for large page counts
4. **Smooth Scrolling**: Auto-scroll to top on page change
5. **Loading States**: Visual feedback during data fetching

#### Pagination Component

The `Pagination` molecule handles:
- Previous/Next buttons
- Page number buttons
- Ellipsis for large page counts (e.g., 1 ... 5 6 7 ... 20)
- Active state highlighting
- Accessibility attributes (ARIA labels)

#### Why Server-Side?

- ✅ Consistent data across page refreshes
- ✅ Efficient memory usage (only loads current page)
- ✅ Works well with API filters
- ⚠️ Requires API support (which Random User API provides)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-user-listing
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

5. Preview production build:
```bash
pnpm preview
```

## 📚 Component Documentation

### Atoms

#### Button
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

#### Input
```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error="Invalid email"
/>
```

#### Select
```tsx
<Select
  label="Gender"
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  options={[
    { value: "male", label: "Male" },
    { value: "female", label: "Female" }
  ]}
/>
```

### Molecules

#### SearchBar
```tsx
<SearchBar
  onSearch={(value) => handleSearch(value)}
  debounceMs={300}
  placeholder="Search users..."
/>
```

#### Pagination
```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
/>
```

### Organisms

#### UserListing
The main listing component that combines all functionality:

```tsx
<UserListing />
```

Features:
- Automatic data fetching
- Search and filter controls
- User card grid
- Pagination
- Loading and error states

## 🔌 API Integration

This project uses RTK Query to interact with the [Random User API](https://randomuser.me/api/).

### Endpoints

- `getUsers` - Fetch paginated users with optional filters
- `getUserById` - Fetch a single user by UUID

See [API Documentation](./src/services/README.md) for detailed usage.

### Example

```typescript
import { useGetUsersQuery } from '@services/randomUserApi';

const { data, isLoading, error } = useGetUsersQuery({
  results: 12,
  page: 1,
  gender: 'female'
});
```

## 🎨 Tailwind CSS 4 Setup

This project uses Tailwind CSS 4 with the new `@import` syntax:

```css
/* src/index.css */
@import "tailwindcss";
```

### Configuration

- **PostCSS**: Configured in `postcss.config.js`
- **No Config File**: Tailwind 4 uses CSS-based configuration
- **JIT Mode**: Enabled by default in v4

## 📝 Best Practices

1. **Component Composition**: Build complex components from simple atoms
2. **Type Safety**: All components are fully typed with TypeScript
3. **Accessibility**: ARIA labels and semantic HTML throughout
4. **Performance**: `useMemo` for expensive computations, debouncing for search
5. **Error Handling**: Graceful error states and retry mechanisms
6. **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 🗺️ Google Maps Integration

The profile page includes Google Maps integration to display user locations.

### Setup

1. Get a Google Maps API Key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the "Maps Embed API" for your project
3. Create a `.env` file in the root directory:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
4. Restart the development server

### Features

- **Interactive Map**: Shows user location with coordinates
- **Full Screen Link**: Opens location in Google Maps
- **Graceful Fallback**: Shows placeholder if API key is not configured

### Note

The Maps Embed API is free for most use cases. If you don't have an API key, the profile page will still work but show a placeholder instead of the map.

## 🌍 Nationality Flags

Nationality flags are displayed using emoji characters for all supported countries:

- **Profile Page**: Large flag next to user name
- **User Cards**: Small flag with nationality badge
- **Supported Countries**: All countries available in the Random User API

## 🔍 Search Functionality Fix

The search functionality has been improved to work correctly with pagination:

### How It Works

1. **Without Search**: Normal pagination fetches 12 users per page from the API
2. **With Search**: Fetches up to 5000 users and filters client-side
3. **Pagination**: Disabled while searching (shows all filtered results)
4. **Performance**: Uses `useMemo` for efficient filtering

### Search Features

- **Debouncing**: 300ms delay to reduce filtering operations
- **Multi-field**: Searches name, email, and username
- **Case-insensitive**: Automatic lowercase conversion
- **Real-time**: Updates as you type

## 🧭 React Router Integration

The application uses React Router v7 for navigation:

- **Routes**:
  - `/` - User listing page
  - `/user/:uuid` - User profile page
- **Navigation**: Click on any user card to view their profile
- **Back Navigation**: "Back to Listing" button on profile page

## 🔮 Future Enhancements

- [ ] URL-based filter persistence (shareable links)
- [ ] Advanced filters (nationality, age range)
- [ ] Sorting options
- [ ] Virtual scrolling for large datasets
- [ ] Server-side search implementation
- [ ] Dark mode support
- [ ] Export user data to CSV/JSON

## 📄 License

This project is part of a technical assessment.

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Redux Toolkit
