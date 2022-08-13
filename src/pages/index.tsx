import type { NextPage } from "next";
import Link from "next/link";
import { pagesPath } from "src/lib/$path";

const Home: NextPage = () => {
  return (
    <div className="p-20">
      <h1 className="mb-10">Hello World!!</h1>
      <Link href="/start">
        <a className="border bg-slate-700 p-2 text-white">start!!</a>
      </Link>
      <Link href={pagesPath.add.$url()}>
        <a className="border bg-slate-700 p-2 text-white">add!!</a>
      </Link>
      <Link href={pagesPath.calculation.$url()}>
        <a className="border bg-slate-700 p-2 text-white">calculation!!</a>
      </Link>
      <Link href={pagesPath.signin.$url()}>
        <a className="border bg-slate-700 p-2 text-white">signin!!</a>
      </Link>
      <Link href={pagesPath.singup.$url()}>
        <a className="border bg-slate-700 p-2 text-white">singup!!</a>
      </Link>
    </div>
  );
};

export default Home;
