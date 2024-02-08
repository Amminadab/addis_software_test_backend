import { Router } from "express";
import {
  createSong,
  getSongById,
  getAllSongs,
  updateSongById,
  deleteSongById,
  deleteAllSongs,
  getSong,
  getSongsStatByNumbers,
  getNumberofSongsByGenre,
  getNumberofSongsByArtist,
  getSongsInEachAlbum
} from "./controller";
import {
  createSongValidation,
  updateSongValidation,
  deleteAllSongsValidation,
} from "./validation";

import validator from "../../utils/validator";



const router = Router();

router.get("/filter", getSong);
router.get("/numbers", getSongsStatByNumbers);
router.get("/genresongs", getNumberofSongsByGenre);
router.get("/artitssongs", getNumberofSongsByArtist);
router.get("/songsinablum", getSongsInEachAlbum);

router
  .route("/")
  .post(
    validator(createSongValidation),
    createSong
  )
  .get(getAllSongs)
  .delete(validator(deleteAllSongsValidation), deleteAllSongs)

  
//by id
router
.route("/:id")
.get(getSongById)
.patch(
  validator(updateSongValidation),
  updateSongById
)
.delete(deleteSongById);
export default router;
