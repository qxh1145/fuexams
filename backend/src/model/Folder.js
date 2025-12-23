import mongoose, { Schema } from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    folderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId || null,
      default: null,
    },
    type: {
        type: String,
        enum: ['Folder', 'Major', 'Sem', 'Subject', 'Term'],
        default: 'Folder'
    },
    path: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

  const Folder = mongoose.model('folders', folderSchema)
export default Folder;
