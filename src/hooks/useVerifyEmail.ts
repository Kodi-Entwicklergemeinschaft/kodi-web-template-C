import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, APPROUTES, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { useEffect } from "react";
import { useRouter, useSearch } from "@tanstack/react-router";

const useVerifyEmail = () => {
    const { token, userId, lang } = useSearch({ from: APPROUTES.VERIFY_EMAIL, strict: true });
    const { navigate } = useRouter();
    const { isSuccess, isError } = useQuery({
        queryKey: [queryKeys.VERIFY_EMAIL, userId,
            token,
            lang],
        queryFn: async () => {
            return await axiosInstance.post(ApiRoutes.VERIFY_EMAIL, {
                userId,
                token,
                language: lang
            });
        },
        enabled: !!(userId && token)
    });

    useEffect(() => {
        if (isSuccess) {
            navigate({ to: APPROUTES.LOGIN, reloadDocument: true });
        }
    }, [isSuccess])
    return {isErrorVerifyingEmail: isError || !(userId && token)};
}

export default useVerifyEmail;
