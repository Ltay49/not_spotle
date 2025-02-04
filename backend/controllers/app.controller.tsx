import { NextFunction, Request, Response } from "express";
const endpoints = require('../data/testdata/api.json')
import { fetchAllStats, fetchPlayer, ChosenPlayer, updateUsedStats } from '../models/model'

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
) => {
  try {
    const playerStats = await fetchAllStats();
    res.status(200).json(playerStats)
  }
  catch (err) {
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

export const postChosenPlayer = async (
  req: Request <{}, {}, ChosenPlayer>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Incoming request body:", req.body)
    const chosenPlayer = await updateUsedStats(req.body)
    res.status(201).json(chosenPlayer)
  }
  catch (err) {
    next(err);
  }
}