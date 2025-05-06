import type { QueryClient } from '@tanstack/react-query'
// import path from 'path/win32'

export const queryKeys = {
  userReport: () => ['userReports'],
  // userReportDetails: (report: Report) => [
  //   'userReportsDetails',
  //   report.userId,
  //   report.chatSessionId,
  //   report.chatSessionDetailId,
  // ],
  // patientDocList: (report: Report) => [
  //   'patientDocList',
  //   report.userId,
  //   report.chatSessionId,
  //   report.chatSessionDetailId,
  //   report.type,
  // ],
}

// React Query Keys - Reference Implementation
// This provides a structured approach to managing query keys across your application

// const exampleQueryKeys = {
//   // Basic keys for direct entity types
//   todos: {
//     all: ['todos'],                                // For fetching all todos
//     lists: () => [...queryKeys.todos.all, 'list'], // Namespace for todo lists
//     list: (filters) => [                           // For a specific filtered list
//       ...queryKeys.todos.lists(),
//       filters                                      // Objects are automatically stably hashed
//     ],
//     details: () => [...queryKeys.todos.all, 'detail'], // Namespace for todo details
//     detail: (id) => [                              // For a specific todo by ID
//       ...queryKeys.todos.details(),
//       id,                                          // Primitives work well as keys
//     ],
//   },

//   // Nested data structures
//   users: {
//     all: ['users'],
//     details: () => [...queryKeys.users.all, 'detail'],
//     detail: (userId) => [...queryKeys.users.details(), userId],
//     posts: (userId) => [                           // Relationship: user's posts
//       ...queryKeys.users.detail(userId),
//       'posts',
//     ],
//     followers: (userId) => [                       // Another relationship
//       ...queryKeys.users.detail(userId),
//       'followers',
//     ],
//   },

//   // Complex data with parameters and search
//   products: {
//     all: ['products'],
//     list: (params) => [                            // Params for filtering/pagination
//       ...queryKeys.products.all,
//       'list',
//       params,                                      // Contains category, sorting, pagination
//     ],
//     search: (term) => [                            // Search has its own namespace
//       ...queryKeys.products.all,
//       'search',
//       term,
//     ],
//     trending: () => [                              // Special collection
//       ...queryKeys.products.all,
//       'trending',
//     ],
//   },

//   // Auth-related keys
//   auth: {
//     user: ['auth', 'user'],                        // Current user profile
//     session: ['auth', 'session'],                  // Session information
//     permissions: ['auth', 'permissions'],          // User permissions
//   },

//   // Feature-specific keys
//   ui: {
//     theme: ['ui', 'theme'],                        // UI state that might be persisted/fetched
//     notifications: ['ui', 'notifications'],        // UI notifications from backend
//   },

//   // Using factory function pattern for complex cases
//   reports: {
//     base: ['reports'],
//     analytics: (params) => {
//       const { startDate, endDate, metrics, ...filters } = params;
//       return [
//         ...queryKeys.reports.base,
//         'analytics',
//         { startDate, endDate, metrics },           // Group important date params
//         filters,                                   // Other filters separate for easier updates
//       ];
//     },
//   },

//   // Keys for real-time data
//   realtime: {
//     chats: (roomId) => ['realtime', 'chats', roomId],
//     status: (entityType, entityId) => [
//       'realtime', 'status', entityType, entityId,  // Good for invalidating by entity
//     ],
//   },
// };

// Utility to invalidate all queries related to a specific entity
// const getEntityQueries = (entityType, entityId) => {
//   return [queryKeys[entityType].detail(entityId)]; // Return array of query keys to invalidate
// };

// Usage example:
// const { data } = useQuery({
//   queryKey: queryKeys.todos.list({ status: 'active', priority: 'high' }),
//   queryFn: () => fetchTodos({ status: 'active', priority: 'high' }),
// });

export const invalidateAllQueries = (queryClient: QueryClient) => {
  // For logout scenarios, we want to completely clear the cache rather than just invalidate
  // This ensures no stale user data remains when a new user logs in
  queryClient.clear()

  // Log the cache clear operation (optional)
  if (process.env.NODE_ENV !== 'production') {
    console.log('React Query cache cleared due to user logout')
  }
}
