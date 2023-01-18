import { Box, useColorMode } from "@chakra-ui/react";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";

export interface Props {
  markdownText: string;
}

const NoteEditor = ({ markdownText }: Props): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Box height={"100%"} data-color-mode={colorMode}>
      <Box height={"100%"}>{markdownText}</Box>
    </Box>
  );
};

export default NoteEditor;
