import { spawn } from "child_process";
import path from "path";
import { siteConfig } from "../site.config";

const port = siteConfig.devPort ?? 3000;
const nextBin = require.resolve("next/dist/bin/next");

const child = spawn(
  "node",
  [nextBin, "dev", "--webpack", "-p", String(port)],
  {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
    env: {
      ...process.env,
      PORT: String(port),
    },
  }
);

child.on("close", (code) => {
  process.exit(code ?? 0);
});
