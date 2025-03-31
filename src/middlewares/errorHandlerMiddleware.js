module.exports = (err, req, res, next) => {
  if (err.originalError && err.originalError.info) {
    var numberErr = err.originalError.info.number;
    if (numberErr >= 5000 && numberErr <= 2147483647) {
      return res.status(400).json({ message: err.originalError.info.message });
    }
  }
  if (err.name == 'TypeError') return res.status(422).json({ message: err.message });

  return res.status(500).send({ message: err.message });
};
