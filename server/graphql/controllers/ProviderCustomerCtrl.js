const ProviderCustomerModel = require('../../models/Provider_Customer');
const Tools = require('../../common/tools');

exports.getAll = (args) => {
      // return ProviderCustomerModel
      // .query()
      // .select('*')
      // .where({
      //           id_organization: args.id_organization
      // })
      // .then( results => { return results; })
      // .catch( err => { return { status: "Error 500: "+err }; });

    return ProviderCustomerModel
      .query()
      .select(
         'a.name as organization_name',
         'provider_customer.*'
      )
      .join('provider_customer_organization as a', 'a.id', 'provider_customer.id_provider_customer_organization')
      .where('provider_customer.id_organization', args.id_organization)
      .then( results => { return results; })
      .catch( err => { return { status: "Error 500: "+err }; });



      // return ProviderModel
      // .query()
      // .select(
      //       'provider.id as pk_id_provider',
      //       'provider.relationship as provider_relationship', 
      //       'provider.status as provider_status', 
      //       'a.*')
      // .join('participant as a', 'a.id', 'provider.id_provider')
      // .where({
      //           id_participant: args.id_participant,
      //           id_project: args.id_project
      // })
      // .then( results => { return results; })
      // .catch( err => { return { status: "Error 500: "+err }; });
}