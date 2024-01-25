import { CoursePart } from "../types";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          Course name: {coursePart.name}
          Exercise count: {coursePart.exerciseCount}
        </p>
      );

    case "description":
      return (
        <p>
          Course name: {coursePart.name}
          <br />
          Exercise count: {coursePart.exerciseCount}
          <br />
          Description: {coursePart.description}
        </p>
      );

    case "group":
      return (
        <p>
          Course name: {coursePart.name}
          <br />
          Exercise count: {coursePart.exerciseCount}
          <br />
          Group project count: {coursePart.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          Course name: {coursePart.name}
          <br />
          Exercise count: {coursePart.exerciseCount}
          <br />
          Background material: {coursePart.backgroundMaterial}
        </p>
      );

    case "special":
      return (
        <p>
          Course name: {coursePart.name}
          <br />
          Exercise count: {coursePart.exerciseCount}
          <br />
          Requirements: {coursePart.requirements.join(", ")}
        </p>
      );
  }
};

export default Part;
