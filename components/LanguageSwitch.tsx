import React, { useState, useEffect, useRef, ReactText } from "react";
import styled from "styled-components";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";

import { Text } from "./Typography";

import { breakpoints, card3, colors } from "styles";
import ArrowDown from "../icons/arrowdown.svg";
import Icon from "./Icon";
import { ArrowDownS, ArrowUpS, Language, Language2 } from "icons";

interface DropDownProps {
  open: boolean;
  key?: string;
}
const LanguageSwitch: React.FC<any> = () => {
  const { lang } = useTranslation();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const dropdownRef = useRef<HTMLInputElement>();
  const displayRef = useRef<HTMLInputElement>();

  const allLanguages: string[] = ["Deutsch", "Englisch"];

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDropdown]);

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current.contains(e.target) ||
      displayRef.current.contains(e.target)
    ) {
      return;
    }
    setToggleDropdown(false);
  };

  const onChangeLang = () => {
    const { pushI18n, asPath } = Router;

    const path = asPath.substring(3) || "/";

    pushI18n({
      url: path,
      options: {
        lang: lang === "en" ? "de" : "en",
        shallow: true,
      },
    });
    setToggleDropdown(false);
  };

  return (
    <Wrapper>
      <Display
        ref={displayRef}
        onClick={() => setToggleDropdown(!toggleDropdown)}
      >
        <Icon
          path={Language}
          viewBox="0 0 640 512"
          color="bodyContrast"
          size="1.4em"
        />
        <DisplayLanguage>
          {lang === "en" ? "English" : "Deutsch"}
        </DisplayLanguage>
        {toggleDropdown ? (
          <Icon path={ArrowUpS} color="bodyContrast" size="1.25em" />
        ) : (
          <Icon path={ArrowDownS} color="bodyContrast" size="1.25em" />
        )}
      </Display>
      <Dropdown ref={dropdownRef} open={toggleDropdown}>
        {allLanguages.map((language) => (
          <DropdownItem key={language} onClick={() => onChangeLang()}>
            <Icon path={Language2} color="bodyContrast" size="1.25em" />
            <Text style={{ paddingLeft: "0.5em" }}>{language}</Text>
          </DropdownItem>
        ))}
      </Dropdown>
    </Wrapper>
  );
};

export default LanguageSwitch;

const Wrapper = styled.div`
  position: relative;
`;

const Display = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5em;
`;

const DisplayLanguage = styled(Text)`
  display: none;
  padding: 0.5em;
  @media (min-width: ${breakpoints.lg}) {
    display: block;
  }
`;

const Dropdown = styled.div<DropDownProps>`
  ${card3};
  display: ${(p) => (p.open ? "flex" : "none")};
  flex-direction: column;
  width: 7em;
  position: absolute;
  border-radius: 0.25em;
  top: 2.5em;
  transform: translateX(-60%);
  @media (min-width: ${breakpoints.lg}) {
    transform: translateX(-10%);
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;
  height: 3em;

  border-radius: 0.25em;
  cursor: pointer;
  :hover {
    transition: background 500ms;
    background-color: ${colors.primary};
  }
`;
