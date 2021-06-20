import { toast } from "react-toastify";
import { Comment } from "../features/feed/Post";

export function showToast(text: JSX.Element | string) {
  toast.dark(text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    style: { background: "#181818", minHeight: "2rem" },
  });
}

export const isLoggedInLocally = () => {
  if (localStorage.getItem("devShareAuth")) {
    return JSON.parse(localStorage.getItem("devShareAuth") as string)[
      "isLoggedIn"
    ];
  }
};

export const getAuthToken = () =>
  localStorage.getItem("devShareAuth") &&
  JSON.parse(localStorage.getItem("devShareAuth") as string)["token"];

export const mapCommentReplies = (comments: Array<Comment>) => {
  console.log(comments);
  let parentComments: Array<Comment> = [];
  let replies: Array<Comment> = [];

  comments.reduce(
    (acc, comment) => {
      if (comment.repliedTo) {
        acc.replies.push(comment);
      } else {
        acc.parentComments.push(comment);
      }
      return acc;
    },
    { parentComments, replies }
  );

  return parentComments.map((pComment) => {
    const replyComments = replies.filter(
      (rComment) => rComment.repliedTo === pComment.id
    );
    pComment.replies = replyComments;
    return pComment;
  });
};
