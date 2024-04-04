module.exports = {
  process(sourceText, sourcePath, options) {
    console.log(JSON.stringify(sourcePath));
    return {
      code: `module.exports = ${JSON.stringify(sourcePath)}`
    };
  }
};
