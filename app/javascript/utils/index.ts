export const titleize = (str: string) => {
  return str.replace(new RegExp('(?:\\b|_)([a-z])', 'g'), function (char) {
    return char.toUpperCase();
  });
};

export const findMatchIndices = (str: string, searchStr: string) => {
  const regex = new RegExp(searchStr, 'gi');
  const matches = str.matchAll(regex);
  const indices = [];
  for (const match of matches) {
    if (match.index !== undefined) {
      indices.push(match.index);
    }
  }

  return indices;
};

type RequestOptions = {
  fetchOptions?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (arg: any) => void;
  onError?: (error: string) => void;
};

export const request = async (url: string, options?: RequestOptions) => {
  try {
    const response = await fetch(url, options?.fetchOptions);
    let responseJson;

    if (response.ok) {
      responseJson = await response.json();
      options?.onSuccess?.(responseJson);

      return responseJson;
    } else {
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        responseJson = await response.json();
        throw responseJson.message;
      } else {
        throw response.statusText;
      }
    }
  } catch (error) {
    options?.onError?.(error as string);
  }
};
