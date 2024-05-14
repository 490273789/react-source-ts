import path from "path";
import fs from "fs";
import ts from "rollup-plugin-typescript2";
import cjs from "@rollup/plugin-commonjs";

/** 源文件的路径 */
const pkgPath = path.resolve(__dirname, "../../packages");
/** 打包产物的路径 */
const disPath = path.resolve(__dirname, "../../dist/node_modules");

/**
 * 解析包的路径
 * pkgName 包名
 * isDist 是否为打包后的路径
 */
export function resolvePkgPath(pkgName, isDist) {
  if (isDist) {
    return `${disPath}/${pkgName}`;
  }
  return `${pkgPath}/${pkgName}`;
}

/**
 * 解析package.json文件
 * pkgName 包名
 */
export function getPackageJSON(pkgName) {
  const path = `${resolvePkgPath(pkgName)}/package.json`;
  const str = fs.readFileSync(path, { encoding: "utf-8" });
  return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
  return [cjs(), ts(typescript)];
}
