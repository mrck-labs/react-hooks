const execSync = require('child_process').execSync;

function getCurrentBranchName() {
    return execSync('git rev-parse --abbrev-ref HEAD', {
        encoding: 'utf8',
    }).trim();
}

const branchName = getCurrentBranchName();

console.log('Branch name: ', branchName);

const dynamicBranchConfig =
    branchName !== 'master'
        ? [
              {
                  name: branchName,
                  channel: branchName,
                  prerelease: true,
              },
          ]
        : [];

module.exports = {
    branches: [
        ...dynamicBranchConfig,
        {
            name: 'beta',
            channel: 'beta',
            prerelease: true,
        },
        {
            name: 'master',
            channel: 'latest',
            type: 'release',
        },
    ],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
        '@semantic-release/github',
        '@semantic-release/npm',
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'package.json'],
            },
        ],
    ],
};
