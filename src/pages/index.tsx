import type { CustomNextPage } from "next";
import Link from "next/link";
import { Layout } from "src/layout/Layout";
import { pagesPath } from "src/utils/$path";

const Home: CustomNextPage = () => {
  return (
    <div className="p-20">
      <h1 className="mb-10">Hello World!!</h1>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
