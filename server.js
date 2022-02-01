const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  