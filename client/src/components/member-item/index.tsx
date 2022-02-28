import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useMemberActions } from "store";

import type { Member } from "types";
import styles from "./member-item.module.scss";

interface MemberItemProps {
  member: Member;
  selectTeam: (team: string) => () => void;
}

export const MemberItem: NextPage<MemberItemProps> = ({
  member,
  selectTeam,
}) => {
  const { deleteMember } = useMemberActions();
  const handleDeleteMember = (id: number) => () => {
    deleteMember(id);
  };

  return (
    <div key={member.id} className={styles.memberSingle}>
      <div className={styles.memberInfo}>
        <div className={styles.profileImgContainer}>
          <Image
            className={styles.memberImg}
            alt={member.firstName}
            src={member.imageUrl}
            height="80"
            width="80"
          />
        </div>
        <h3 className={styles.memberName}>
          {member.firstName} {member.lastName}
          <button onClick={selectTeam(member.team)} className={styles.team}>
            {member.team}
          </button>
        </h3>
      </div>

      <div className={styles.btnGroup}>
        <Link href={`/edit-profile/${member.id}`}>
          <a className="btn btn-small">Edit</a>
        </Link>
        <button
          onClick={handleDeleteMember(member.id)}
          className="btn btn-small btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
