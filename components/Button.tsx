import styled from "styled-components";
import Link from "next-translate/Link";

import Icon from "./Icon";
import { Text } from "./Typography";

import { colors } from "styles";

type ButtonProps = {
  leftIcon?: string;
  rightIcon?: string;
  children?: React.ReactNode;
  to?: string;
  out?: boolean;
  hover?: boolean;
  iconSize?: string;
  color?: string;
  bg?: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  children,
  to,
  out,
  hover,
  iconSize = "1em",
  color,
  bg = "primary",
  className,
  ...rest
}) => {
  return (
    <Link
      noLang={out ? true : false}
      href={to}
      target={out ? "_blank" : ""}
      passHref
      {...rest}
    >
      <Content className={className} hover={hover}>
        {leftIcon ? (
          <Icon path={leftIcon} color={color} size={iconSize} />
        ) : null}
        {children ? (
          <Text style={{ margin: " 0 0.25em" }}>{children}</Text>
        ) : null}
        {rightIcon ? (
          <Icon path={rightIcon} color={color} size={iconSize} />
        ) : null}
      </Content>
    </Link>
  );
};

const Content = styled.a<ButtonProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.5em;
  border-radius: 0.25em;
  :hover {
    background: ${(p) => (p.hover ? colors.bodyTint : "initial")};
  }
`;

export const PrimaryButton = styled(Button)`
  background: ${colors.primary};
  border: inherit;
  ${Text} {
    color: ${colors.primaryContrast};
  }
  svg {
    fill: ${colors.primaryContrast};
  }
`;

export const SecondaryButton = styled(Button)`
  background: ${colors.body};
  border: 1px solid ${colors.primary};
  ${Text} {
    color: ${colors.primary};
  }
`;

export default Button;