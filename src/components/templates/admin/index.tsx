import Sidebar from "@/components/molecules/sidebar/index";
import { Wrapper } from "../wrapper/index";
import Header from "@/components/molecules/header/index";

type Props = {
  children: string | JSX.Element;
};

export const Admin = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1">
          {children}
        </main>
      </div>
    </Wrapper>
  );
};
