import { NextFunction, Request, Response } from "express";
import { Role, UserStatus } from "../../generated/prisma/enums";
import AppError from "../errors/AppError";
import { verifyJwtToken } from "../utils/jwt";
import config from "../config";
import { prisma } from "../config/prisma";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.accessToken || req?.headers?.authorization;

      if (!token) {
        throw new AppError(401, "Unauthorized Access! Token not found");
      }


     const verifiedUser = verifyJwtToken(token, config.ACCESS_SECRET as string) as JwtPayload;
     
      const userId = verifiedUser.userId || verifiedUser.id;
      if (!userId) {
        throw new AppError(401, "Invalid token payload");
      }

      const existUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existUser) {
        throw new AppError(401, "User does not exist");
      }

     
      if (existUser.isDeleted) {
        throw new AppError(403, "User account is deleted");
      }

      if (
        existUser.status === UserStatus.BLOCKED ||
        existUser.status === UserStatus.DELETED
      ) {
        throw new AppError(403, `User account is ${existUser.status.toLowerCase()}`);
      }

      
      if (authRoles.length > 0 && !authRoles.includes(existUser.role)) {
        throw new AppError(403, "Forbidden! You do not have permission to access this resource");
      }

     
      req.user = verifiedUser;

     
      next();
    } catch (err) {
      next(err);
    }
  };
};
