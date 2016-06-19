module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  const credentialsRegExp = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9\-\._~\+\/]+=*) *$/;
  const userPassRegExp = /^([^:]*):(.*)$/;
  const match = credentialsRegExp.exec(header);

  if (!match) {
    res.set('WWW-Authenticate', 'Basic realm="Required"');
    return res.sendStatus(401);
  }

  const userPass = userPassRegExp.exec(new Buffer(match[1], 'base64').toString());

  if (!userPass) {
    res.set('WWW-Authenticate', 'Basic realm="Required"');
    return res.sendStatus(401);
  }

  const name = userPass[1];
  const password = userPass[2];

  if (name === "admin" && password === "meowmix") {
    return next();
  }

  res.sendStatus(401);
}
