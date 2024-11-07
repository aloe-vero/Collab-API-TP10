const request = require("supertest");
const app = require("./app"); // Import your Express app

// Initial reservations data
const initialReservations = [
  {
    id: 1,
    soin: "Massage",
    date: "2024-11-01",
    specialisteId: 1,
    clientId: 2,
  },
];

// Use this as the current state for reservations, resetting each time
let reservations;

beforeEach(() => {
  // Reset reservations to the initial state before each test
  reservations = [...initialReservations];
  app.locals.reservations = reservations; // Set reservations to a known state
});

describe("Client API Tests", () => {
  it("GET /clients - should return a list of client references", async () => {
    const response = await request(app).get("/clients");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(["/client/1", "/client/2", "/client/3"]);
  });

  it("GET /client/:id - should return details of a specific client", async () => {
    const response = await request(app).get("/client/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      prenom: "JEANNNNN",
      nom: "leGrand",
      tel: "123-456-7890",
      email: "jean@example.com",
    });
  });

  it("POST /clients - should create a new client", async () => {
    const newClient = {
      prenom: "Nouvel",
      nom: "Utilisateur",
      tel: "000-000-0000",
      email: "nouvel@example.com",
    };
    const response = await request(app).post("/clients").send(newClient);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Client ajouté avec succès");
    expect(response.body.client).toMatchObject(newClient);
  });

  it("PUT /client/:id - should update an existing client", async () => {
    const updatedClient = {
      prenom: "Jean",
      nom: "Doe",
      tel: "987-654-3210",
      email: "jean.doe@example.com",
    };
    const response = await request(app).put("/client/1").send(updatedClient);
    expect(response.status).toBe(200);
    expect(response.body.client).toMatchObject(updatedClient);
  });
});

describe("Reservation API Tests", () => {
  it("GET /reservations - should return a list of reservation references", async () => {
    const response = await request(app).get("/reservations");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(["/reservation/1"]);
  });

  it("GET /reservation/:id - should return details of a specific reservation", async () => {
    const response = await request(app).get("/reservation/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(initialReservations[0]);
  });

  it("POST /reservations - should create a new reservation", async () => {
    const newReservation = {
      id: 2,
      soin: "Consultation",
      date: "2024-11-02",
      specialisteId: 2,
      clientId: 3,
    };
    const response = await request(app)
      .post("/reservations")
      .send(newReservation);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Tâche ajoutée avec succès");
    expect(response.body.reservation).toMatchObject(newReservation);
  });

  it("PUT /reservation/:id - should update an existing reservation", async () => {
    const updatedReservation = {
      soin: "Consultation",
      date: "2024-11-03",
      specialisteId: 2,
      clientId: 3,
    };
    const response = await request(app)
      .put("/reservation/1")
      .send(updatedReservation);
    expect(response.status).toBe(200);
    expect(response.body.reservation).toMatchObject(updatedReservation);
  });

  it("DELETE /reservation/:id - should delete an existing reservation", async () => {
    const response = await request(app).delete("/reservation/1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Reservation supprimée avec succès");
    expect(response.body.deletedReservation[0]).toMatchObject({
      id: 1,
      soin: "Consultation",
      date: "2024-11-03",
      specialisteId: 2,
      clientId: 3,
    });
  });

  it("DELETE /reservation/:id - should return 404 if reservation does not exist", async () => {
    const response = await request(app).delete("/reservation/999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Reservation non trouvée" });
  });
});

describe("Specialistes API Tests", () => {
  it("GET /specialistes - should return list of specialist references", async () => {
    const response = await request(app).get("/specialistes");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      "/specialistes/1",
      "/specialistes/2",
      "/specialistes/3",
    ]);
  });

  it("GET /specialiste/:id - should return details of a specific specialist", async () => {
    const response = await request(app).get("/specialiste/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      nom: "Albert-Moisan",
      prenom: "Émilie",
    });
  });

  it("GET /specialiste/:id - should return 404 if specialist not found", async () => {
    const response = await request(app).get("/specialiste/999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Spécialiste non trouvée" });
  });
});
