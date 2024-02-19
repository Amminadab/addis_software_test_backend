import { Document } from "mongoose";


declare global {
  namespace SongRequest {

    interface ISongDoc extends Document {
      id: string
      title: string;
      artist: string;
      album: string;
      genre: string;
      createdAt: Date;
      updatedAt: Date
    }
    // Song create interface
    interface ICreateSong {
      title: string;
      artist: string;
      album: string;
      genre: string;
    }

    interface IgUpdateSong {
      title: string;
      artist: string;
      album: string;
      genre: string;
    }

    interface IDeleteAllSongs {
      delete_key: string
    }
  }
}
