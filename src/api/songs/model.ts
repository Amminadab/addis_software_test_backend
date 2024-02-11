import { Schema, model } from "mongoose";

// Song Schema
const songSchema = new Schema<SongRequest.ISongDoc>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Song title is required"],
      minlength: [1, "Song title Must Be At Least 1 Characters"],
      trim: true,
    },
    index: {
      type: String,
      unique: true,
      required: [true, "index is required"],
    },
    artist: {
      type: String,
      required: [true, "Artist Name is required"],
      minlength: [1, "Artist Name Must Be At Least 1 Characters"],
      trim: true,
    },
    album: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "genre name is required"],
      minlength: [1, "genre Name Must Be At Least 1 Characters"],
      trim: true,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
  }
);


// Song Model
const SongeModel = model<SongRequest.ISongDoc>("Song", songSchema);

export default SongeModel;
