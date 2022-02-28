import Link from "next/link";
import styles from "./header.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link href={`/`} passHref>
        <h3>Club Management</h3>
      </Link>
    </div>
  );
};
