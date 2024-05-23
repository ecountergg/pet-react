import { Wrapper } from "../wrapper/index";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const Blank = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};
