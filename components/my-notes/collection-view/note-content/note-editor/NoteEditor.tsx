export interface Props {
  markdownText: string;
}

const NoteEditor = ({ markdownText }: Props): JSX.Element => {
  return (
    <div>
      <div>{markdownText}</div>
    </div>
  );
};

export default NoteEditor;
