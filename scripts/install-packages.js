// const { exec } = require('child_process');
import { exec } from 'child_process';
const axios = require('axios');

async function fetchPackageNames() {
  try {
    const response = await axios.get('https://your-api-endpoint/api/icons'); // replace with your actual API endpoint
    const icons = response.data.data || []; // Adjust based on your API response structure

    const packageNames = new Set();
    icons.forEach(icon => {
      if (icon.packageName) {
        packageNames.add(icon.packageName);
      }
    });

    return Array.from(packageNames);
  } catch (error) {
    console.error('Error fetching package names:', error);
    return [];
  }
}

async function installPackages() {
  const packages = await fetchPackageNames();
  if (packages.length === 0) {
    console.log('No packages to install.');
    return;
  }

  const packagesToInstall = packages.join(' ');
  exec(`npm install ${packagesToInstall}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing packages: ${error}`);
      return;
    }
    console.log(`Packages installed: ${stdout}`);
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
  });
}

installPackages();
