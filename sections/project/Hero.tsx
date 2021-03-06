import styled from "styled-components";

import {
  Subheader,
  Subtitle,
  Github,
  Icon,
  TertiaryButton,
  Flair,
} from "components";

import { ArrowDownS } from "icons";
import { card2 } from "styles/common";
import { Project as ProjectType } from "lib/prismic";
import Image from "components/Image";

type HeroProps = {
  project: ProjectType;
  github: any;
};

const Hero = ({ project, github }: HeroProps) => {
  return (
    <Wrapper>
      <HeroImgWrapperMobile>
        <Image src={project.cover.url} alt="desktopCover" />
      </HeroImgWrapperMobile>
      <Info>
        <InfoText>
          <Subheader>{project.name}</Subheader>
          <Description as="h3" color="bodyContrast">
            {project.headline}
          </Description>
        </InfoText>
        <Github repo={github} />
        <Techs>
          {project.buildWith.map(({ type, icon }) => (
            <Flair
              key={type}
              style={{ padding: "0.75em" }}
              icon={icon}
              iconSize="1.25em"
              type={type}
            />
          ))}
        </Techs>
      </Info>
      <HeroImgWrapperDesktop>
        <Image src={project.cover.url} alt="desktopCover" />
      </HeroImgWrapperDesktop>
      <ArrowDown path={ArrowDownS} />
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 70vh;
  }
`;

const Info = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const InfoText = styled.div`
  margin-left: 0.75em;
`;

const Description = styled(Subtitle)`
  margin: 0.5em 0;
  @media (min-width: ${(props) => props.theme.breakpoints.xl}) {
    width: 90%;
  }
`;

const HeroImgWrapperMobile = styled.div`
  display: block;
  width: 100%;
  height: 33vh;
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const HeroImgWrapperDesktop = styled.div`
  display: none;
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: block;
    width: 40%;
    height: 50vh;
  }
`;

const Techs = styled.div`
  margin-top: 1em;
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(auto-fill, 45%);
  @media (min-width: ${(props) => props.theme.breakpoints.xl}) {
    width: 90%;
    grid-template-columns: repeat(auto-fit, 30%);
  }
`;

const ArrowDown = styled(Icon)`
  display: none;
  /* @media (min-width: ${(props) =>
    props.theme.breakpoints.md}) {
    display: block;
    fill: ${(props) =>
    props.theme.colors
      .primary};
    height: 2em;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: 1.5em;
  } */
`;
