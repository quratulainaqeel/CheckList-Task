const axios = require("axios");
require("dotenv").config();

const getstories = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.API_KEY}`
    );
    console.log("Sucessfull");
    res.status(200).json({
      Stories_data: response.data,
      Message: "Sucessfull",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { getstories };
