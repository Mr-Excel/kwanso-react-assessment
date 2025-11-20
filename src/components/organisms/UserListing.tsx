import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { useGetUsersQuery } from "@services/randomUserApi";
import {
  SearchBar,
  FilterDropdown,
  Pagination,
  UserCard,
} from "@components/molecules";
import { useFilterPersistence } from "@hooks/index";
import { useAppDispatch, setUsers, setSelectedUser } from "@store";
import type { User } from "@interfaces/index";
import { GENDER_OPTIONS, RESULTS_PER_PAGE } from "@constants/listing";

// Memoize GENDER_OPTIONS to prevent re-creation
const MEMOIZED_GENDER_OPTIONS = GENDER_OPTIONS;

// Memoize Pagination to prevent re-renders during search
const MemoizedPagination = memo(Pagination);

export const UserListing = () => {
  const dispatch = useAppDispatch();

  // Filter persistence
  const [genderFilter, setGenderFilter] = useFilterPersistence<string>(
    "gender",
    ""
  );
  const [currentPage, setCurrentPage] = useFilterPersistence<number>("page", 1);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch more results when searching to enable proper search functionality
  const resultsToFetch = searchTerm.trim() ? 5000 : RESULTS_PER_PAGE;

  // API call with filters
  const { data, isLoading, error, refetch } = useGetUsersQuery({
    results: resultsToFetch,
    page: searchTerm.trim() ? 1 : currentPage, // Always page 1 when searching
    gender: genderFilter ? (genderFilter as "male" | "female") : undefined,
  });

  // Store fetched users in Redux for profile page access
  useEffect(() => {
    if (data?.results) {
      dispatch(setUsers(data));
    }
  }, [data, dispatch]);

  // Client-side search filtering - works on all fetched results
  const allFilteredUsers = useMemo(() => {
    const results = data?.results;
    if (!results) {
      return [];
    }

    // If no search term, return API-paginated results as-is
    if (!searchTerm.trim()) {
      return results;
    }

    // When searching, filter all fetched results
    const term = searchTerm.toLowerCase();
    return results.filter(
      (user) =>
        user.name.first.toLowerCase().includes(term) ||
        user.name.last.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.login.username.toLowerCase().includes(term) ||
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(term)
    );
  }, [data?.results, searchTerm]);

  // Client-side pagination for search results, or use API results directly
  const paginatedUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      // No search: use API-paginated results directly
      return allFilteredUsers;
    }
    
    // Search: apply client-side pagination to filtered results
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
    const endIndex = startIndex + RESULTS_PER_PAGE;
    return allFilteredUsers.slice(startIndex, endIndex);
  }, [allFilteredUsers, currentPage, searchTerm]);

  // Memoize pagination info - works for both search and normal pagination
  const paginationInfo = useMemo(() => {
    if (searchTerm.trim()) {
      // Client-side pagination for search results
      const totalFiltered = allFilteredUsers.length;
      const totalPages = Math.ceil(totalFiltered / RESULTS_PER_PAGE) || 1;
      const hasNextPage = currentPage < totalPages;
      
      return { hasNextPage, totalPages };
    }
    
    // Server-side pagination (API handles pagination)
    const hasNextPage = paginatedUsers.length === RESULTS_PER_PAGE;
    const totalPages = Math.max(currentPage + 10, 100); // Allow up to 100 pages

    return { hasNextPage, totalPages };
  }, [searchTerm, allFilteredUsers.length, currentPage, paginatedUsers.length]);

  // Reset to page 1 when filters change - memoized to prevent re-renders
  const handleGenderChange = useCallback(
    (value: string) => {
      setGenderFilter(value);
      setCurrentPage(1);
    },
    [setGenderFilter, setCurrentPage]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
    },
    [setCurrentPage]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setCurrentPage]
  );

  const handleUserClick = useCallback(
    (user: User) => {
      dispatch(setSelectedUser(user));
      // User is already stored in Redux via the useEffect above
    },
    [dispatch]
  );

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setGenderFilter("");
  }, [setGenderFilter]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              Error loading users. Please try again.
            </p>
            <button
              onClick={handleRetry}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Listing
          </h1>
          <p className="text-gray-600">
            Browse and search through our user directory
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4 md:space-y-0 md:flex md:gap-4">
          <div className="flex-1">
            <label
              htmlFor="search-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Users
            </label>
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="w-full md:w-48">
            <FilterDropdown
              label="Filter by Gender"
              value={genderFilter}
              options={MEMOIZED_GENDER_OPTIONS}
              onChange={handleGenderChange}
              placeholder="All Genders"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Results */}
        {!isLoading && paginatedUsers.length > 0 && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {searchTerm ? (
                <>
                  Showing {paginatedUsers.length} of {allFilteredUsers.length} search result
                  {allFilteredUsers.length !== 1 ? "s" : ""} (Page {currentPage} of {paginationInfo.totalPages})
                </>
              ) : (
                <>
                  Showing page {currentPage} ({paginatedUsers.length} user
                  {paginatedUsers.length !== 1 ? "s" : ""} per page)
                </>
              )}{" "}
              {genderFilter && ` • Filtered: ${genderFilter}`}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {paginatedUsers.map((user) => (
                <UserCard
                  key={user.login.uuid}
                  user={user}
                  onClick={handleUserClick}
                />
              ))}
            </div>

            {/* Pagination - Always show when there are results */}
            {paginationInfo.totalPages > 1 && (
              <MemoizedPagination
                currentPage={currentPage}
                totalPages={paginationInfo.totalPages}
                hasNextPage={paginationInfo.hasNextPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && paginatedUsers.length === 0 && allFilteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No users found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms or filters."
                : "No users match your current filters."}
            </p>
            {(searchTerm || genderFilter) && (
              <button
                onClick={handleClearFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
