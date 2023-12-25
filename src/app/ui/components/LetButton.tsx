import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface ILetButtonProps extends ButtonProps {
  title: string;
  isOutlined?: boolean;
}

export const LetButton: React.FC<ILetButtonProps> = ({
  title,
  isOutlined,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      bgColor={isOutlined ? "#FFF" : "#835afc"}
      color={!isOutlined ? "#FFF" : "#835afc"}
      _hover={
        !isOutlined
          ? {
              filter: "brightness(0.9)",
            }
          : {
              bgColor: "#835afc",
              color: "#FFF",
            }
      }
      type="submit"
      border={isOutlined ? "1px solid #835afc" : "none"}
    >
      {title}
    </Button>
  );
};
