const path = __dirname + '/../.env.local';
require('dotenv').config({ path });
const axios = require('axios');
const fs = require('fs');
const {
  duplicatesByGuid,
  toMovieRecord,
  getS3VideoKeys,
} = require('./s3-utils');
const {
  Do,
  Let,
  Client,
  Select,
  Collection,
  Update,
  Ref,
  Create,
  Var,
  Match,
  Paginate,
  If,
  Exists,
  Index,
} = require('faunadb');

function CreateOrUpdateMovie(data) {
  return Let(
    {
      guid: data.guid,
      match: Match(Index('unique_Movie_guid'), Var('guid')),
    },
    If(
      Exists(Var('match')),
      Update(Select(['data', 0], Paginate(Var('match'))), { data }),
      Create(Collection('Movie'), { data })
    )
  );
}

async function importSchema(override) {
  const file = fs.readFileSync(__dirname + '/schema.graphql');

  try {
    let url =
      'https://graphql.fauna.com/import' + (override ? '?mode=override' : '');
    console.log(url);
    await axios.post(url, file, {
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
        'Content-Type': 'application/octet-stream',
      },
    });
  } catch (e) {
    if (e.response) {
      throw { status: e.response.status, data: e.response.data };
    }
    throw e;
  }
}

const args = process.argv.slice(2);

async function init() {
  const override = args[0] === '--override';

  const FaunaClient = new Client({ secret: process.env.FAUNA_SERVER_KEY });
  await importSchema(override);

  if (override) {
    const data = await getS3VideoKeys();
    const records = Object.values(
      data.map(toMovieRecord).reduce(duplicatesByGuid, {})
    );

    await FaunaClient.query(Do(...records.map((r) => CreateOrUpdateMovie(r))));
  }
}

init()
  .then(() => {
    process.exit();
  })
  .catch((e) => {
    console.warn(e);
  });
