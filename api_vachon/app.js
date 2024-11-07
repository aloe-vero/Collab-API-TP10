const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let clients = [
  {
    id: 1,
    prenom: "JEANNNNN",
    nom: "leGrand",
    tel: "123-456-7890",
    email: "jean@example.com",
  },
  {
    id: 2,
    prenom: "Alexandre",
    nom: "laVache",
    tel: "111-222-3333",
    email: "alexandre@example.com",
  },
  {
    id: 3,
    prenom: "Pablo",
    nom: "lePetitPrince",
    tel: "444-555-6666",
    email: "pablo@example.com",
  },
];

// Routes de l'API
app.get("/clients", (req, res) => {
  const clientReferences = clients.map((client) => `/client/${client.id}`);
  res.json(clientReferences);
});

app.get("/client/:id", (req, res) => {
  const clientId = parseInt(req.params.id);
  const client = clients.find((client) => client.id === clientId);
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ error: "Client non trouvé" });
  }
});

// Ajouter un nouveau client
app.post("/clients", (req, res) => {
  const newClient = {
    id: clients.length + 1,
    prenom: req.body.prenom,
    nom: req.body.nom,
    tel: req.body.tel,
    email: req.body.email,
  };
  clients.push(newClient);
  res
    .status(201)
    .json({ message: "Client ajouté avec succès", client: newClient });
});

app.put("/client/:id", (req, res) => {
  const clientId = parseInt(req.params.id);
  const client = clients.find((client) => client.id === clientId);
  if (client) {
    client.prenom = req.body.prenom;
    client.nom = req.body.nom;
    client.tel = req.body.tel;
    client.email = req.body.email; // Add this line to update the email
    res.json({ message: "Client mis à jour avec succès", client });
  } else {
    res.status(404).json({ error: "Client non trouvé" });
  }
});

let reservations = [
  {
    id: 1,
    soin: "Massage",
    date: "2024-11-01",
    specialisteId: 1,
    clientId: 2,
  },
];

app.get("/reservations", (req, res) => {
  const reservationsReferences = reservations.map(
    (reservation) => `/reservation/${reservation.id}`
  );
  res.json(reservationsReferences);
});
//Afficher une reservation
app.get("/reservation/:id", (req, res) => {
  const reservationId = parseInt(req.params.id);
  const reservation = reservations.find(
    (reservation) => reservation.id === reservationId
  );
  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).json({ error: "Reservation non trouvée" });
  }
});

//Ajouter
app.post("/reservations", (req, res) => {
  const newReservations = {
    id: req.body.id,
    soin: req.body.soin,
    date: req.body.date,
    specialisteId: req.body.specialisteId,
    clientId: req.body.clientId,
  };

  reservations.push(newReservations);
  res.status(201).json({
    message: "Tâche ajoutée avec succès",
    reservation: newReservations,
  });
});

//Modification
app.put("/reservation/:id", (req, res) => {
  const reservationId = parseInt(req.params.id);
  const reservation = reservations.find(
    (reservation) => reservation.id === reservationId
  );
  if (reservation) {
    reservation.soin = req.body.soin;
    reservation.date = req.body.date;
    reservation.specialisteId = req.body.specialisteId;
    reservation.clientId = req.body.clientId;
    res.json({ message: "Reservation mise à jour avec succès", reservation });
  } else {
    res.status(404).json({ error: "Reservation non trouvée" });
  }
});

app.delete("/reservation/:id", (req, res) => {
  const reservationId = parseInt(req.params.id);
  const reservationIndex = reservations.findIndex(
    (reservation) => reservation.id === reservationId
  );

  if (reservationIndex !== -1) {
    const deletedReservation = reservations.splice(reservationIndex, 1);
    res.json({
      message: "Reservation supprimée avec succès",
      deletedReservation,
    });
  } else {
    res.status(404).json({ error: "Reservation non trouvée" });
  }
});

let specialistes = [
  { id: 1, nom: "Albert-Moisan", prenom: "Émilie" },
  { id: 2, nom: "Vachon", prenom: "Alexandre" },
  { id: 3, nom: "Saba", prenom: "Jean" },
];

//Route Get pour récupérer tout les spécialistes
app.get("/specialistes", (req, res) => {
  const specialisteReference = specialistes.map(
    (specialiste) => `/specialistes/${specialiste.id}`
  );
  res.json(specialisteReference);
});
//Route GET pour chercher un specialiste spécifique (id)
app.get("/specialiste/:id", (req, res) => {
  const specialisteId = parseInt(req.params.id);
  const specialiste = specialistes.find(
    (specialiste) => specialiste.id === specialisteId
  );
  if (specialiste) {
    res.json(specialiste);
  } else {
    res.status(404).json({ error: "Spécialiste non trouvée" });
  }
});

// Exporte l'application sans démarrer le serveur pour les tests
module.exports = app;
