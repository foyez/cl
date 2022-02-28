// Libraries
import { NextPage } from "next";

// Files
import styles from "./layout.module.scss";
import { Footer } from "../footer";
import { Header } from "../header";
import { Meta } from "components/Meta";

export const Layout: NextPage = ({ children }) => {
  return (
    <div className={styles.container}>
      <Meta />
      <Header />
      {children}
      <Footer />
    </div>
  );
};
