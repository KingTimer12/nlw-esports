import express from "express";
const app = express();
//localhost:3333/ads
app.get("/ads", (request, response) => {
    return response.json([
        {
            id: 1,
            anuncio: "Anúncio 1",
        },
        { id: 2, anuncio: "Anúncio 2" },
        { id: 3, anuncio: "Anúncio 3" },
    ]);
});
app.listen(3333);
