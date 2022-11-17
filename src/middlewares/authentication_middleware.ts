import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../database';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      const decoded = jwt.verify(
        token,
        config.TOKEN_SECRET as unknown as string
      ) as JwtPayload;
      if (decoded) {
        req.params.user_id = decoded.auth_user.id;
        next();
      } else {
        res.status(403).json({
          message: 'faild to verify token',
        });
      }
    } else {
      res.status(406).json({
        message: 'No token to verify',
      });
    }
  } catch (err) {
    res.status(400).json({
      Error: err,
      message: 'Something went wrong with token validation',
    });
  }
};

export default verifyAuthToken;
