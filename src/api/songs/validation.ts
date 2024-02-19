import Joi from "joi";

// validation for create song
export const createSongValidation = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      "string.pattern.base": "Title must contain letters",
    }),
  artist: Joi.string()
    .required()
    .messages({
      "string.pattern.base": "Artist must contain letters",
    }),
  album: Joi.string(),
  index: Joi.string().required(),
  genre: Joi.string()
    .required()
    .messages({
      "string.pattern.base": "Genre must contain letters",
    }),
});

// validation for update song
export const updateSongValidation = Joi.object({
  title: Joi.string().optional(),
  artist: Joi.string().optional(),
  album: Joi.string().optional(),
  genre: Joi.string().optional(),
});

// validation for delete key
export const deleteAllSongsValidation = Joi.object({
  delete_key: Joi.string().required().messages({
    "any.only": "Invalid delete key",
  }),
});
