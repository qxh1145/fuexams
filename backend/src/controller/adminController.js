import Test from "../model/Test.js";

// export const addNewExams = async (req, res) => {
//   try {
//   } catch (error) {}
// };

export const getAllExams = async (req, res) => {
  try {
    const exams = await Test.find();

    if(exams.length > 0) {
        return res.status(200).json(exams);
    }
    return res.status(404).json({message: "No exams found"})
  } catch (error) {
    return res.status(500).json(error)
  }
};
