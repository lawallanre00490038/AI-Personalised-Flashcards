// require("dotenv").config();

import {db} from "@/utils/db";

export const translateText = async ({ text}: {text: any}) => {
  const url = process.env.LINGVANEX_TRANSLATE_URL;
  const authToken = process.env.LINGVANEX_TRANSLATE_API_KEY;



  const schoolData = await db.aLXSchool.findMany({
    take: 1, // Only fetch the most recent survey response
    orderBy: {
      createdAt: "desc", // Order the records by date in descending order
    },
  });
  const school = schoolData[0];
  const { language } = school;

  const requestBody = {
    from: "en_GB",
    to: `${language}_NG`,
    data: text,
    platform: "api",
  };

  if (!url) {
    throw new Error("Translation URL is not defined");
  }
  if (!authToken) {
    throw new Error("Translation API key is not defined");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
