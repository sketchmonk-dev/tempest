import { INestiaConfig } from "@nestia/sdk";

const config: INestiaConfig = {
    input: "src/**/*.controller.ts",
    output: "../../generated/api/src",
    distribute: "../../generated/api/",
    e2e: "test",
    clone: true,
};
export default config;