import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No hay token en la petición"
    });
  }

  try {
    const secret = process.env.JWT_SECRET || "mi_secreto_super_seguro";
    const { uid }: any = jwt.verify(token, secret);

    (req as any).uid = uid;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token no válido"
    });
  }
};
