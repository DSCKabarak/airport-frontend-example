const express = require("express");
const app = express();
const axios = require("axios");

const client = axios.create();

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", function(req, res) {
  client.get('https://airport-flask-backend.walterbanda.repl.co')
  res.render("login", { invalid: undefined });
});

app.post("/login", function(req, res) {
  client
    .post("https://airport-flask-backend.walterbanda.repl.co/login", {
      username: req.body.username,
      password: req.body.password,
    })
    .then(function(response) {
      res.redirect("/");
    })
    .catch(function(error) {
      res.render("login", {
        invalid: `${error.response.data?.message ?? "Error Occurred"}`,
      });
    });
});

app.get("/airport", function(req, res) {
  client
    .get("https://airport-flask-backend.walterbanda.repl.co/airports")
    .then(function(response) {
      res.render("airport", { airports: response.data });
    })
    .catch(function(error) {
      res.render("airport", { airports: [] });
    });
});

app.post("/airport", function(req, res) {
  client
    .post("https://airport-flask-backend.walterbanda.repl.co/airports", {
      airportcode: req.body.airportcode,
      airportname: req.body.airportname,
      country: req.body.country,
    })
    .then(function(response) {
      res.redirect("airport");
    })
    .catch(function(error) {
      res.redirect("airport");
    });
});

app.get("/airport/id/:slug", function(req, res) {
  client
    .get(`https://airport-flask-backend.walterbanda.repl.co/airport/${req.params.slug}`)
    .then(function(response) {
      res.render("airport-id", { airport: response.data });
    })
    .catch(function(error) {
      res.redirect("/");
    });
});

app.post("/airport/update/:slug", function(req, res) {
  console.log(req.body, req.params.slug);
  client
    .put(`https://airport-flask-backend.walterbanda.repl.co/airport/${req.params.slug}`, {
      airportcode: req.body.airportcode,
      airportname: req.body.airportname,
      country: req.body.country,
    })
    .then(function(response) {
      res.redirect("/airport");
    })
    .catch(function(error) {
      res.redirect("/airport");
    });
});

app.post("/airport/delete/:slug", function(req, res) {
  client
    .delete(`https://airport-flask-backend.walterbanda.repl.co/airport/${req.params.slug}`)
    .then(function(response) {
      res.redirect("/airport");
    })
    .catch(function(error) {
      res.redirect("/airport");
    });
});

app.get("/plane", function(req, res) {
  client
    .get("https://airport-flask-backend.walterbanda.repl.co/planes")
    .then(function(response) {
      res.render("plane", { planes: response.data });
    })
    .catch(function(error) {
      res.render("plane", { planes: [] });
    });
});

app.post("/plane", function(req, res) {
  client
    .post("https://airport-flask-backend.walterbanda.repl.co/planes", {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      capacity: req.body.capacity,
    })
    .then(function(response) {
      res.redirect("/plane");
    })
    .catch(function(error) {
      res.redirect("/plane");
    });
});

app.get("/plane/id/:slug", function(req, res) {
  client
    .get(`https://airport-flask-backend.walterbanda.repl.co/plane/${req.params.slug}`)
    .then(function(response) {
      res.render("plane-id", { plane: response.data });
    })
    .catch(function(error) {
      res.redirect("/plane");
    });
});

app.post("/plane/update/:slug", function(req, res) {
  console.log(req.body, req.params.slug);
  client
    .put(`https://airport-flask-backend.walterbanda.repl.co/plane/${req.params.slug}`, {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      capacity: req.body.capacity,
    })
    .then(function(response) {
      res.redirect("/plane");
    })
    .catch(function(error) {
      res.redirect("/plane");
    });
});

app.post("/plane/delete/:slug", function(req, res) {
  client
    .delete(`https://airport-flask-backend.walterbanda.repl.co/plane/${req.params.slug}`)
    .then(function(response) {
      res.redirect("/plane");
    })
    .catch(function(error) {
      res.redirect("/plane");
    });
});

app.post("/flight", function(req, res) {
  console.log(req.body);
  client
    .post("https://airport-flask-backend.walterbanda.repl.co/flights", {
      plane_id: req.body.plane_id,
      airportfrom_id: req.body.airportfrom_id,
      airportto_id: req.body.airportto_id,
      date: req.body.date,
    })
    .then(function(response) {
      res.redirect("/flight");
    })
    .catch(function(error) {
      res.redirect("/flight");
    });
});

app.get("/flight", async function(req, res) {
  try {
    const getPlanes = await client.get("https://airport-flask-backend.walterbanda.repl.co/planes");
    const getAirports = await client.get("https://airport-flask-backend.walterbanda.repl.co/airports");
    const getFlights = await client.get("https://airport-flask-backend.walterbanda.repl.co/flights");

    res.render("flight", {
      flights: getFlights.data,
      planes: getPlanes.data,
      airports: getAirports.data,
    });
  } catch (error) {
    res.render("flight", { flights: [], planes: [], airports: [] });
  }
});

app.post("/flight/delete/:slug", function(req, res) {
  client
    .delete(`https://airport-flask-backend.walterbanda.repl.co/flight/${req.params.slug}`)
    .then(function(response) {
      res.redirect("/flight");
    })
    .catch(function(error) {
      res.redirect("/flight");
    });
});

app.get("/", function(req, res) {
  res.redirect("airport");
});

app.listen(3000, function() {
  console.log("Server Started 🚀");
});
