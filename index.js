const { connectDb } = require("./src/services/mongoose");

const paiementRoutes = require('./src/routes/paiement')
const anneeRoutes = require('./src/routes/anneeUniv')
const niveauRoutes = require('./src/routes/niveau')
const deptRoutes = require('./src/routes/departement')
const dept_niv_Routes = require('./src/routes/departementNiveau')
const etudiantRoutes = require('./src/routes/etudiant')
const action = require('./src/routes/actionsStudent')

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
app.use(action);


app.listen(port, () => {
  console.log(`Le serveur est lance au port : http://localhost:${port}`);
});
