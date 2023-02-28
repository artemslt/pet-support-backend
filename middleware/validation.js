const validation = schema => {
  return (req, res, next) => {
    if (req.body.name === '') {
      req.body.name = 'New User';
    }
    if (req.body.location === '') {
      req.body.location = 'City, Region';
    }
    if (req.body.phone === '') {
      req.body.phone = '+380000000000';
    }
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: `${error}` });
      next(error);
    }
    next();
  };
};

module.exports = { validation };
