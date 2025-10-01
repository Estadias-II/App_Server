import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export const verifyRequestErrors = (req: Request, res: Response, next: NextFunction) => {
    const requestErrors = validationResult(req);

    if (!requestErrors.isEmpty()) return res.status(500).json({errors: requestErrors.array()});

    next();
}