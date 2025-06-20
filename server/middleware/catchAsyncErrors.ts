import { Request, Response, NextFunction } from "express";
export const CatchAsyncError =
  (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };

// func: getDataFromDataBase [async function]
// return error ? catch error
