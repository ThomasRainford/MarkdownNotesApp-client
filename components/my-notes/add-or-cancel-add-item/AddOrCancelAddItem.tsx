import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export interface Props {
  type: "collection" | "list" | "note";
  tooltipLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  iconType: "add" | "cancel";
}

const AddOrCancelAddItem = ({
  type,
  tooltipLabel,
  onClick,
  iconType,
}: Props): JSX.Element => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent="center"
      mt={"1em"}
    >
      <Tooltip
        hasArrow
        placement="top"
        label={tooltipLabel}
        aria-label={`add-${type}-tooltip`}
      >
        <IconButton
          colorScheme="teal"
          variant={"ghost"}
          aria-label={`add-${type}`}
          icon={
            iconType === "add" ? (
              <AddIcon boxSize={5} />
            ) : (
              <CloseIcon boxSize={5} />
            )
          }
          w={"100%"}
          onClick={onClick}
        />
      </Tooltip>
    </Box>
  );
};

export default AddOrCancelAddItem;
