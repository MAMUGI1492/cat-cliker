import axios from 'axios';

interface KittenImageResponse {
  breed_ids?: null;
  breeds: unknown[];
  created_at?: string;
  height: number;
  id: string;
  original_filename?: string;
  sub_id?: string;
  url: string;
  width: number;
}

const getImageURLPromise = async (
  kittensNumber: number
): Promise<KittenImageResponse[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common['x-api-key'] =
    '6559f77b-4bda-4225-a8cb-a008a2c446e9';

  const response = await axios.get(
    'https://api.thecatapi.com/v1/images/search',
    { params: { limit: kittensNumber, size: 'full', mime_types: 'gif' } }
  );

  const imagesKittens = response.data as KittenImageResponse[];

  return imagesKittens;
};

interface KittenNameResponse {
  name: string;
}

const getNamePromise = async (
  kittensNumber: number
): Promise<KittenNameResponse[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common['x-api-key'] = 'uVxfqCsg';

  const response = await axios.get(
    'https://fakercloud.com/api/v1/schema/lJxDtuC1',
    { params: { rows: kittensNumber, format: 'json' } }
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const nameKittens = response.data.rows as KittenNameResponse[];

  return nameKittens;
};

const getImageURL = (
  index: number,
  imageURLResponse: PromiseSettledResult<KittenImageResponse[]>,
  imageURLHasResponse: boolean
) =>
  imageURLHasResponse
    ? (imageURLResponse as PromiseFulfilledResult<KittenImageResponse[]>).value[
        index
      ].url
    : 'cat.gif';

const getName = (
  index: number,
  nameResponse: PromiseSettledResult<KittenNameResponse[]>,
  nameHasResponse: boolean
) =>
  nameHasResponse
    ? (nameResponse as PromiseFulfilledResult<KittenNameResponse[]>).value[
        index
      ].name
    : 'Foo kitten';

const buildKitty = (name: string, url: string): KittyInterface => ({
  counter: 0,
  name,
  url,
});

interface KittyInterface {
  counter: number;
  name?: string | 'Foo kitten';
  url: string | 'cat.gif';
}

const generateKittens = async (
  kittensNumber = 1
): Promise<KittyInterface[]> => {
  const responses = await Promise.allSettled([
    getImageURLPromise(kittensNumber),
    getNamePromise(kittensNumber),
  ]);

  const imageURLResponse = responses[0];
  const imageURLHasResponse = !!(
    imageURLResponse.status === 'fulfilled' && imageURLResponse.value
  );

  const nameResponse = responses[1];
  const nameHasResponse = !!(
    nameResponse.status === 'fulfilled' && nameResponse.value
  );

  return Array.from({ length: kittensNumber }, (_, index) =>
    buildKitty(
      getName(index, nameResponse, nameHasResponse),
      getImageURL(index, imageURLResponse, imageURLHasResponse)
    )
  );
};

export { generateKittens, KittyInterface };
