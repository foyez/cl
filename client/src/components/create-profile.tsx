import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMemberActions } from "store";
import { validateImage } from "utils";
import styles from "styles/Form.module.scss";

export const CreateProfile = () => {
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    team: "",
  });
  const [image, setImage] = useState<{ preview: string; data: File | string }>({
    preview: "",
    data: "",
  });
  const router = useRouter();
  const { addMember } = useMemberActions();

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (validateImage(file)) {
      const img = {
        preview: URL.createObjectURL(file),
        data: file,
      };
      setImage(img);
    }
  };

  const handleChangeMember = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    setMember({ ...member, [inputName]: value });
  };

  const handleSubmitProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image.data);
    formData.append("firstName", member.firstName);
    formData.append("lastName", member.lastName);
    formData.append("team", member.team);

    await addMember(formData);

    router.push("/");
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
        <label htmlFor="image" className="btn">
          {image.preview ? "Update Image" : "Choose Image"}
        </label>
        <input
          name="image"
          type="file"
          id="image"
          onChange={handleChangeImage}
        />
        <br />
        First Name:{" "}
        <input
          name="firstName"
          type="text"
          value={member.firstName}
          onChange={handleChangeMember}
        />
        Last Name:{" "}
        <input
          name="lastName"
          type="text"
          value={member.lastName}
          onChange={handleChangeMember}
        />
        Team:{" "}
        <input
          name="team"
          type="text"
          value={member.team}
          onChange={handleChangeMember}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};
