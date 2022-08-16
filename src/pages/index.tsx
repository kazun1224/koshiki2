import type { CustomNextPage } from "next";
import { Layout } from "src/Layout";
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";

const Home: CustomNextPage = () => {
  const PRIMARY_COL_HEIGHT = 300;
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  return (
    <div className="">
      <h1 className="mb-10">Hello World!!</h1>
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
