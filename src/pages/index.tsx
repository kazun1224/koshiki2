import type { CustomNextPage } from "next";
import { Layout } from "src/Layout";
import { createStyles, Text } from "@mantine/core";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { pagesPath } from "src/utils/$path";
import { firebaseAuth } from "src/utils/firebase";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useSWR, { Fetcher } from "swr";
import Link from "next/link";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

type TestData = {
  position: number;
  mass: number;
  symbol: string;
  name: string;
};

const fetcher: Fetcher<TestData[], string> = (...args) =>
  fetch(...args).then((res) => res.json());

const Home: CustomNextPage = () => {
  const { data, error } = useSWR<TestData[], Error>(
    "http://localhost:3004/data",
    fetcher
  );
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);
  //  const [userInfo, setUserInfo] = useState<string | null>(null);

  useEffect(() => {
    (() => {
      const user = firebaseAuth.currentUser;
      console.log(user);
      if (!user) {
        router.push(pagesPath.signin.$url());
      }
    })();

    // () => {
    //   const accessToken = userAccessToken();
    //   if (!accessToken) return router.push("/login");
    //   const userInfo = fetchUser();
    //   console.log(userInfo);
    //   setUserInfo(userInfo);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  function logout() {
    signOut(firebaseAuth)
      .then(() => {
        localStorage.clear();
        router.push(pagesPath.signup.$url());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Text className={classes.symbol}>{item.symbol}</Text>
          <div>
            <Text>{item.name}</Text>
            <Text color="dimmed" size="sm">
              Position: {item.position} • Mass: {item.mass}
            </Text>
            <Link href={pagesPath.calculation.$url()}>
              <a>編集</a>
            </Link>
            <button className="text-red-500">削除</button>
          </div>
        </div>
      )}
    </Draggable>
  ));

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="">
      <h1 className="mb-10">Hello World!!</h1>
      <button className="text-lg" onClick={logout}>
        ログアウトだよ！！！！！！！！！！！！！！
      </button>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
