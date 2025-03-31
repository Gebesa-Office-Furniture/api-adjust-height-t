require("module-alias/register");
require("@src/prototypes");
const path = require("path");
require("dotenv").config({ path: path.join(process.mainModule.path, "../.env") });
require("@services/tokenService.js").initDatabase();
const express = require("express");
// Cargar el archivo .env
const admin = require("firebase-admin");
const firebaseConfig = require(process.env.fbcm);
const cron = require("node-cron");

const app = express();
const PORT = 3000;
//=====Routes=====
const authRoutes = require("@routes/authRoutes");
const sessionRoutes = require("@routes/sessionRoutes");
//====================
//=====Middleware=====
const errorHandler = require("@middlewares/errorHandlerMiddleware");
const authMiddleware = require("@middlewares/authMiddleware");
//====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//FIREBASE
try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
  console.log("Firebase Connected")

} catch (e) {
  console.log("Firebase connection failed")
}

//Routes
app.use("/auth", authRoutes());
// *****
//Middleware active
// *****
app.use("/session", authMiddleware, sessionRoutes());
// *****
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.get("/", (req, res) => {
  return res.json({ 200: "Active" });
});
//Middlewares
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Server manually stopped.");
  tokenService.closeConnection();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Server stopped by system.");
  tokenService.closeConnection();
  process.exit(0);
});


//JOBS
const routineService = require("@services/routineService");
const reportService = require("./services/reportService");
console.log("Starting task services.")
cron.schedule("* * * * * *", () => {
  checkTaskStatus();
  checkSedentaryMode();
});
console.log("Job started checking the status of closed routines.");
async function checkTaskStatus() {
  try {
    var users_close_routine = await routineService.validate_closed_routine();

    // Code to send notifications of completed routines to users
    if (users_close_routine.length > 0) {
      const message = users_close_routine.map((user) => {
        return {
          notification: {
            title: user.Titulo,
            body: user.Descripcion,
          },
          token: user.Token,
          android: {
            notification: {
              sound: 'default'
            },
            priority: 'high'
          },
          apns: {
            payload: {
              aps: {
                alert: {
                  title: user.Titulo,
                  body: user.Descripcion,
                },
                sound: "default",  // Sonido en iOS
              },
            },
          }
        };
      });
      if (message) await admin.messaging().sendEach(message);
    }
  } catch (error) {
    console.error(error);
  }
}
console.log("Job started checking sedentary mode.");
async function checkSedentaryMode() {
  try {
    var sedentary_notifications = await reportService.check_sedentary_mode();

    // Code to send notifications of completed routines to users
    if (sedentary_notifications.length > 0) {
      const message = sedentary_notifications.map((user) => {
        return {
          notification: {
            title: user.Titulo,
            body: user.Descripcion,
          },
          token: user.Token,
          android: {
            notification: {
              sound: 'default'
            },
            priority: 'high'
          },
          apns: {
            payload: {
              aps: {
                alert: {
                  title: user.Titulo,
                  body: user.Descripcion,
                },
                sound: "default",  // IOS
              },
            },
          }
        };
      });
      if (message) await admin.messaging().sendEach(message);
    }
  } catch (error) {
    console.error(error);
  }
}

