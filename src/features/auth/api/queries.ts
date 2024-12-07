// Query keys
const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'me'] as const,
  login: () => [...authKeys.all, 'login'] as const,
  logout: () => [...authKeys.all, 'logout'] as const,
}

// Hooks
// export const useLogin = () => {
//   const queryClient = useQueryClient()
//   const setUser = useUserStore((state) => state.setUser)

//   return useMutation({
//     mutationFn: async ({ email, password }: LoginRequest) => {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       })

//       if (error) throw error

//       return {
//         session: data.session,
//         user: data.user as User,
//       }
//     },
//     onSuccess: (data) => {
//       setUser(data.user)
//       queryClient.setQueryData(authKeys.currentUser(), data.user)
//     },
//   })
// }

// export const useLogout = () => {
//   const queryClient = useQueryClient()
//   const clearUser = useUserStore((state) => state.clearUser)

//   return useMutation({
//     mutationFn: async () => {
//       const { error } = await supabase.auth.signOut()
//       if (error) throw error
//     },
//     onSuccess: () => {
//       clearUser()
//       queryClient.setQueryData(authKeys.currentUser(), null)
//     },
//   })
// }

// export const useCurrentUser = () => {
//   const setUser = useUserStore((state) => state.setUser)

//   return useQuery({
//     onSuccess: (data) => {
//       setUser(data)
//     },
//     queryFn: async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser()

//       if (error || !user) {
//         throw error || new Error('User not found')
//       }

//       return user as User
//     },
//     queryKey: authKeys.currentUser(),
//   })
// }
