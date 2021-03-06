import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { Button, Span, Subtitle, Text } from "components";

import { ArrowRightUp, Github, LinkOut } from "icons";
import { breakpoints } from "styles";
import { Projects } from "lib/prismic";

const ProjectList = ({ projects }: Projects) => {
  const { t } = useTranslation();
  return (
    <List>
      <Table>
        <thead>
          <tr>
            <Subtitle as="th" color="primary">
              Name
            </Subtitle>
            <Subtitle as="th" className="hide-on-mobile" color="primary">
              {t("common:buildUsing")}
            </Subtitle>

            <Subtitle as="th" className="hide-on-mobile" color="primary">
              {t("common:progress")}
            </Subtitle>

            <Subtitle as="th" color="primary">
              {t("common:year")}
            </Subtitle>

            <Subtitle as="th" color="primary">
              Links
            </Subtitle>
          </tr>
        </thead>
        <tbody>
          {projects.map(
            ({ name, year, progress, buildWith, url, giturl, slug }) => {
              return (
                <tr key={name}>
                  <Title>
                    <Subtitle as="h3">{name}</Subtitle>
                  </Title>
                  <Techs>
                    {buildWith.map((field, i) => (
                      <Span key={field.type}>
                        {field.type}
                        {i !== buildWith.length - 1 && <Span> - </Span>}
                      </Span>
                    ))}
                  </Techs>

                  <Progress className="hide-on-mobile">
                    <Text>{progress}</Text>
                  </Progress>
                  <Year>{year}</Year>
                  <Links>
                    <Button
                      hover
                      to={`/projects/${slug}`}
                      color="bodyContrast"
                      iconSize="1.25em"
                      leftIcon={ArrowRightUp}
                    />
                    <Button
                      hover
                      out
                      to={giturl}
                      color="bodyContrast"
                      iconSize="1.25em"
                      leftIcon={Github}
                    />
                    {url ? (
                      <Button
                        hover
                        out
                        to={url}
                        color="bodyContrast"
                        leftIcon={LinkOut}
                        iconSize="1.25em"
                      />
                    ) : null}
                  </Links>
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
    </List>
  );
};

export default ProjectList;

const List = styled.div`
  th {
    text-align: left;
    padding: 0;
  }
  td {
    padding: 0.25em 0em;
    cursor: default;
  }
  .hide-on-mobile {
    display: none;
    @media (min-width: ${breakpoints.md}) {
      display: table-cell;
    }
  }
  @media (min-width: ${breakpoints.xl}) {
    width: 70%;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Title = styled.td`
  width: 40%;
  @media (min-width: ${breakpoints.md}) {
    width: 20%;
  }
`;
const Year = styled.td`
  width: 30%;
  @media (min-width: ${breakpoints.md}) {
    width: 10%;
  }
`;

const Progress = styled.td`
  width: 20%;
`;

const Techs = styled.td`
  display: none;
  @media (min-width: ${breakpoints.md}) {
    display: table-cell;
    width: 35%;
  }
`;
const Links = styled.td`
  display: flex;
`;
