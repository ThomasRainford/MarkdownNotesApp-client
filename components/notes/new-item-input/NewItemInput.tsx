import { AddIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, Tooltip } from "@chakra-ui/react";
import { useState } from "react";

export interface Props {
  type: "collection" | "list" | "note";
  confirmAdd: (_: string) => void;
}

const NewItemInput = ({ type, confirmAdd }: Props) => {
  const [newTitle, setNewTitle] = useState("");

  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      pl={"0.5em"}
      pt={"0.5em"}
      pb={"0.5em"}
      pr={"0.5em"}
    >
      <Box px={"0em"} pr={"1em"} w={"100%"}>
        <Input
          placeholder="Title..."
          w={"100%"}
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              confirmAdd(newTitle);
            }
          }}
        />
      </Box>
      <Box px={"0em"} w={"50px"}>
        <Tooltip
          hasArrow
          placement="top"
          label={"Add"}
          aria-label={`confirm-add-${type}-tooltip`}
        >
          <IconButton
            colorScheme="blue"
            variant={"outline"}
            aria-label={`create-${type}`}
            icon={<AddIcon boxSize={3} />}
            onClick={() => {
              confirmAdd(newTitle);
            }}
            w="100%"
          />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default NewItemInput;
