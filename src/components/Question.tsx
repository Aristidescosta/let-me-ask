import { ReactNode } from "react";
import "../styles/question.scss";
import cx from "classnames";

type QuestionProps = {
  content: string;
  author: {
    avatar: string;
    name: string;
  };
  children?: ReactNode;
  isHighLigted?: boolean;
  isAnswered?: boolean;
};

export function Question({
  content,
  author,
  children,
  isHighLigted = false,
  isAnswered = false,
}: QuestionProps) {
  return (
    <div
      className={cx(
        "questions",
        { answered: isAnswered },
        { highlight: isHighLigted && !isAnswered}
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
