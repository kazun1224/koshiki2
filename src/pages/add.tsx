import { CustomNextPage } from "next";
import { Layout } from "src/layout/Layout";

const Add: CustomNextPage = () => {
  return (
    <div>
      <h1>Add!!!!</h1>
    </div>
  );
};

Add.getLayout = (page) => <Layout>{page}</Layout>;
export default Add;
