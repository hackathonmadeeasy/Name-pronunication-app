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
      resolve("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    }, 300);
  });
