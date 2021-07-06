/* eslint-disable @typescript-eslint/no-unsafe-member-access */

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

const getImageURL = async (
  kittensNumber: number
): Promise<KittenImageResponse[]> => {
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

const getName = async (
  kittensNumber: number
): Promise<KittenNameResponse[]> => {
  axios.defaults.headers.common['x-api-key'] = 'uVxfqCsg';

  const response = await axios.get(
    'https://fakercloud.com/api/v1/schema/lJxDtuC1',
    { params: { rows: kittensNumber, format: 'json' } }
  );

  const nameKittens = response.data.rows as KittenNameResponse[];

  return nameKittens;
};

interface KittyInterface {
  counter: number;
  name?: string | 'Foo kitten';
  url: string | 'cat.gif';
}

const generateKittens = async (
  kittensNumber = 1
): Promise<KittyInterface[]> => {
  const responses = await Promise.allSettled([
    getImageURL(kittensNumber),
    getName(kittensNumber),
  ]);

  const imageURLResponse = responses[0];
  const imageURLHasResponse =
    imageURLResponse.status === 'fulfilled' && imageURLResponse.value;

  const nameResponse = responses[1];
  const nameHasResponse =
    nameResponse.status === 'fulfilled' && nameResponse.value;

  return Array.from({ length: kittensNumber }, (_, index) => ({
    counter: 0,
    name: nameHasResponse
      ? (nameResponse.value[index].name as string)
      : 'Foo kitten',
    url: imageURLHasResponse
      ? (imageURLResponse.value[index].url as string)
      : 'cat.gif',
  }));
};

export { generateKittens, KittyInterface };
