const defaultUser = (userName) => ({
  userName,
});
//TODO debajit progree bar to be handled
export const userAuth = (userName, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(defaultUser(userName));
    }, 300);
  });
