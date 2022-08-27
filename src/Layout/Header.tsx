import { FC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextLink } from "@mantine/next";
import {
  Avatar,
  Box,
  Divider,
  Group,
  Indicator,
  Menu,
  Autocomplete,
  ActionIcon,
  Text,
  Button,
} from "@mantine/core";
import { pagesPath } from "src/utils/$path";
import { firebaseAuth } from "src/utils/firebase";
import { deleteUser, signOut } from "firebase/auth";
import { Logout, Bell, Search, Settings, PencilPlus } from "tabler-icons-react";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

export const Header: FC<{ left: ReactNode }> = ({ left }) => {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        backgroundColor: theme.white,
      })}
    >
      <Group spacing="lg" noWrap>
        {left}
        <SearchForm />
        <Notification />
        <UserMenu />
      </Group>
    </Box>
  );
};

const SearchForm: FC = () => {
  return (
    <Autocomplete
      data={[]}
      size="lg"
      placeholder="Search"
      icon={<Search size={18} />}
      styles={{
        root: { flexGrow: 1 },
        input: { border: 0, backgroundColor: "transparent" },
      }}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};

const Notification: FC = () => {
  return (
    <Indicator inline size={14} offset={4} color="red" withBorder>
      <Link href={pagesPath.add.$url()} passHref>
        <ActionIcon component="a" variant="hover" radius="xl" size={40}>
          <PencilPlus />
        </ActionIcon>
      </Link>
    </Indicator>
  );
};

const UserMenu: FC = () => {
  const router = useRouter();
  const logout = () => {
    signOut(firebaseAuth)
      .then(() => {
        localStorage.clear();
        router.push(pagesPath.signup.$url());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Menu
      size="lg"
      position="bottom"
      placement="end"
      transition="pop-top-right"
      control={
        <ActionIcon variant="hover" radius="xl" size={40}>
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
        </ActionIcon>
      }
      styles={(theme) => ({
        label: { fontSize: theme.fontSizes.sm },
        itemLabel: { fontSize: theme.fontSizes.md },
      })}
    >
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<Settings size={16} />} component={NextLink} href="#">
        メニュー1
      </Menu.Item>
      <Menu.Item icon={<Settings size={16} />} component={NextLink} href="#">
        メニュー2
      </Menu.Item>
      <Menu.Item icon={<Settings size={16} />} component={NextLink} href="#">
        <DeleteModal />
      </Menu.Item>
      <Divider />
      <Menu.Item icon={<Logout size={16} />} onClick={logout}>
        ログアウト
      </Menu.Item>
    </Menu>
  );
};

const DeleteModal: FC = () => {
  const router = useRouter();
  const user = firebaseAuth.currentUser;
  const openDeleteModal = () =>
    openConfirmModal({
      title: "アカウントを削除しますか？",
      centered: true,
      children: (
        <Text size="sm">
          アカウントが削除されて今までのデータがすべて削除されてしまいます。
          削除されたデータは戻すことが不可能です。
          本当に削除しますか？
        </Text>
      ),
      labels: { confirm: "削除", cancel: "キャンセル" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
  onConfirm: () => {
    console.log("Confirmed")
    deleteUser(user!).then(() => {
      localStorage.clear();
      showNotification({
        title: 'アカウントを削除しました',
        message: '使ってくれてありがとう！',
        autoClose: 5000,
      })
      router.push(pagesPath.signup.$url());

    }).catch((error) => {
      console.log(error.message)
      showNotification({
        title: 'アカウントを削除できていません',
        message: 'エラーが発生しました',
        color: 'red',
        autoClose: 5000,
      })
    });
  },
    });

  return user?(


    <Button onClick={openDeleteModal} >
      <span className="text-red-500">アカウントを削除</span>
    </Button>

  ):null;
};

