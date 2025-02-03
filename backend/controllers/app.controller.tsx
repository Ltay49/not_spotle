import { NextFunction, Request, Response } from "express";
const endpoints = require('../data/api.json')
import {fetchAllStats, fetchPlayer} from '../models/model'

export const getApi = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(endpoints);
    } catch (err) {
      next(err);
    }
  };
 
  export const getStats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
    try {
        const playerStats = await fetchAllStats();
        res.status(200).json(playerStats)
    }
    catch(err){
        next(err)
    }
  }

export const getPlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
try {
  const name: string = req.params.name;
  const player = await fetchPlayer(name);
  res.status(200).send(player)
} catch (err) {
  next(err);
}
};