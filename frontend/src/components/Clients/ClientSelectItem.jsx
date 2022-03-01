import { Box, ColorSwatch, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

const ClientSelectItem = forwardRef(
    ({ color, name, address, _id, defaultHourRate, createdAt, updatedAt,  ...others }, ref) => (
        <Box ref={ref} value={_id} {...others}>
            <Group noWrap>
                <ColorSwatch color={color} />
                <div>
                    <Text>{name}</Text>
                    <Text size="xs" color="dimmed">
                        {address && Object.values(address).join(', ')}
                    </Text>
                </div>
            </Group>
        </Box>
    )
);

export default ClientSelectItem;