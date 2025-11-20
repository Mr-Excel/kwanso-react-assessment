# Random User API Service - RTK Query

This service uses RTK Query (Redux Toolkit Query) to interact with the [Random User Generator API](https://randomuser.me/api/).

## Available Endpoints

The API service provides two endpoints:

1. **Get All Users** - Fetch multiple users with optional filters
2. **Get User By ID** - Fetch a specific user by UUID

## 1. Get All Users

### `useGetUsersQuery` - Automatic Query

Runs automatically when the component mounts:

```typescript
import { useGetUsersQuery } from '@services/randomUserApi';

const MyComponent = () => {
  const { data, error, isLoading, isFetching } = useGetUsersQuery({
    results: 10,
    gender: 'female',
    nat: 'US'
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      {data?.results.map(user => (
        <div key={user.login.uuid}>
          {user.name.first} {user.name.last}
        </div>
      ))}
    </div>
  );
};
```

### `useLazyGetUsersQuery` - Manual Query

Runs only when you explicitly call it:

```typescript
import { useLazyGetUsersQuery } from '@services/randomUserApi';

const MyComponent = () => {
  const [fetchUsers, { data, error, isLoading }] = useLazyGetUsersQuery();

  const handleFetch = () => {
    fetchUsers({ results: 20, gender: 'male', nat: 'GB' });
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={isLoading}>
        Fetch Users
      </button>
      {data?.results.map(user => (
        <div key={user.login.uuid}>{user.name.first}</div>
      ))}
    </div>
  );
};
```

### Available Parameters

```typescript
interface FetchUsersParams {
  results?: number;        // 1-5000, default: 1
  gender?: 'male' | 'female';
  password?: string;       // Format: "CHARSETS,MIN-MAX"
  seed?: string;          // For consistent results
  format?: ApiFormat;     // 'json' | 'pretty' | 'prettyJSON' | 'csv' | 'yaml' | 'xml'
  version?: string;       // e.g., "1.4"
  nat?: Nationality | Nationality[];  // Single or comma-separated list
  page?: number;          // 1-based index for pagination
  inc?: FieldToInclude[]; // Fields to include
  exc?: FieldToInclude[]; // Fields to exclude
  dl?: boolean;           // Download flag
  noinfo?: boolean;       // Exclude info object
  callback?: string;      // JSONP callback name
}
```

### Examples

```typescript
// Fetch 50 users
useGetUsersQuery({ results: 50 });

// Fetch female users from US
useGetUsersQuery({ results: 20, gender: 'female', nat: 'US' });

// Fetch users from multiple countries
useGetUsersQuery({ results: 30, nat: ['US', 'CA', 'GB', 'FR'] });

// Fetch with pagination and seed
useGetUsersQuery({ results: 10, page: 1, seed: 'abc123' });

// Fetch specific fields only
useGetUsersQuery({
  results: 10,
  inc: ['gender', 'name', 'email', 'nat']
});

// Skip initial query
useGetUsersQuery({ results: 10 }, { skip: !shouldFetch });
```

## 2. Get User By ID

### `useGetUserByIdQuery` - Automatic Query

```typescript
import { useGetUserByIdQuery } from '@services/randomUserApi';

const UserDetail = ({ userId }: { userId: string }) => {
  const { data, error, isLoading } = useGetUserByIdQuery({
    uuid: userId,
    params: { gender: 'male' } // Optional additional params
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  const user = data?.results[0];

  return (
    <div>
      <h1>{user?.name.first} {user?.name.last}</h1>
      <p>{user?.email}</p>
      <p>{user?.location.city}, {user?.location.country}</p>
    </div>
  );
};
```

### `useLazyGetUserByIdQuery` - Manual Query

```typescript
import { useLazyGetUserByIdQuery } from '@services/randomUserApi';

const MyComponent = () => {
  const [fetchUser, { data, isLoading }] = useLazyGetUserByIdQuery();

  const handleFetch = () => {
    fetchUser({ uuid: 'some-uuid-here' });
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={isLoading}>
        Load User
      </button>
      {data?.results[0] && (
        <div>{data.results[0].name.first}</div>
      )}
    </div>
  );
};
```

**Note**: The Random User API doesn't support direct UUID lookup. This endpoint uses the UUID as a seed to fetch a consistent user. If you need to find a user that was already fetched, consider using Redux selectors instead.

## RTK Query Hook Return Values

All hooks return an object with these properties:

```typescript
{
  data: UserApiResponse | undefined,        // Response data
  error: SerializedError | FetchBaseQueryError | undefined,  // Error object
  isLoading: boolean,                        // Initial load state
  isFetching: boolean,                       // Any fetch in progress
  isSuccess: boolean,                        // Request succeeded
  isError: boolean,                          // Request failed
  refetch: () => void,                       // Refetch function
  // ... other RTK Query properties
}
```

For lazy queries, the return value is a tuple:

```typescript
[
  triggerFunction,  // Function to trigger the query
  {
    data,
    error,
    isLoading,
    // ... same properties as above
  }
]
```

## Combining with Redux Selectors

You can combine RTK Query with Redux selectors for local state management:

```typescript
import { useGetUsersQuery } from '@services/randomUserApi';
import { useAppSelector, useAppDispatch } from '@store';
import { selectUserById, setSelectedUser } from '@store';

const MyComponent = () => {
  const { data } = useGetUsersQuery({ results: 10 });
  const dispatch = useAppDispatch();

  // After fetching, users are in RTK Query cache
  // You can also store them in Redux for local filtering
  const user = useAppSelector((state) => 
    selectUserById('some-uuid')(state)
  );

  const handleSelectUser = (uuid: string) => {
    const foundUser = data?.results.find(u => u.login.uuid === uuid);
    if (foundUser) {
      dispatch(setSelectedUser(foundUser));
    }
  };

  return (
    <div>
      {/* Render users from RTK Query */}
      {data?.results.map(user => (
        <button
          key={user.login.uuid}
          onClick={() => handleSelectUser(user.login.uuid)}
        >
          {user.name.first}
        </button>
      ))}
    </div>
  );
};
```

## Caching & Refetching

RTK Query automatically caches responses. You can manually refetch:

```typescript
const { data, refetch, isFetching } = useGetUsersQuery({ results: 10 });

// Manually refetch
const handleRefresh = () => {
  refetch();
};
```
