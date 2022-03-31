import { Box, ColorSwatch, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

const ProjectSelectItem = forwardRef(
    ({ name, hourRate, updateAt, createdAt, client, _id, ...others }, ref) => (
        <Box ref={ref} value={_id} {...others}>
            <Group noWrap>
                <div>
                    <Text>{name}</Text>
                    <Text size="xs" color="dimmed">
                        {client?.name}
                    </Text>
                </div>
            </Group>
        </Box>
    )
);

export default ProjectSelectItem;