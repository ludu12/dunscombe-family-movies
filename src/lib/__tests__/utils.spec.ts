import { formatSeconds, sortByDiscNumber } from '../utils';

const mapToMovie = (name) => ({ name });

test('sortByDiscNumber', () => {
  const discNames = [
    'Disc1_one',
    'Disc10_ten',
    'Disc2_two',
    'Disc23_twentythree',
    'Disc13_thirteen',
    'Disc4_four',
  ];

  const sorted = discNames.map(mapToMovie).sort(sortByDiscNumber);
  expect(sorted).toEqual(
    [
      'Disc1_one',
      'Disc2_two',
      'Disc4_four',
      'Disc10_ten',
      'Disc13_thirteen',
      'Disc23_twentythree',
    ].map(mapToMovie)
  );
});

test('formatSeconds', () => {
  expect(formatSeconds(537.716223)).toEqual('00:08:57');
  expect(formatSeconds(0)).toEqual('00:00:00');
  expect(formatSeconds(11234)).toEqual('03:07:14');
});
