import type { CustomNextPage } from "next";
import { Layout } from "src/Layout";
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { pagesPath } from "src/utils/$path";
import { firebaseAuth } from "src/utils/firebase";

const Home: CustomNextPage = () => {
  const router = useRouter();
  // const [userInfo, setUserInfo] = useState<User | null>(null);

  const user = firebaseAuth.currentUser;
  if (user) {
    console.log(user);
  }

  // useEffect(() => {
  //   const accessToken = userAccessToken();
  //   if (!accessToken) return router.push("/login");
  //   const userInfo = fetchUser();
  //   console.log(userInfo);
  //   setUserInfo(userInfo);
  // }, []);

  const logout = () => {
    signOut(firebaseAuth)
      .then((data) => {
        // console.log(data);
        localStorage.clear();
        router.push(pagesPath.signup.$url());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PRIMARY_COL_HEIGHT = 300;
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  return (
    <div className="">
      <h1 className="mb-10">Hello World!!</h1>
      <button className="text-lg" onClick={logout}>
        ログアウトだよ！！！！！！！！！！！！！！
      </button>
      <Container my="md">
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
          <Grid gutter="md">
            <Grid.Col>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
