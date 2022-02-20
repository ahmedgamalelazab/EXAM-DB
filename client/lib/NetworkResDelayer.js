/**
 *
 * @param {number} seconds
 */
async function delay(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`server response delayed ${seconds}`);
    }, seconds);
  });
}

export { delay };
