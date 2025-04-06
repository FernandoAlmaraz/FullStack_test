// models/folder.js
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    path: { type: String, required: true }
});

const folderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    files: [fileSchema]
}, { timestamps: true });

const Folder = mongoose.model('Folder', folderSchema);

export default Folder;
