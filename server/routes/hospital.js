import express from "express";
import {
  getHospitalProfile,
  loginToHospital,
  logoutHospital,
  registerHospital,
  updateHospitalProfile,
} from "../controllers/hospital.js";

const router = express.Router();

router.post("/", registerHospital);
router.post("/auth", loginToHospital);
router.post("/logout", logoutHospital);
router.route("/profile").get(getHospitalProfile).patch(updateHospitalProfile);

export default router;
