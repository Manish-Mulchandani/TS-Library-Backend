import { Request, Response, NextFunction, RequestHandler } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userId?:string;
}

const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  
  try {
    const jwtSecret = process.env.JWT_SECRET!;
    const decoded = JWT.verify(token, jwtSecret) as JwtPayload;
    req.userId = decoded._id as string;
    // req.user = { _id: decoded._id };
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
};

export default authenticate as RequestHandler;