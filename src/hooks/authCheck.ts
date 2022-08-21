import { useRouter } from "next/router";
import { useCallback } from "react";
import { pagesPath } from "src/utils/$path";
import { firebaseAuth } from "src/utils/firebase";

export const useAuthCheck: () => void =  () => {

    const router = useRouter();
    const user = firebaseAuth.currentUser;
  console.log(user);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
  }
  }
};
