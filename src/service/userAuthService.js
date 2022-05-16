const defaultUser = (firstName) => ({
  firstName,
  lastName: "test last name",
  preferredName: "test prefer name",
  country: "en-US",
  voiceType: "",
  voiceRecordUrl:
    "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a",
});

const requestBody = (
  pronunciationText,
  lang,
  voiceType
) => `<speak version="1.0" xml:lang="en-US">
<voice xml:lang="${lang}" xml:gender="${voiceType}" name="en-US-JennyNeural">
    ${pronunciationText}
</voice>
</speak>`;

export const userAuth = (userName, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(defaultUser(userName));
    }, 300);
  });

export const getAudioFile = async (value) => {
  let preferName = value?.preferredName
    ? value.preferredName
    : value.firstName + " " + value.lastName;
  let voiceType = value?.voiceType ? value?.voiceType : "Female";
  let lang = value?.country ? value?.country : "en-US";

  try {
    return await fetch(
      "https://centralindia.tts.speech.microsoft.com/cognitiveservices/v1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
          "Ocp-Apim-Subscription-Key": "20ce7aa7f2ef4db9b5aa10361b6642a3",
        },
        body: requestBody(preferName, lang, voiceType),
      }
    )
      .then((response) => {
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
  } catch (exp) {
    throw exp;
  }
};
