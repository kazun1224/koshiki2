import Link from "next/link";
import { FC } from "react";
import { pagesPath } from "src/utils/$path";

export const Footer: FC = () => {
  return (
    <footer className="bg-blue-800 py-10 px-5 text-white ">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between bg-blue-800 py-10 px-5 text-white md:py-20 md:px-10">
        <h2 className="text-2xl">
          <Link href={pagesPath.$url()}>
            <a>Footer</a>
          </Link>
        </h2>
        <div className="hidden md:block">
          <Link href="/start">
            <a className="mr-4 border bg-slate-700 p-2 text-white">start!!</a>
          </Link>
          <Link href={pagesPath.add.$url()}>
            <a className="mr-4 border bg-slate-700 p-2 text-white">add!!</a>
          </Link>
          <Link href={pagesPath.calculation.$url()}>
            <a className="mr-4 border bg-slate-700 p-2 text-white">
              calculation!!
            </a>
          </Link>
          <Link href={pagesPath.signin.$url()}>
            <a className="mr-4 border bg-slate-700 p-2 text-white">signin!!</a>
          </Link>
          <Link href={pagesPath.signup.$url()}>
            <a className="mr-4 border bg-slate-700 p-2 text-white">singup!!</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};
