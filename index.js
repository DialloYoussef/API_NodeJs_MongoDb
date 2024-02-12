const { connectDb } = require("./src/services/mongoose");

const paiementRoutes = require("./src/routes/payement.route");
const anneeRoutes = require("./src/routes/academicYear.route");
const niveauRoutes = require("./src/routes/level.route");
const deptRoutes = require("./src/routes/department.route");
const dept_niv_Routes = require("./src/routes/departmentLevel.route");
const etudiantRoutes = require("./src/routes/student.route");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

connectDb().catch((error) => console.error("Erreur générale:", error));

app.use(express.json());
app.use(paiementRoutes);
app.use(anneeRoutes);
app.use(niveauRoutes);
app.use(deptRoutes);
app.use(dept_niv_Routes);
app.use(etudiantRoutes);

app.listen(port, () => {
  console.log(`Le serveur est lance au port : http://localhost:${port}`);
});
