import { Box, useColorMode } from "@chakra-ui/react";

export interface Props {
  markdownText: string;
}

const NoteEditor = ({ markdownText }: Props): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Box className="note-editor-container" height={"100%"}>
      {markdownText}
    </Box>
  );
};

export default NoteEditor;
