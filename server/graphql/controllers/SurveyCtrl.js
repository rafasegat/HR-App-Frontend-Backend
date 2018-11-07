const SurveyModel = require('../../models/Survey');

exports.getAll = (args) => {
      return SurveyModel
      .query()
      .select('*')
      .where({
            id_organization: args.id_organization
      })
      .then( results => { return results; })
      .catch( err => { return { status: "Error 500: " +err }; });
}