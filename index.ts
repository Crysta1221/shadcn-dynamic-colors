import { mdctotheme } from "./src/shadcnmdc";

async function main() {
  const theme = await mdctotheme("#A1DCD8", 0.5);
  console.log(theme);
}

main();
