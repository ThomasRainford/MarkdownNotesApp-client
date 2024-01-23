import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
} from "@chakra-ui/react";

export interface Props {}

const CreateChat = (): JSX.Element => {
  return (
    <Box>
      <Popover>
        <Tooltip
          hasArrow
          placement="top"
          label={"Create new chat"}
          aria-label={`Create new chat tooltip`}
        >
          <PopoverTrigger>
            <IconButton
              w={"100%"}
              colorScheme="teal"
              variant={"ghost"}
              aria-label="Create new chat"
              icon={<AddIcon boxSize={5} />}
            />
          </PopoverTrigger>
        </Tooltip>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Create new chat</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Box>
                <Text fontWeight={"bold"}>Choose chat type:</Text>
              </Box>
              <Box
                py="1em"
                display={"flex"}
                flexDir="row"
                justifyContent={"center"}
              >
                <Button colorScheme={"teal"}>Private</Button>
                <Box mx={"1em"}>
                  <Text pt="0.5em">or</Text>
                </Box>
                <Button>Room</Button>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};

export default CreateChat;
