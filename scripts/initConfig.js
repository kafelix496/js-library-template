const path = require('path')
const fs = require('fs')
const { prompt } = require('enquirer')
const { execSync } = require('child_process')

const originalFolderName = 'customLibraryTemplate'
const originalFolderNameRegExp = new RegExp(originalFolderName, 'g')

console.log('===== Package information... If you want to skip question, please press enter =====')
prompt([{
  type: 'input',
  name: 'name',
  message: 'Input package name : '
}, {
  type: 'input',
  name: 'description',
  message: 'Input package description : '
}, {
  type: 'input',
  name: 'author',
  message: 'Input package author : '
}, {
  type: 'list',
  name: 'keywords',
  message: 'Input package keywords ( Type comma-separated keywords ) : '
}, {
  type: 'input',
  name: 'bundleName',
  message: 'Input bundle name ( Default is \'customLibraryTemplate\' ) : '
}, {
  type: 'input',
  name: 'umdName',
  message: 'Input umd global variable name : '
}]).then((answer) => {
  // console.log('answer', answer)

  try {
    fs.renameSync(`src/${originalFolderName}`, `src/${answer.bundleName}`)

    const publishIndexFileTemplate = fs.readFileSync('scripts/publishIndexFileTemplate.js', 'utf8')
    fs.writeFileSync(
      'scripts/publishIndexFileTemplate.js',
      publishIndexFileTemplate
        .replace(originalFolderNameRegExp, answer.bundleName)
    )

    const rollupConfigFile = fs.readFileSync('rollup.config.js', 'utf8')
    fs.writeFileSync(
      'rollup.config.js',
      rollupConfigFile
        .replace(originalFolderNameRegExp, answer.bundleName)
        .replace(/CUSTOM_UMD_GLOBAL_VARIABLE/g, answer.umdName)
    )

    const packageJsonString = fs.readFileSync('package.json', 'utf8')
    const packageJson = JSON.parse(packageJsonString)
    packageJson.name = answer.name
    packageJson.description = answer.description
    packageJson.author = answer.author
    packageJson.keywords = answer.keywords
    packageJson.unpkg = packageJson.unpkg.replace(originalFolderNameRegExp, answer.bundleName)
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))

    console.log('===== Please wait a little bit... Installing npm packages =====')
    execSync('npm install')
    console.log('===== Please wait a little bit... Building packages =====')
    execSync('npm run build')
  } catch (err) {
    console.error(err)
  }
})
