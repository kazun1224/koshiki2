import { CustomNextPage } from "next";
import { Layout } from "src/Layout";
import { Paper, createStyles, Title, Text, Anchor } from "@mantine/core";
import Link from "next/link";
import { pagesPath } from "src/utils/$path";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ComponentProps } from "react";
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

  const createNewUser: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push(pagesPath.$url());
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} : ${errorMessage}`);
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
        {/* ///////////////////////////form//////////////////////////// */}
        <form onSubmit={createNewUser}>
          <label htmlFor="email">
            <input type="text" name="email" id="email" />
            メールアドレス
          </label>

          <label htmlFor="password">
            <input type="text" name="password" id="password" />
            パスワード
          </label>
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" />*/}

          <button>アカウント作成</button>
        </form>
        {/* ///////////////////////////form//////////////////////////// */}
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
