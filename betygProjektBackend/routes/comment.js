import { StatusCodes } from "http-status-codes";
import { cockDB } from "../index.js";

export const createComment = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg: 'no text in body'});
  }

  const admin = res.locals.tokenData.admin;
  const estateuuid = req.params.uuid;
  let isAdmin;
  let useruuid;

  if (admin) {
    isAdmin = true;
    useruuid = admin;
  } else {
    isAdmin = false;
    useruuid = res.locals.tokenData.uuid;
  }

  try {
    await cockDB.query('insert into comments(taskuuid, text, admin, useruuid) values($1, $2, $3, $4)', [estateuuid, text, isAdmin, useruuid]);
    return res.status(StatusCodes.ACCEPTED).json({msg: 'comment uploaded'});
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({msg: err.message});
  }
};

export const deleteComment = (req, res) => {
  try {
    const useruuid = res.locals.tokenData.admin ?? res.locals.tokenData.uuid;
    console.log(useruuid);

  } catch (err) {}
};

export const getComments = async (req, res) => {
  try {
    const comments = (await cockDB.query('select * from comments where taskuuid=$1', [req.params.taskuuid])).rows;
    return res.status(StatusCodes.ACCEPTED).json({comments});
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg: err.message});
  }
}