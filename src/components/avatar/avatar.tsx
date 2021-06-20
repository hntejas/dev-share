import styles from "./avatar.module.css";

type AvatarProp = {
  avatarImg?: string;
  avatarName?: string;
  avatarSize?: "SMALL" | "MEDIUM" | "LARGE";
};

const sizeChart = {
  SMALL: styles.small,
  MEDIUM: styles.medium,
  LARGE: styles.large,
};
export default function Avatar({
  avatarImg,
  avatarName,
  avatarSize,
}: AvatarProp) {
  return (
    <img
      src={
        avatarImg ||
        "https://www.allhealthnetwork.org/wp-content/uploads/2020/09/profile-blank-1.png"
      }
      alt={avatarName}
      className={[styles.avatarImg, avatarSize && sizeChart[avatarSize]].join(
        " "
      )}
    />
  );
}
