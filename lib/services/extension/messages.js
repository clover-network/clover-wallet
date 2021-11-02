const extension = require('extensionizer');

export const sendMessage = message => {
  const { runtime } = extension;
  return new Promise((resolve, reject) => {
    runtime.sendMessage(message, result => {
      const err = runtime.lastError;
      if (!err) {
        console.log(result)
        resolve(result);
      }
      reject(err);
    });
  });
};

export const getManifest = () => {
  const { runtime } = extension;
  return new Promise((resolve, reject) => {
    try {
      resolve(runtime.getManifest());
    } catch (err) {
      reject(err);
    }
  });
};
