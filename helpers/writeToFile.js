const fs = require("fs");
module.exports.writeFile = (sentenceArray) => {
  const file = fs.createWriteStream(
    `./generated_questions/combination_questions.txt`
  );
  file.on("error", (err) => {
    console.error("Error while writing to file:", err);
  });
  file.on("finish", () => {
    console.info("All writes are now complete.");
    console.info(
      `Total number of questions generated is ${sentenceArray.length}`
    );
    console.log(
      "Total number of unique answers",
    );
  });
  sentenceArray.forEach((v) => {
    file.write(v + "\n");
  });

  file.end();
};
