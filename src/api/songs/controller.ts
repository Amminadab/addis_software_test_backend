import { Request, Response, NextFunction } from "express";
import Song from "./dal";
import AppError from "../../utils/app_error";
import  Category  from "./dal";
import configs from "../../configs";

/**
 * Create Songs Controller
 * @param req
 * @param res
 * @param next
 */
export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Create new song
    const newsong = await Song.createSong(
      req.body as SongRequest.ICreateSong
    );
    if (!newsong) {
      throw new AppError("Song already exists", 400);
    }

    
    // Send response
    res.status(201).json({
      status: "SUCCESS",
      message: `${newsong.title} song created successfully`,
      data: {song: newsong}
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * find song by id controller
 * @param req
 * @param res
 * @param next
 */
export const getSongById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const song = await Song.getSongById(req.params.id);
    if (!song) {
      throw new AppError("Song does not exist", 404);
    }
    
      
    // Send response
    res.status(201).json({
      status: "SUCCESS",
      data: {song}
    });

  } catch (error) {
    next(error);
  }
};

/**
 * filter song controller
 * @param req
 * @param res
 * @param next
 */
export const getSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filterBy = req.query;

    const fields = ["genre", "allbum", "artist", "title"]

    if(!fields.includes(Object.keys(filterBy)[0])){
      return next(new AppError("Please provide the correct filter key", 400))
    }

    const song = await Song.getSong(filterBy);
    if (!song) {
      throw new AppError("Song does not exist", 404);
    }
    
    // Send response
    res.status(201).json({
      status: "SUCCESS",
      data: {song}
    });

  } catch (error) {
    next(error);
  }
};


export const getNumberofSongsByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.getNumberofSongsByGenre();

     // Send response
     res.status(201).json({
      status: "SUCCESS",
      data: {songs}
    });

  } catch (error) {
    next(error);
  }
};

export const getNumberofSongsByArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.getNumberofSongsByArtist();

     // Send response
     res.status(201).json({
      status: "SUCCESS",
      data: {songs}
    });

  } catch (error) {
    next(error);
  }
};

export const getSongsInEachAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.getSongsInEachAlbum();

     // Send response
     res.status(201).json({
      status: "SUCCESS",
      data: {songs}
    });

  } catch (error) {
    next(error);
  }
};


export const getSongsStatByNumbers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.getSongsByNumberStat();

     // Send response
     res.status(201).json({
      status: "SUCCESS",
      data: {songs}
    });

  } catch (error) {
    next(error);
  }
};


export const getAllSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.getAllSongs();

     // Send response
     res.status(201).json({
      status: "SUCCESS",
      data: {songs}
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Update song by id controller
 * @param req
 * @param res
 * @param next
 */
export const updateSongById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const song = await Song.updateSong(
      req.params.id as string,
      req.body as SongRequest.IgUpdateSong
    );
    if (!song) {
      throw new AppError("Song does not exist", 404);
    }

     // Send response
     res.status(201).json({
      status: "SUCCESS",
      message: `Song ${song.title} updated successfully`,
      data: {song}
    });

  } catch (error) {
    next(error);
  }
};



/**
 * delete song by id controller
 * @param req
 * @param res
 * @param next
 */
export const deleteSongById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const deletedSong = await Song.deleteSongById(
      req.params.id as string
    );
    if (!deletedSong) {
      throw new AppError("Song does not exist", 404);
    }

     // Send response
     res.status(201).json({
      status: "SUCCESS",
      message: `Song ${deletedSong.title} deleted successfully`,
    });

  } catch (error) {
    next(error);
  }
};

export const deleteAllSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {delete_key} = req.body as SongRequest.IDeleteAllSongs;

    if(delete_key !== configs.delete_key){
      return next(new AppError("Invalid Delete key", 400))
    }

    const song = await Song.deleteAllSongs();
    if (!song) {
      throw new AppError(
        "Songs cannot be deleted because they are used by one or more suppliers",
        400
      );
    }
    // Send response
    res.status(201).json({
      status: "SUCCESS",
      message: `All Songs are deleted successfully`,
    });

  } catch (error) {
    next(error);
  }
};
