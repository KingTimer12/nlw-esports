import express from "express";
import { PrismaClient } from "@prisma/client";
import { convertMinutesToString, convertStringToMinutes } from "./utils/convertString";

import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

const prisma = new PrismaClient();

/**
 *
 * Query: localhost:3333/ads?page=2
 * Route: localhost:3333/ads/5
 * Body: Envio de muitas informações
 *
 */

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games);
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  //Validação

  const ads = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      discord: body.discord,
      hourEnd: convertStringToMinutes(body.hourEnd),
      hourStart: convertStringToMinutes(body.hourStart),
      useVoiceChannel: body.useVoiceChannel,
      weekDays: body.weekDays.join(','),
      yearsPlaying: body.yearsPlaying,
    }
  })

  return response.status(201).json(ads);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      createdAt: true,
      gameId: true,
      hourStart: true,
      hourEnd: true,
      name: true,
      useVoiceChannel: true,
      weekDays: true,
      yearsPlaying: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToString(ad.hourStart),
        hourEnd: convertMinutesToString(ad.hourEnd)
      };
    })
  );
});

app.get("/ads/:id/discord", async (request, response) => {
  const id = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id,
    },
  });

  return response.json({
    discord: ad.discord,
  });
});

app.listen(3333);
