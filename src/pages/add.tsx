import { CustomNextPage } from "next";
import { Layout } from "src/Layout";
import {
  Group,
  TextInput,
  Box,
  Text,
  Code,
  Button,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Switch } from "tabler-icons-react";
import { Trash } from "tabler-icons-react";
import { randomId } from "@mantine/hooks";



const Add: CustomNextPage = () => {
  const form = useForm({
    initialValues: {
      employees: [{ name: "", active: false, key: randomId() }],
    },
  });

  const fields = form.values.employees.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="John Doe"
        withAsterisk
        sx={{ flex: 1 }}
        {...form.getInputProps(`employees.${index}.name`)}
      />
      <Switch
        label="Active"
        {...form.getInputProps(`employees.${index}.active`, {
          type: "checkbox",
        })}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("employees", index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            Name
          </Text>
          <Text weight={500} size="sm" pr={90}>
            Status
          </Text>
        </Group>
      ) : (
        <Text color="dimmed" align="center">
          No one here...
        </Text>
      )}

      {fields}

      <Group position="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem("employees", {
              name: "",
              active: false,
              key: randomId(),
            })
          }
        >
          Add employee
        </Button>
      </Group>

      <Text size="sm" weight={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>
    </Box>
  );
};

Add.getLayout = (page) => <Layout>{page}</Layout>;
export default Add;
