import { CustomNextPage } from "next";
import { Layout } from "src/Layout";
import { Paper, createStyles, Title, Text, Anchor } from "@mantine/core";
import Link from "next/link";
import { pagesPath } from "src/utils/$path";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ComponentProps, useState } from "react";
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

const SingUp: CustomNextPage = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(true);

  const createNewUser: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const { refreshToken, providerData }  = userCredential.user;
        localStorage.setItem("user", JSON.stringify(providerData));
        localStorage.setItem("accessToken", JSON.stringify(refreshToken));
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
          アカウントの作成
        </Title>
        {success ? null : <p className="text-red-500 mb-5">登録ができませんでした。お手数ですが、< br/>もう一度やり直してください</p>}
        <form onSubmit={createNewUser}>
          <label htmlFor="email">
            メールアドレス
            <input type="email" name="email" id="email" autoComplete="email" placeholder="example@example.com" className="appearance-none rounded-md  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-5" required/>
          </label>

          <label htmlFor="password">
            パスワード
            <input type="password" name="password" id="password" autoComplete="current-password" placeholder="Password" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-5" required/>
          </label>

          <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>

          <button  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">アカウント作成</button>
        </form>
        <Text align="center" mt="md">
          <Link href={pagesPath.signin.$url()} passHref>
            <Anchor component="a" weight={700}>
              アカウントをお持ちの方はこちら
            </Anchor>
          </Link>
        </Text>
      </Paper>
    </div>
  );
};

SingUp.getLayout = (page) => <Layout>{page}</Layout>;

export default SingUp;
