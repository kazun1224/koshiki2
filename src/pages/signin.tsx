import { CustomNextPage } from "next";
import { Layout } from "src/layout/Layout";

const SingIn: CustomNextPage = () => {
  return (
    <div>
      <h1>Sing in!</h1>
    </div>
  );
};

SingIn.getLayout = (page) => <Layout>{page}</Layout>;

export default SingIn;
