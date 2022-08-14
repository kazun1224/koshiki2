import { CustomNextPage } from "next";
import { Layout } from "src/layout/Layout";

const Calculation:CustomNextPage = () => {
  return (
    <div>
      <h1>calculation!</h1>
    </div>
  );
};

Calculation.getLayout = (page) => <Layout>{page}</Layout>

export default Calculation;
