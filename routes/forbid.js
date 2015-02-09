function forbid(res, req, next, key) {
  if(key in req.body) {
    res.code = 401;
    res.json( { message : "Value {" + key + "} cannot be updated here" } );
  } else return next();
}

module.exports = forbid
