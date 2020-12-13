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
  name: 'folderName',
  message: 'Input publish file name : '
}, {
  type: 'input',
  name: 'umdName',
  message: 'Input umd global variable name : '
}]).then((answer) => {
  // console.log('answer', answer)

  try {
    fs.renameSync(`src/${originalFolderName}`, `src/${answer.folderName}`)

    const publishIndexFileTemplate = fs.readFileSync('scripts/publishIndexFileTemplate.js', 'utf8')
    fs.writeFileSync(
      'scripts/publishIndexFileTemplate.js',
      publishIndexFileTemplate
        .replace(originalFolderNameRegExp, answer.folderName)
    )

    const rollupConfigFile = fs.readFileSync('rollup.config.js', 'utf8')
    fs.writeFileSync(
      'rollup.config.js',
      rollupConfigFile
        .replace(originalFolderNameRegExp, answer.folderName)
        .replace(/CUSTOM_UMD_GLOBAL_VARIABLE/g, answer.umdName)
    )

    const packageJsonString = fs.readFileSync('package.json', 'utf8')
    const packageJson = JSON.parse(packageJsonString)
    const originalPackageName = packageJson.name
    packageJson.name = answer.name
    packageJson.description = answer.description
    packageJson.author = answer.author
    packageJson.keywords = answer.keywords
    packageJson.unpkg = packageJson.unpkg.replace(originalFolderNameRegExp, answer.folderName)
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))

    const esAppjs = fs.readFileSync('examples/es/src/App.js', 'utf8')
    fs.writeFileSync(
      'examples/es/src/App.js',
      esAppjs
        .replace(new RegExp(originalPackageName, 'g'), packageJson.name)
        .replace(originalFolderNameRegExp, answer.folderName)
        .replace(/CUSTOM_UMD_GLOBAL_VARIABLE/g, answer.umdName)
    )
    const cjsIndexjs = fs.readFileSync('examples/cjs/index.js', 'utf8')
    fs.writeFileSync(
      'examples/cjs/index.js',
      cjsIndexjs
        .replace(new RegExp(originalPackageName, 'g'), packageJson.name)
        .replace(originalFolderNameRegExp, answer.folderName)
        .replace(/CUSTOM_UMD_GLOBAL_VARIABLE/g, answer.umdName)
    )
    const umdIndexHtml = fs.readFileSync('examples/umd/index.html', 'utf8')
    fs.writeFileSync(
      'examples/umd/index.html',
      umdIndexHtml
        .replace(new RegExp(originalPackageName, 'g'), packageJson.name)
        .replace(originalFolderNameRegExp, answer.folderName)
        .replace(/CUSTOM_UMD_GLOBAL_VARIABLE/g, answer.umdName)
    )

    console.log('===== Please wait a little bit... Installing npm packages (1 / 4) =====')
    execSync('npm install')
    console.log('===== Please wait a little bit... Installing npm packages (2 / 4) =====')
    execSync(`cd examples/es && npm remove ${originalPackageName} && npm install ../../`)
    console.log('===== Please wait a little bit... Installing npm packages (3 / 4) =====')
    execSync(`cd examples/cjs && npm remove ${originalPackageName} && npm install ../../`)
    console.log('===== Please wait a little bit... Installing npm packages (4 / 4) =====')
    execSync(`cd examples/umd && npm remove ${originalPackageName} && npm install ../../`)

    console.log('===== Please wait a little bit... Building packages =====')
    execSync('npm run build')
  } catch (err) {
    console.error(err)
  }
})
