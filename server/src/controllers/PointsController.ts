/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const insertedId = await trx('points').insert({
      image: 'fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });

    const pointIems = items.map((itemId: number) => {
      return {
        item_id: itemId,
        point_id: insertedId[0],
      };
    });

    await trx('point_items').insert(pointIems);

    return res.json({ ok: 'ok' });
  }
}

export default new PointsController();
