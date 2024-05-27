type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const Container = ({ children }: Props) => {
  return <div className="px-4">{children}</div>;
};
