import axios from 'axios';
import { GifsJSON } from 'src/typings';

//
// Commented to comply with the imposed requirement of not uploading the JSON
// with the data.
//
/* import gifsJSON from 'app/public/gifs.json';

const gifs: GifsJSON[] = gifsJSON.data;

const numberGIFs = gifs.length; */

const gifs: GifsJSON[] = [];

const numberGIFs = 25;

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

const getImageURLPromise = async (): Promise<KittenImageResponse[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common['x-api-key'] =
    '6559f77b-4bda-4225-a8cb-a008a2c446e9';

  const response = await axios.get(
    'https://api.thecatapi.com/v1/images/search',
    { params: { limit: numberGIFs, size: 'full', mime_types: 'gif' } }
  );

  const imagesKittens = response.data as KittenImageResponse[];

  return imagesKittens;
};

interface GIFInterface {
  url: string | 'cat.gif';
  title: string | 'Foo GIF';
}

const generateGIFs = async (): Promise<GIFInterface[]> => {
  const responses = await Promise.allSettled([getImageURLPromise()]);

  const imageURLResponse = responses[0];
  const imageURLHasResponse = !!(
    imageURLResponse.status === 'fulfilled' && imageURLResponse.value
  );
  const getImageURL = (
    index: number,
    imageURLHasResponse: boolean,
    imageURLResponse: PromiseSettledResult<KittenImageResponse[]>
  ) =>
    imageURLHasResponse
      ? (imageURLResponse as PromiseFulfilledResult<KittenImageResponse[]>)
          .value[index].url
      : 'cat.gif';

  const titleHasResponse = !!gifs.length;
  const getTitle = (index: number, titleHasResponse: boolean) =>
    titleHasResponse ? gifs[index].title : 'Foo GIF';

  return Array.from({ length: numberGIFs }, (_, index) => ({
    title: getTitle(index, titleHasResponse),
    url: getImageURL(index, imageURLHasResponse, imageURLResponse),
  }));
};

export { generateGIFs, GIFInterface };
