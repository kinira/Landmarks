import { Request, Response, Router, NextFunction } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({"title" : "index", "text" : "hello there!"})
});

export { router };
