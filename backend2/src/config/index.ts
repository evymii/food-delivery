import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Database
  mongoUrl:
    process.env.MONGOOSE_URL || "mongodb://localhost:27017/food-delivery",

  // Server
  port: parseInt(process.env.PORT || "4000"),
  nodeEnv: process.env.NODE_ENV || "development",

  // JWT
  jwtSecret:
    process.env.JWT_SECRET || "fallback-secret-key-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2h",

  // CORS
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",

  // Email (for future password reset functionality)
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
