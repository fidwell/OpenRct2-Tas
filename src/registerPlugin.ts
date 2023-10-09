import * as Environment from "./environment";
import main from "./main";

registerPlugin({
  name: Environment.pluginName,
  version: Environment.pluginVersion,
  authors: Environment.pluginAuthors,
  type: "intransient",
  licence: "MIT",
  targetApiVersion: 79,
  main
});
