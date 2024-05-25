import { ATree } from "@/components/molecules/tree/index";
import { Wrapper } from "../wrapper/index";
import Header from "@/components/molecules/header/index";
import { NAV_ITEMS } from "@/consts/nav-item";
import AuthGuard from "@/guards/auth";

type Props = {
  children: string | JSX.Element;
};

export const Admin = ({ children }: Props) => {
  return (
    <AuthGuard>
      <Wrapper>
        <div className="relative flex flex-col h-screen w-screen border-collapse overflow-hidden">
          <Header />
          <div className="flex flex-1 overflow-auto w-full">
            <ATree
              data={NAV_ITEMS}
              className="flex-shrink-0 w-[200px] border"
              initialSelelectedItemId="1"
            />
            <main className="w-full overflow-auto bg-secondary/10">
              {children}
            </main>
          </div>
        </div>
      </Wrapper>
    </AuthGuard>
  );
};
