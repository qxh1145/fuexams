import Folder from "../model/Folder.js";
import Test from "../model/Test.js";

export const getAllTest = async (req, res) => {
  try {
    const result = await Test.aggregate([
      {
        $facet: {
          tests: [],
        },
      },
    ]);
    const exams = result[0].tests;
    return res.status(200).json({ exams });
  } catch (error) {
    console.log("Error while getAllTest");
    return res.status(500).json({ message: "error while get test" });
  }
};

export const getAllFolder = async (req, res) => {
  const { filter = "all" } = req.query;
  let typeOfFolder = {};

  if (filter !== "all") {
    typeOfFolder = { type: filter };
  }

  try {
    const result = await Folder.aggregate([
      {
        $match: typeOfFolder,
      },
      {
        $facet: {
          folders: [],
        },
      },
    ]);

    const folder = result[0].folders
    return res.status(200).json({folder})

  } catch (error) {
    console.log("error while get folder");
    return res.status(500).json({ message: "Error while getting task" });
  }
};
