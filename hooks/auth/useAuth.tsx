import { getUser } from "@/lib/userService";
import { User } from "@/types/auth/user";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth/me"],
    queryFn: async (): Promise<User> => {
      const response = await getUser();
      return response;
    },
  });
};
