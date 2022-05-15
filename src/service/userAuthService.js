const defaultUser = (firstName) => ({
  firstName,
  lastName: "test last name",
  preferredName: "test prefer name",
  country: "India",
  voiceRecordUrl:
    "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a",
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

/*
   var blob = new Blob([response.value], { type: 'audio/mp3' })
        var url = window.URL.createObjectURL(blob)        
        audio.src = url
        audio.play()
        */
