import type { CustomNextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "src/Layout";
import { pagesPath } from "src/utils/$path";

const Custom404: CustomNextPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg px-4 md:px-8">
      <div className="w-full text-center md:py-24 lg:py-32">
        <h1 className="mb-10 mr-10 inline-block text-5xl font-bold text-gray-800 sm:text-left md:text-3xl">
          Page not found
        </h1>
        <Link href={pagesPath.$url()}>
          <a className="inline-block rounded-lg  bg-blue-600 px-8 py-3 text-sm font-semibold  text-white  hover:bg-blue-300 ">
            ホームへ戻る
          </a>
        </Link>
      </div>
    </div>
  );
};

// Layoutの適用
Custom404.getLayout = (page) => <Layout>{page}</Layout>;

export default Custom404;
