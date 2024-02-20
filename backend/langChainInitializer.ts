import * as fs from "fs";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnableSequence } from "langchain/schema/runnable";
import { BaseLanguageModelInput } from "langchain/dist/base_language";
import { VectorStoreRetriever } from "langchain/dist/vectorstores/base";
import { loadFromGithub } from "./codeLoader";
import { REPO_GITHUB_URL, projectName } from "./config";

class LangChainInitializer {
  private model: RunnableSequence<BaseLanguageModelInput, string>;
  private retriever: VectorStoreRetriever<FaissStore> | null = null;

  private initialized: boolean = false;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
    }).pipe(new StringOutputParser());
  }

  async init() {
    if (this.initialized) {
      return;
    }
    const texts = await loadFromGithub(REPO_GITHUB_URL, {
      ignoreFiles: [new RegExp(`^((?!${projectName}).)*$`)],
    });
    console.log("Loaded ", texts.length, " documents.");
    const directory = "./vectorStore/";
    const faissFile = directory + "faiss.index";
    let vectorStore;
    try {
      fs.accessSync(faissFile, fs.constants.F_OK);
      vectorStore = await FaissStore.load(directory, new OpenAIEmbeddings());
      console.log("loaded from file");
    } catch {
      vectorStore = await FaissStore.fromDocuments(
        texts,
        new OpenAIEmbeddings()
      );
      await vectorStore.save(directory);
    }
    this.retriever = vectorStore.asRetriever();
  }

  getModel() {
    return this.model;
  }

  getRetriever() {
    return this.retriever;
  }
}

const langChainInitializer = new LangChainInitializer();
export default langChainInitializer;
