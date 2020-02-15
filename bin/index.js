#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');

program
    .option('-f, --fix', 'Fix release (0.0.X)')
    .option('-m, --minor', 'Minor release (0.X.0)')
    .option('-M, --major', 'Major release (X.0.0)')
    .action(function () {
        if (program.fix) {
            updateVersion('fix');
        } else if (program.minor) {
            updateVersion('minor');
        } else if (program.major) {
            updateVersion('major');
        } else {
            console.log('Please add a release type!');
        }
    })
    .parse(process.argv);

function updateVersion(type) {
    const version = updatePackageJson(type);
    console.log(`Updated package.json: verison to ${version}!`);

    if (checkAndroidAvailable()) {
        const versionCode = updateAndroidBuildGradle(version);
        console.log(`Updated android/app/build.gradle: versionName to ${version}`);
        console.log(`Updated android/app/build.gradle: versionCode to ${versionCode}`);
    }
}

function updatePackageJson(type) {
    const packageJSON = readPackageJson();

    switch (type) {
        case 'fix':
            packageJSON.version = addFix(packageJSON.version);
            break;
        case 'minor':
            packageJSON.version = addMinor(packageJSON.version);
            break;
        case 'major':
            packageJSON.version = addMajor(packageJSON.version);
            break;
    }

    writePackageJson(packageJSON);
    return packageJSON.version;
}

function updateAndroidBuildGradle(version) {
    const buildGradleFile = fs.readFileSync('android/app/build.gradle', 'utf8');
    const lines = buildGradleFile.split('\n');
    let versionCode = 0;
    let updatedFile = '';

    for (var line of lines) {
        if (line.indexOf('versionCode') > -1) {

            const versionCodeIndex = line.indexOf('versionCode');
            versionCode = ((line.substring(versionCodeIndex + 11)) * 1) + 1;

            line = line.substr(0, versionCodeIndex) + `versionCode ${versionCode}`
        } else if (line.indexOf('versionName') > -1) {
            line = line.substr(0, line.indexOf('versionName')) + `versionName "${version}"`
        }

        updatedFile += line + '\n';
        index++;
    }

    fs.writeFileSync('android/app/build.gradle', updatedFile);
    return versionCode;
}

function checkAndroidAvailable() {
    return fs.existsSync('android/app/build.gradle');
}

function addFix(version) {
    let arr = version.split('.');
    arr[2] = (arr[2] * 1) + 1;
    return `${arr[0]}.${arr[1]}.${arr[2]}`;
}

function addMinor(version) {
    let arr = version.split('.');
    arr[1] = (arr[1] * 1) + 1;
    return `${arr[0]}.${arr[1]}.0`;
}

function addMajor(version) {
    let arr = version.split('.');
    arr[0] = (arr[0] * 1) + 1;
    return `${arr[0]}.0.0`;
}

function readPackageJson() {
    return JSON.parse(fs.readFileSync('package.json', 'utf8'));
}

function writePackageJson(packageJson) {
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
}