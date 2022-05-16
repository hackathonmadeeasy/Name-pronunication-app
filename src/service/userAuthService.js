import { DataObjectSharp } from "@mui/icons-material";
import axios from "axios";
import { CountryVoiceName, RESOUREC_URL } from "./utils";

const defaultUser = () => ({
  firstName: "",
  lastName: "",
  preferredName: "",
  country: "en-US",
  voiceType: "",
});

const requestBody = (
  pronunciationText,
  lang,
  voiceType,
  countryVoiceMapping
) => `<speak version="1.0" xml:lang="${lang}">
<voice xml:lang="${lang}" xml:gender="${voiceType}" name="${countryVoiceMapping}">
    ${pronunciationText}
</voice>
</speak>`;

export const userAuth = (userName, password) =>
  axios({
    method: "post",
    url: `${RESOUREC_URL}/pronunciation/login`,
    data: {
      userName,
      password,
    },
    headers: { "Content-Type": "application/json" },
  }).then((response) => Object.assign(defaultUser(), response.data));

const getPreRecordedAudio = (userName) => {
  return axios({
    method: "post",
    url: `${RESOUREC_URL}/pronunciation/findPreRecordedAudio`,
    data: {
      userName,
    },
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.data);
};

export const getAudioFile = async (value) => {
  try {
    let preferName = value?.preferredName
      ? value.preferredName
      : value.firstName;
    if (preferName) {
      let preRecordedUrl = await getPreRecordedAudio(preferName.toLowerCase());
      if (preRecordedUrl && preRecordedUrl?.voiceRecordUrl)
        return `${RESOUREC_URL}/${preRecordedUrl.voiceRecordUrl}`;
    }
  } catch (exp) {
    console.log(exp);
  }

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
        body: requestBody(preferName, lang, voiceType, CountryVoiceName[lang]),
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
