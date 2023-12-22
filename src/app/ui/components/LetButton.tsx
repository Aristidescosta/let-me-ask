import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface ILetButtonProps extends ButtonProps {
  title: string;
}

export const LetButton: React.FC<ILetButtonProps> = ({ title, ...rest }) => {
  return (
    <Button
      {...rest}
      bgColor={"#835afc"}
      color={"#fff"}
      _hover={{
        filter: "brightness(0.9)",
      }}
      type="submit"
    >
      {title}
    </Button>
  );
};
