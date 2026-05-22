// hooks/useUserData.ts
import { useMemo } from "react";
import Cookies from "js-cookie";
import { decodedToken } from "../utils/jwt";
import { IJwtPayload } from "../types/auth.type";

const useUserData = () => {
  const token = Cookies.get("main.bonavent_accessToken");

  const user = useMemo(() => {
    if (!token) return null;

    const decoded = decodedToken(token) as IJwtPayload | null;
    return decoded;
  }, [token]);

  return user;
};

export default useUserData;
