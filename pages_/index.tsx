import styled from "styled-components";

import { Layout } from "components";
import Start from "sections/portfolio/Start";
import Experience from "sections/portfolio/Experience";
import Skills from "sections/portfolio/Skills";
import Contact from "sections/portfolio/Contact";

import { breakpoints } from "styles";
import {
  getAllExperiences,
  getAllProjects,
  getAllRessources,
} from "lib/prismic";

const Portfolio = ({ projects, experiences, ressources }) => (
  <Layout>
    <Start projects={projects} ressources={ressources} />
    <Expertise>
      <Experience experiences={experiences} />
      <Skills />
    </Expertise>
    <Contact />
  </Layout>
);
export default Portfolio;

export async function getStaticProps({ lang }) {
  const projects = await getAllProjects(lang);
  const experiences = await getAllExperiences(lang);
  const ressources = await getAllRessources(lang);
  return {
    props: {
      projects,
      experiences,
      ressources,
    },
    revalidate: 1,
  };
}

const Expertise = styled.section`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  @media (min-width: ${breakpoints.lg}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
