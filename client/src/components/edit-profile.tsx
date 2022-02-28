import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useMember, useMemberActions } from "store";
import { validateImage } from "utils";
import styles from "styles/Form.module.scss";

export const EditProfile: NextPage = () => {
  const { memberList } = useMember();
  const router = useRouter();
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    team: "",
  });
  const [image, setImage] = useState<{ preview: string; data: File | string }>({
    preview: "",
    data: "",
  });
  const { editMember } = useMemberActions();
  const memberId = router.query.memberId as string;

  useEffect(() => {
    const memberToEdit = memberList.find(
      (member) => member.id === Number(memberId)
    );

    if (memberToEdit) {
      setMember(memberToEdit);
      setImage({ ...image, preview: memberToEdit.imageUrl });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmitProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image.data);
    formData.append("firstName", member.firstName);
    formData.append("lastName", member.lastName);
    formData.append("team", member.team);

    await editMember(Number(memberId), formData);

    router.push("/");
  };

  const handleEditImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0];

    if (!file) return;

    if (validateImage(file)) {
      const img = {
        preview: URL.createObjectURL(file),
        data: file,
      };
      setImage(img);
    }
  };

  const handleEditMember = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    setMember({ ...member, [inputName]: value });
  };

  return (
    <div className={styles.createAndEditProfile}>
      <form onSubmit={handleSubmitProfile}>
        {image.preview && (
          <div className={styles.imgPreview}>
            <Image
              alt="preview image"
              src={image.preview}
              width="100"
              height="100"
            />
          </div>
        )}
        Image:
        <label htmlFor="updateImage" className="btn">
          {image.preview ? "Update Image" : "Choose Image"}
        </label>
        <input
          name="image"
          type="file"
          id="updateImage"
          onChange={handleEditImage}
        />
        <br />
        First Name:{" "}
        <input
          name="firstName"
          type="text"
          value={member.firstName}
          onChange={handleEditMember}
        />
        Last Name:{" "}
        <input
          name="lastName"
          type="text"
          value={member.lastName}
          onChange={handleEditMember}
        />
        Team:{" "}
        <input
          name="team"
          type="text"
          value={member.team}
          onChange={handleEditMember}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};
