import "../styles/button.scss";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }) {
  return (
    <button className={`button ${isOutlined ? "outline" : ""} `} {...props} />
  );
}
