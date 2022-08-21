import { CustomNextPage } from "next";
import { Layout } from "src/Layout";
import { Paper, createStyles, Title, Text, Anchor } from "@mantine/core";
import Link from "next/link";
import { pagesPath } from "src/utils/$path";
import { ComponentProps, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { firebaseAuth } from "src/utils/firebase";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const SingIn: CustomNextPage = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(true);

  const provider = new GoogleAuthProvider();

  const login: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const { refreshToken, providerData } = userCredential.user;
        localStorage.setItem("user", JSON.stringify(providerData));
        localStorage.setItem("accessToken", JSON.stringify(refreshToken));
        router.push(pagesPath.$url());
      })
      .catch((error) => {
        console.log(`${error.code} : ${error.message}`);
        setSuccess(false);
      });
  };
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          おかえりなさい！
        </Title>
        {success ? null : (
          <p className="mb-5 text-red-500">
            メールアドレスかパスワードが正しくありません。
            <br />
            もう一度やり直してください
          </p>
        )}
        <form onSubmit={login}>
          <label htmlFor="email">
            メールアドレス
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="example@example.com"
              className="relative mb-5  block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900  placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              required
            />
          </label>

          <label htmlFor="password">
            パスワード
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              className="relative mb-5 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900  placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              required
            />
          </label>

          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            ログイン
          </button>
        </form>

        <Text align="center" mt="md">
          <Link href={pagesPath.signup.$url()} passHref>
            <Anchor component="a" weight={700}>
              初めての方はこちら
            </Anchor>
          </Link>
        </Text>
      </Paper>
    </div>
  );
};

SingIn.getLayout = (page) => <Layout>{page}</Layout>;

export default SingIn;
