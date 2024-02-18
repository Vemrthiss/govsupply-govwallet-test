import app from "./app";
import { initDB } from "./db";

app.listen(3000, async () => {
  try {
    await initDB();
    console.log("successfully init db");
  } catch (e) {
    console.error(e);
    return;
  }
  console.log("Server is running at port 3000");
});
