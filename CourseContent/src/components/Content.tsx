import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  //   return <Part coursePart={courseParts[0]} />;
  return courseParts.map((coursePart) => {
    return <Part key={coursePart.name} coursePart={coursePart} />;
  });
};

export default Content;
