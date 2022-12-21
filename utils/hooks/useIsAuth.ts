import { useRouter } from "next/router";
import { useEffect } from "react";
import { AnyVariables, UseQueryState } from "urql";
import { MeQuery } from "../../generated/graphql";

export const useIsAuth = (user: UseQueryState<MeQuery, AnyVariables>) => {
  const router = useRouter();

  useEffect(() => {
    //console.log('isAuth: ', user)
    // Check if user is logged.
    if (!user.fetching && !user.data?.me) {
      router.replace("/account/login");
    }
  }, [user, router]);
};
