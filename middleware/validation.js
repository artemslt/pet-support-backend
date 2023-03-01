const validation = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: `${error}` });
      next(error);
    }
    next();
  };
};

module.exports = { validation };
