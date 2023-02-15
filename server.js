const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
