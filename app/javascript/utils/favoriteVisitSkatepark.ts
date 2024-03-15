import { request } from '.';

type OptionType = 'favorite' | 'unfavorite' | 'visit' | 'unvisit';
export type FavoriteVisitOptions = {
  slug: string;
  type: OptionType;
  userId: number;
  onError?: () => void;
  onSuccess?: () => void;
};

export const favoriteVisitSkatepark = async ({
  slug,
  type,
  userId,
  onError,
  onSuccess,
}: FavoriteVisitOptions) => {
  await request(`/api/skateparks/${slug}/${type}`, {
    fetchOptions: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    },
    onError,
    onSuccess,
  });
};
