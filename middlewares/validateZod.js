import { z } from 'zod/v4';

const validateZod = zodSchema => (req, res, next) => {
  const { success, data, error } = zodSchema.safeParse(req.body);
  if (!success) {
    next(new Error(z.prettifyError(error), { cause: 400 }));
  } else {
    req.sanitizedBody = data;
    next();
  }
};

export default validateZod;
