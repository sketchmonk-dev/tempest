import { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("package", {
    description:
      "Generate a new nestjs library workspace.",
    prompts: [
      {
        "type": "input",
        "name": "name",
        "message": "What is the name of the library?",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/packages/{{ dashCase name }}",
        templateFiles: "templates/library/**/*.hbs",
        base: "templates/library"
      },
    ],
  });
}
