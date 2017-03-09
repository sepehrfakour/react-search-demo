require('./env.js');
const INDEX_NAME = 'restaurants';  // Set the name of the index

const algoliasearch       = require('algoliasearch'),
      client              = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_API_KEY),
      index               = client.initIndex(INDEX_NAME),
      baby                = require('babyparse'),
      babyOptions         = {header:true, skipEmptyLines:true},
      restaurantsListJSON = require('../resources/dataset/restaurants_list.json');
      restaurantsInfoJSON = baby.parseFiles('./resources/dataset/restaurants_info.csv', babyOptions).data
                                .map((record) => {
                                  record.stars_count = parseFloat(record.stars_count);
                                  return record;
                                });

const updateImport = function (data) {
  index.partialUpdateObjects(data, function(err, content) {
    if (err) { throw err }
    console.log('\n--- Algolia Update Complete ---\n');
  });
};

const executeImport = function (listDataSet,infoDataSet,callback) {
  index.addObjects(listDataSet, function(err, content) {
    if (err) { throw err }
    console.log('\n--- Algolia Import Complete ---\n');
    callback(infoDataSet);
  });
};

executeImport(restaurantsListJSON,restaurantsInfoJSON,updateImport);
