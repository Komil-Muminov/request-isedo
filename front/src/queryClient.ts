import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 3600000,
			refetchOnWindowFocus: false,
		},
	},
});
