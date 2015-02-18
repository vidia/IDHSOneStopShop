var ejs = require("ejs");
var Agency = require("../../models/agency");
Agency.find( function ( err, agencies ) {
    if(err) {
      return res.send(err);
    }

    res.json(agencies);
    var html = new EJS({url: 'agency.ejs'}).render(agencySchema);
    document.getElementById('agencyCol').innerHTML = html;
  });
