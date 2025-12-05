import app from "./app";
import { connectDB } from "./config/database";

const port = process.env['PORT'] || 3000;

connectDB().catch((err) => {
  console.log(err);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});