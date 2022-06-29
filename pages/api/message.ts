import type { NextApiRequest, NextApiResponse } from "next";
import Message from "../../server/message.entity";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body } = req;
  const { reply } = new Message(body.message);

  res.status(200).json({ message: reply });
}
