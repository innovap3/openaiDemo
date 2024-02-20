import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { isArray, mergeWith } from "lodash";

type Options = ConstructorParameters<typeof GithubRepoLoader>[1];

export const loadFromGithub = async (url: string, options: Options) => {
  const loader = new GithubRepoLoader(
    url,
    mergeWith<Options, Options>(
      {
        branch: "main",
        recursive: true,
        unknown: "warn",
        ignoreFiles: [
          /.*package-lock\.json/,
          /\.prettierrc/,
          /\.gitignore/,
          /\.eslintrc.js/,
          /tsconfig.json/,
        ],
      },
      options,
      (objValue, srcValue) => {
        if (isArray(objValue)) return objValue.concat(srcValue);
      }
    )
  );
  const docs = await loader.load();
  const javascriptSplitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 2000,
    chunkOverlap: 200,
  });
  const texts = await javascriptSplitter.splitDocuments(docs);
  console.log(docs.map((doc) => doc.metadata.source));
  return texts;
};

export const loadFromLocal = async (repoPath: string) => {
  const loader = new DirectoryLoader(repoPath, {
    ".js": (path) => new TextLoader(path),
    ".jsx": (path) => new TextLoader(path),
    ".ts": (path) => new TextLoader(path),
    ".tsx": (path) => new TextLoader(path),
    ".json": (path) => new TextLoader(path),
    ".snap": (path) => new TextLoader(path),
    ".scss": (path) => new TextLoader(path),
    ".html": (path) => new TextLoader(path),
    ".css": (path) => new TextLoader(path),
    ".md": (path) => new TextLoader(path),
  });
  const docs = await loader.load();
  const javascriptSplitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 2000,
    chunkOverlap: 200,
  });
  const texts = await javascriptSplitter.splitDocuments(docs);
  return texts;
};
