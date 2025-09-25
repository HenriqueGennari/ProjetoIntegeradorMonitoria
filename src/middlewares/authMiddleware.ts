import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

// Extendendo o Request para incluir user

export interface AuthRequest extends Request { // criando um type authrequest para atribuirmos o req.user 
  user?: {
    id: string;
    nome: string;
    email: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization; // token que chega
    

    if (!authHeader) {
      return res.status(401).json({ erro: "TOKEN_NAO_FORNECIDO" });
    }

    // Formato esperado: "Bearer <token>" formatação para ser aceito,  o chat que fez

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ erro: "TOKEN_INVALIDO" });
    }

    const token = parts[1];

    // permite passar a chave para o verify

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET_NAO_DEFINIDO");
    }

    // verifica o token

    console.log("Token recebido:", token);
    console.log("Authorization header:", req.headers.authorization);

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    // adiciona dados do usuário no request

    req.user = { // usando a interface que definimos para poder pegar as informações e exibir pro front
      id: decoded.id as string,
      nome: decoded.nome as string,
      email: decoded.email as string
    };

    next(); //

  } catch (err: any) {
    return res.status(401).json({ erro: "TOKEN_INVALIDO" });
  }
};
