import { UpdateWriteOpResult } from "mongoose";
import SongModel from "./model";

export default class Song {

  static async createSong(
    data: SongRequest.ICreateSong
  ): Promise<SongRequest.ISongDoc | null> {
    try {
      data.artist = data.artist.toLocaleLowerCase();
      data.title = data.title.toLocaleLowerCase();
      data.album = data.album.toLocaleLowerCase();
      data.genre = data.genre.toLocaleLowerCase();

      // check if song already exists using get Song
      const song = await Song.getSong({title: data.title});
      if (song?.length === 0) {
        return null;
      }

      const newsong = await SongModel.create(data);
      return newsong;
    } catch (error) {
      throw error;
    }
  }

  static async getSong(payload: {
    title?: string, artist?:string,
     album?: string, genre?:string}): Promise<SongRequest.ISongDoc[] | null> {
    try {
      // finding song
      const song = await SongModel.find(payload);
      if (song.length === 0) {
        return null;
      }

      return song;
    } catch (error) {
      throw error;
    }
  }

  /**
   * get song using id
   * @param id
   * @returns
   */
  static async getSongById(id: string): Promise<SongRequest.ISongDoc | null> {
    try {
      const song = await SongModel.findById(id);
      if (!song) {
        return null;
      }
      return song;
    } catch (error) {
      throw error;
    }
  }

  static async getAllSongs() {
    try {

      const songs = await SongModel.find();
      return songs;
    } catch (error) {
      throw error;
    }
  }

  static async getSongsByNumberStat() {
    try {

      const songs = await SongModel.aggregate([
        {
            $group: {
                _id: null,
                totalSongs: { $sum: 1 },
                totalArtists: { $addToSet: "$artist" },
                totalAlbums: { $addToSet: "$album" },
                totalGenres: { $addToSet: "$genre" }
            }
        },
        {
            $project: {
                _id: 0,
                totalSongs: 1,
                totalArtists: { $size: "$totalArtists" },
                totalAlbums: { $size: "$totalAlbums" },
                totalGenres: { $size: "$totalGenres" }
            }
        }
    ]);
      return songs[0];
    } catch (error) {
      throw error;
    }
  }

  static async getNumberofSongsByGenre() {
    try {

      const songs = await SongModel.aggregate([
        {
            $group: {
                _id: "$genre",
                totalSongs: { $sum: 1 }
            },
        }
    ]);
      return songs;
    } catch (error) {
      throw error;
    }
  }

  static async getSongsInEachAlbum() {
    try {

      const songs = await SongModel.aggregate([
        {
            $group: {
                _id: "$album",
                songs: { $push: "$$ROOT" }, // Push each song document into an array
                count: { $sum: 1 } // Calculate the count of songs in each album

            }
        }
    ]);
      return songs;
    } catch (error) {
      throw error;
    }
  }

//# of songs & albums each artist has
  static async getNumberofSongsByArtist() {
    try {

      const songs = await SongModel.aggregate([
        {
            $group: {
                _id: {
                    artist: "$artist",
                    album: "$album"
                },
                totalSongs: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: "$_id.artist",
                artists: {
                    $push: {
                        artist: "$_id.artist",
                        album: "$_id.album",
                        totalSongs: "$totalSongs"
                    }
                },
                totalAlbums: { $sum: 1 },
                totalSongs: { $sum: "$totalSongs" }
            }
        }
    ]);
      return songs;
    } catch (error) {
      throw error;
    }
  }

  static async updateSong(
    id: string,
    data: SongRequest.IgUpdateSong
  ): Promise<null | UpdateWriteOpResult> {
    try {
       // check if song already exists using index of Song
       const songExists = await Song.getSongById(id);
       if (!songExists) {
         return null;
       }

      data.artist && (data.artist = data.artist.toLocaleLowerCase());
      data.title && (data.title.toLocaleLowerCase());
      data.album && (data.album.toLocaleLowerCase());
      data.genre && (data.genre.toLocaleLowerCase());

      const updatedSong = await SongModel.updateOne(
        {_id: id},
        {$set: {...data}},
        {returnDocument: "after"}
      );

      return updatedSong;

    } catch (error) {
      throw error;
    }
  }

  /**
   * delete song by id
   * @param id
   * @returns
   */
  static async deleteSongById(id: string): Promise<SongRequest.ISongDoc | null> {
    try {
      // delete song
      const song = await SongModel.findByIdAndDelete(id);
      if (!song) {
        return null;
      }
      return song;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Song delete all
   * @returns
   */
  static async deleteAllSongs() {
    try {

      // delete all songs
      const songs = await SongModel.deleteMany({});
      return songs;
    } catch (error) {
      throw error;
    }
  }
}
