import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

const BaseTemplate = ({ children }: Props): JSX.Element => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default BaseTemplate;
