const defaultUser = (userName) => ({
  userName,
});

export const userAuth = (userName, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(defaultUser(userName));
    }, 300);
  });
