// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // BASE_URL: 'http://192.168.2.23:9000/feed/api/v1/',
  //BASE_URL: 'http://192.168.2.17:9000/feed/api/v1/',
  BASE_URL: 'http://localhost:9000/feed/api/v1/',
  // BASE_URL1:'http://localhost:8080/'
  BASE_URL1:'../../assets/files/analysis.json',
  BASE_URL2:'../../assets/files/state.json',
  BASE_URL3:'../../assets/files/checklistData.json',
  BASE_URL5:'../../assets/files/Parent.json',
  BASE_URL6:'../../assets/files/FirstColumn.json',
  BASE_URL7:'../../assets/files/SecondColumn.json'
};