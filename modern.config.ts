import {
  PartialBuildConfig,
  defineConfig,
  moduleTools,
} from "@modern-js/module-tools";

const commonBuildConfig: PartialBuildConfig = {
  buildType: "bundleless",
  input: ["src", "!src/**/*.stories.tsx"],
  outDir: "./dist",
  dts: false,
};

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      ...commonBuildConfig,
      format: "cjs",
      target: "es6",
      autoExtension: true,
    },
    {
      ...commonBuildConfig,
      format: "esm",
      target: "es6",
      autoExtension: true,
    },
    {
      ...commonBuildConfig,
      dts: {
        only: true,
      },
    },
  ],
});
