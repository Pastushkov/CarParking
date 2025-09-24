const axios = require("axios");
const { STOPPER_ACCESS_TOKEN } = require("../../../config");

const homeAssistantUrl = "http://192.168.1.6:8123/api";

const headers = {
  Authorization: `Bearer ${STOPPER_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

const status = async (req, res) => {
  try {
    const response = await axios.get(`${homeAssistantUrl}/states`, {
      headers,
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

const execute = async (req, res) => {
  const entityId = "light.tz3000_p26flek3_ts0001";

  const { status } = req.query;

  const service =
    status === "off" ? "turn_on" : status === "on" ? "turn_off" : null;
  if (!service) {
    return res.status(400).json({
      ok: false,
      message: "Wrong status",
      status,
    });
  }
  const url = `${homeAssistantUrl}/services/light/${service}`;
  try {
    const response = await axios.post(
      url,
      {
        entity_id: entityId,
      },
      { headers }
    );
    if (response.status === 200) {
      setTimeout(async () => {
        await axios.post(
          `${homeAssistantUrl}/services/light/turn_on`,
          {
            entity_id: entityId,
          },
          { headers }
        );
      }, 1800);
    }
    return res.status(200).json({
      ok: true,
      payload: {
        data: response.data,
      },
      message: `Команда '${service}' виконана успішно:, ${response.data}`,
    });
  } catch (error) {
    let errorMessage = "";
    if (error.response) {
      errorMessage = `Помилка: ${error.response.status} - ${error.response.statusText}`;
      console.error(
        `Помилка: ${error.response.status} - ${error.response.data.message}`
      );
    } else {
      errorMessage = `Помилка при керуванні реле: ${error.message}`;
      console.error("", error.message);
    }
    return res.status(500).json({
      ok: false,
      message: errorMessage,
      url,
    });
  }
};

const on = async (req, res) => {
  const entityId = "light.tz3000_p26flek3_ts0001";
  const service = "turn_off";
  const url = `${homeAssistantUrl}/services/light/${service}`;
  try {
    const response = await axios.post(
      url,
      {
        entity_id: entityId,
      },
      { headers }
    );
    if (response.status === 200) {
      setTimeout(async () => {
        await axios.post(
          `${homeAssistantUrl}/services/light/turn_on`,
          {
            entity_id: entityId,
          },
          { headers }
        );
      }, 1800);
    }
    return res.status(200).json({
      ok: true,
      payload: {
        data: response.data,
      },
      message: `Команда '${service}' виконана успішно:, ${response.data}`,
    });
  } catch (error) {
    let errorMessage = "";
    if (error.response) {
      errorMessage = `Помилка: ${error.response.status} - ${error.response.statusText}`;
      console.error(
        `Помилка: ${error.response.status} - ${error.response.data.message}`
      );
    } else {
      errorMessage = `Помилка при керуванні реле: ${error.message}`;
      console.error("", error.message);
    }
    return res.status(500).json({
      ok: false,
      message: errorMessage,
      url,
    });
  }
};

const off = async (req, res) => {
  const entityId = "light.tz3000_p26flek3_ts0001";
  const service = "turn_on";
  const url = `${homeAssistantUrl}/services/light/${service}`;
  try {
    const response = await axios.post(
      url,
      {
        entity_id: entityId,
      },
      { headers }
    );
    if (response.status === 200) {
      setTimeout(async () => {
        await axios.post(
          `${homeAssistantUrl}/services/light/turn_off`,
          {
            entity_id: entityId,
          },
          { headers }
        );
      }, 1800);
    }
    return res.status(200).json({
      ok: true,
      payload: {
        data: response.data,
      },
      message: `Команда '${service}' виконана успішно:, ${response.data}`,
    });
  } catch (error) {
    let errorMessage = "";
    if (error.response) {
      errorMessage = `Помилка: ${error.response.status} - ${error.response.statusText}`;
      console.error(
        `Помилка: ${error.response.status} - ${error.response.data.message}`
      );
    } else {
      errorMessage = `Помилка при керуванні реле: ${error.message}`;
      console.error("", error.message);
    }
    return res.status(500).json({
      ok: false,
      message: errorMessage,
      url,
    });
  }
};

const userOnPlace = async (status) => {
  const channels = {
    channel1: "light.chanel_1",
    channel2: "light.chanel_2",
    channel3: "light.chanel_3",
    channel4: "light.chanel_4",
  };

  let turnOnChannels = [];
  let turnOffChannels = [];

  if (status === "on") {
    turnOnChannels = [channels.channel1, channels.channel3];
    turnOffChannels = [channels.channel2, channels.channel4];
  } else if (status === "off") {
    turnOnChannels = [channels.channel2, channels.channel4];
    turnOffChannels = [channels.channel1, channels.channel3];
  } else {
    return {
      status: 400,
      message: "Wrong status",
    };
  }

  try {
    await axios.post(
      `${homeAssistantUrl}/services/homeassistant/turn_on`,
      {
        entity_id: turnOnChannels,
      },
      { headers }
    );

    setTimeout(async () => {
      await axios.post(
        `${homeAssistantUrl}/services/homeassistant/turn_off`,
        {
          entity_id: turnOnChannels,
        },
        { headers }
      );
    }, 1300);
    return {
      status: 200,
      message: `Chanels ${turnOnChannels}`,
    };
  } catch (error) {
    console.error("Помилка при керуванні реле:", error.message);
    if (error.response) {
      console.error("Деталі помилки:", error.response.data);
    }
    return {
      status: 500,
      error,
      message: `Помилка при керуванні реле: ${error.message}`,
    };
  }
};

const execute4Line = async (req, res) => {
  const { status } = req.query;
  const { status: fstatus, message, error } = await userOnPlace(status);
  return res.status(fstatus).json({
    message,
    error,
  });
};

module.exports = { status, execute, on, off, execute4Line, userOnPlace };
