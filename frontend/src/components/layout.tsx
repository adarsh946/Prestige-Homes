import { PropsWithChildren } from "react";
import Header from "./header";

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main className="min-h-screen">{children}</main>
      <footer>
        <h1>Addy's Creation</h1>
      </footer>
    </div>
  );
}

export default Layout;
