const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

async function getS3VideoKeys({ NextContinuationToken } = {}) {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const result = await client.send(
    new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
      ContinuationToken: NextContinuationToken,
    })
  );

  const list = result.Contents.map((item) => item.Key).filter((key) => {
    const isDash = key.match(/\.mpd/g);
    const isMp4 = key.match(/FileGroup1\/.*\.mp4/g);
    const isHsl = key.match(/\.m3u8/g) && !key.match(/\..*Mbps_qvbr\./);

    return isDash || isMp4 || isHsl;
  });

  if (result.NextContinuationToken) {
    return list.concat(...(await getS3VideoKeys(result)));
  }

  return list;
}

const toMovieRecord = (v) => {
  const [guid, type, file] = v.split('/');

  const data = {
    guid,
  };

  // Use the name from the dash format
  if (type === 'DASHISO1') {
    data.name = file.replace(/\.[^/.]+$/, '');
    data.DASH_URL = process.env.AWS_CLOUDFRONT_URL + v;
  } else if (type === 'AppleHLS1') {
    data.HLS_URL = process.env.AWS_CLOUDFRONT_URL + v;
  } else if (type === 'FileGroup1') {
    data.MP4_URL = process.env.AWS_CLOUDFRONT_URL + v;
  } else {
    return null;
  }
  return data;
};

const duplicatesByGuid = (acc, curr) => {
  acc[curr.guid] = {
    ...acc[curr.guid],
    ...curr,
  };

  return acc;
};

module.exports = {
  getS3VideoKeys,
  toMovieRecord,
  duplicatesByGuid,
};
