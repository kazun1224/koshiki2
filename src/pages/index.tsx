import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="p-20">
      <h1 className="mb-10">Hello World!!</h1>
      <Link href="/start">
        <a className="border bg-slate-700 p-2 text-white">start!!</a>
      </Link>
    </div>
  );
};

export default Home;
