const ProviderCustomerModel = require('../../models/Provider_Customer');
const Tools = require('../../common/tools');

exports.getAll = (args) => {
      return ProviderCustomerModel
      .query()
      .select('*')
      .where({
                id_organization: args.id_organization
      })
      .then( results => { return results; })
      .catch( err => { return { status: "Error 500: "+err }; });

//     return ProviderCustomerModel
//       .query()
//       .select(
//             'a.name as organization',
//             'provider_customer.*')
//       .leftJoin('provider_customer_organization as a', 'a.id', 'provider_customer.id_provider_customer_organization')
//       .where({
//                 id_organization: args.id_organization
//       })
//       .then( results => { return results; })
//       .catch( err => { return { status: "Error 500: "+err }; });
}