import { CustomNextPage } from "next";
import { Layout } from "src/layout/Layout";

const SingUp: CustomNextPage = () => {
  return (
    <div>
      <h1>Sing up!</h1>
    </div>
  );
};

SingUp.getLayout = (page) => <Layout>{page}</Layout>;

export default SingUp;
