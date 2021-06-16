const chalk = require('chalk');

/**
 * Display an error message in the console.
 *
 * @param {string} message The message to be displayed.
 */
function displayErrorMessage(message) {
  console.log(chalk.red(`ERROR: ${message}`));
}

/**
 * Display a warning message in the console.
 *
 * @param {string} message The message to be displayed.
 */
function displayWarningMessage(message) {
  console.log(chalk.yellow(`WARNING: ${message}`));
}

/**
 * Display a confirmation message in the console.
 *
 * @param {string} message The message to be displayed.
 */
function displayConfirmationMessage(message) {
  console.log(chalk.green(`${message}`));
}

/**
 * Display a default info message in the console.
 *
 * @param {string} message The message to be displayed.
 */
function displayInfoMessage(message) {
  console.log(chalk.white(`${message}`));
}

/**
 * Display a separator surrounded by empty lines. (useful to temporarily visually distance the output from the
 * `experimental` warnings).
 */
function displaySeparator() {
  console.log('\n-----------------------------------------------------\n');
}

module.exports = {
  displayErrorMessage,
  displayWarningMessage,
  displayConfirmationMessage,
  displayInfoMessage,
  displaySeparator,
};
