// we provide functionality for the module to actually work. So we need to make them work by providing own versions.
// We need to export an object woth properties on it. properties are the functions that we use on the object.

// in test environment, no env variables are set or no services are requested from third party service providers.
// mock npm modules, so as to eliminate the real costs of the services.
module.exports={
  S3(){

  }
}