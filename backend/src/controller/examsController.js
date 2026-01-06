/** @type {import('mongoose').Model<any>} */

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

    const folder = result[0].folders;
    return res.status(200).json({ folder });
  } catch (error) {
    console.log("error while get folder");
    return res.status(500).json({ message: "Error while getting task" });
  }
};

export const addNewExams = async (req, res) => {
  try {
    const { title, folderId, authorId, slug, duration, questions } = req.body;

    console.log(questions);

    if (!title || !questions || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "Title and question cannot let blank" });
    }

    const newExam = new Test({
      title,
      folderId,
      authorId,
      slug,
      duration,
      questions,
    });

    const saveExam = await newExam.save();

    return res.status(201).json({ message: "Create success", exam: saveExam });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while add new exam: ", error });
  }
};

export const deleteExam = async (req, res) => {
  try {

    const {id} = req.params
    const deleteExam = await Test.findByIdAndDelete(id);
    
    if (!deleteExam) {
      return res
        .status(401)
        .json({ message: "cannot find exam you want to delete" });
    }
    return res.status(200).json({message: "Delete success"})
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Error while deteting task, please try again" }, error);
  }
};
export const updateExams = async (req, res) => {
  return
}
