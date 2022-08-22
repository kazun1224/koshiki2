import { CustomNextPage } from "next";
import { Layout } from "src/Layout";
import { Group, TextInput, Box, Text, Code, Button, Center, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableLocation } from '@hello-pangea/dnd';
import { GripVertical } from 'tabler-icons-react';
import { Trash } from 'tabler-icons-react';

interface FormValues {
  name: string | null;
  email: string| null;
}

const Add: CustomNextPage = () => {
  const form = useForm({
    initialValues: {
      employees: [
        { name: 'John Doe', email: 'john@mantine.dev' },
        { name: 'Bill Love', email: 'bill@mantine.dev' },
        { name: 'Nancy Eagle', email: 'nanacy@mantine.dev' },
        { name: 'Lim Notch', email: 'lim@mantine.dev' },
        { name: 'Susan Seven', email: 'susan@mantine.dev' },
      ],
    },
  });

  const fields = form.values.employees.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <GripVertical size={18} />
          </Center>
          <TextInput placeholder="John Doe" {...form.getInputProps(`employees.${index}.name`)} />
          <TextInput
            placeholder="example@mail.com"
            {...form.getInputProps(`employees.${index}.email`)}
          />
          <ActionIcon color="red" onClick={() => form.removeListItem('employees', index)}>
        <Trash size={16} />
      </ActionIcon>
        </Group>
      )}
    </Draggable>
  ));

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <DragDropContext
        onDragEnd={({ destination, source } :{destination: DraggableLocation | null,source:DraggableLocation}) =>
          form.reorderListItem('employees', { from: source.index, to: destination.index })
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Group position="center" mt="md">
        <Button onClick={() => form.insertListItem('employees', { name: '', email: '' })}>
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
