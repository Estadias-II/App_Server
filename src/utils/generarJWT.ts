import jwt from "jsonwebtoken";

export const generarJWT = (uid: number) => {
  return jwt.sign(
    { uid },
    process.env.JWT_SECRET || "mi_secreto_super_seguro",
    { expiresIn: "4h" }
  );
};
