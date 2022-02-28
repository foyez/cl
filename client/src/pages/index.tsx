import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useMember, useMemberActions } from "store";
import { MemberItem } from "components/member-item";
import styles from "styles/Home.module.scss";

const Home: NextPage = () => {
  const { fetchMembers } = useMemberActions();
  const { isLoading, memberList } = useMember();
  const { query, isReady, push } = useRouter();
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    if (isReady) {
      const team = query.team as string;
      fetchMembers(team);
      setSelectedTeam(team);
    }
  }, [isReady, query]); // eslint-disable-line react-hooks/exhaustive-deps

  const chooseTeam = (team: string) => () => {
    push(`/?team=${team}`, undefined, { shallow: true });
  };

  if (isLoading) {
    <h3>Loading...</h3>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.mainInner}>
        <div className={styles.mainHeader}>
          <h1>{selectedTeam ? `Members in ${selectedTeam}` : `Member List`}</h1>
          <Link href={`/create-profile`} passHref>
            <span className="btn">Add a member</span>
          </Link>
        </div>
        <div className={styles.memberContainer}>
          {memberList.length ? (
            memberList.map((member) => (
              <MemberItem
                key={member.id}
                member={member}
                selectTeam={chooseTeam}
              />
            ))
          ) : (
            <div className={styles.noMembers}>No members yet</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
