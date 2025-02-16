const setCookies = require("../utils/setCookies");
const meets = require("../Models/meets");
const save = async (req, res) => {
  if (req.body.adminName && req.body.meetingId) {
    try {
      const meet = await meets.create(req.body);
      if (meet) {
        const token = setCookies(meet); // Generate token
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        console.log("SuccessFully Saved Data in Data Base");
        return res.status(201).json({ status: "success", message: "created" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", message: "not created" });
    }
  } else {
    return res
      .status(404)
      .json({ status: "fail", message: "No username or meetingId" });
  }
};
const see = async (req, res) => {
  try {
    const meet = await meets.findOne({ meetingId: req.body.meetingId });
    if (!req.token && meet.adminName) {
      console.log("NO tokens , means another user");
      return res.status(200).json({ status: "success", token: false });
    }
    if (req.token && meet.adminName) {
      let adminName1 = req.adminName.toLowerCase().replace(/\s+/g, "");
      let adminName2 = req.body.adminName.toLowerCase().replace(/\s+/g, "");
      let adminName3 = meet.adminName.toLowerCase().replace(/\s+/g, "");
      if (adminName1 === adminName2 && adminName2 === adminName3) {
        console.log("Have token , means admin");
        return res.status(200).json({ status: "success", token: true });
      }
      if (adminName1 !== adminName2 || adminName2 !== adminName3) {
        console.log("Have token , But not the current one admin");
        return res.status(200).json({ status: "success", token: false });
      }
    }
  } catch (error) {
    console.log("In catch and error is::", error);
    return res.status(500).json({ status: "fail", message: "500" });
  }
};
module.exports = { save, see };
