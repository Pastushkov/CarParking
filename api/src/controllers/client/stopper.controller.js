const axios = require("axios");
const { STOPPER_ACCESS_TOKEN } = require("../../../config");

const homeAssistantUrl = "http://192.168.1.6:8123";

const status = async (req, res) => {
  try {
    const response = await axios.get(`${homeAssistantUrl}/api/states`, {
      headers: {
        Authorization: `Bearer ${STOPPER_ACCESS_TOKEN}`,
      },
    });
    if (response.status === 200) {
      console.log("Зв'язок з Home Assistant встановлено успішно!");
      console.log("Версія Home Assistant:", response.data.version);
      return res.status(200).json({
        ok: true,
        payload: {
          response: response.data,
        },
      });
    } else {
      console.error(`Помилка: Неочікуваний статус-код ${response.status}`);
      return res.status(400).json({
        ok: false,
        payload: {
          response,
        },
      });
    }
  } catch (error) {
    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      console.error(
        "Не вдалося підключитися. Перевірте IP-адресу та доступність Home Assistant."
      );
    } else {
      console.error("Виникла помилка при перевірці з'єднання:", error.message);
    }
    return res.status(500).json({
      ok: false,
      message: "Something went wrong.",
      error,
    });
  }
};

module.exports = { status };
