const defaultUser = (userName) => ({
  userName,
});

export const userAuth = (userName, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(defaultUser(userName));
    }, 300);
  });

export const getAudioFile = (value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a"
      );
    }, 300);
  });
