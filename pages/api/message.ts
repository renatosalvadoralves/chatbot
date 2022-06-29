import type { NextApiRequest, NextApiResponse } from "next";
import Message from "../../server/message.entity";
import { TResponse } from "../../types/server.types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse>
) {
  const { reply } = new Message(req.body.message);
  res.status(200).json({ message: reply });
}
