const extension = require('extensionizer');

let outTime = null,reNum = 0;
export const sendMessage = message => {
  const { runtime } = extension;
  return new Promise((resolve, reject) => {
    runtime.sendMessage(message, result => {
      const err = runtime.lastError;
      if (!err) {
        console.log(result);
        if(result?.result && result?.result[0]?.status == 200){
          reNum = 0;
          if(outTime){
            clearTimeout(outTime);
            outTime = null;
          }
        }
        outTime = setTimeout(()=>{
          if(result?.result){
            let arr = result.result;
            if(Array.isArray(arr) && arr[0].status == 500){
              reNum += 1;
              if(reNum>3){
                console.log("reload!!");
                //runtime.reload();
              }
            }
          }
        },4000);
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
