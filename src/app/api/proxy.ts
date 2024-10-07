import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, url, params } = req.body;

  try {
    const response = await axios.request({
      method,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      params,
      headers: {
        'User-Agent': 'Mangaice/1.0',
      },
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || 'Something went wrong');
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json('Unexpected error');
    }
  }
}
