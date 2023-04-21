const { globSync } = require("glob");
const path = require("node:path");
const fs = require("node:fs");

const base = path.resolve(__dirname, "./src/jsx");
const files = globSync("./**/*.{js,jsx}", {
  ignore: "node_modules/**",
  cwd: base,
});

const handleFile = (file) => {
  const fileResolved = path.parse(file);
  // const firstLetter = fileResolved.name.at(0);
  fileResolved.root = `${path.resolve(base, fileResolved.dir)}/`;
  fileResolved.dir = "";
  const fileWithBase = path.format(fileResolved);
  const content = fs.readFileSync(fileWithBase, "utf-8");
  if (
    (content.includes("<") || content.includes(">")) &&
    (content.includes('from "react";') ||
      content.includes("from 'react';") ||
      content.includes("from 'react'") ||
      content.includes('from "react"'))
  ) {
    fileResolved.base = "";
    fileResolved.ext = ".jsx";
    const fileChangedExtension = path.format(fileResolved);
    fs.renameSync(fileWithBase, fileChangedExtension);
  } else {
    fileResolved.base = "";
    fileResolved.ext = ".js";
    const fileChangedExtension = path.format(fileResolved);
    fs.renameSync(fileWithBase, fileChangedExtension);
  }
};

files.forEach(handleFile);
