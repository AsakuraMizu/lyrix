import ky from 'ky';
import { decode } from 'js-base64';
import type { Entry, Provider } from './interface';

interface SearchResult {
  data: {
    info: Array<{
      songname: string;
      singername: string;
      hash: string;
    }>;
  };
}

interface KrcResult {
  candidates: Array<{
    id: string;
    accesskey: string;
    duration: number;
  }>;
}

interface LyricsResult {
  content: string;
}

export default class KugouProvider implements Provider {
  name = '酷狗';

  async *search(keyword: string): AsyncGenerator<Entry> {
    let page = 1;
    let finished = false;
    while (!finished) {
      const result = await ky('http://mobilecdn.kugou.com/api/v3/search/song', {
        searchParams: {
          format: 'json',
          keyword: keyword,
          page,
          pagesize: 30,
        },
      }).json<SearchResult>();
      if (result.data.info.length === 0) {
        finished = true;
      } else {
        for (const e of result.data.info) {
          yield {
            name: e.songname,
            artist: e.singername,
            $ref: e.hash,
          };
        }
        ++page;
      }
    }
  }

  async getLrc($ref: string): Promise<string> {
    const result1 = await ky('http://krcs.kugou.com/search', {
      searchParams: {
        hash: $ref,
      },
    }).json<KrcResult>();
    const { id, accesskey } = result1.candidates[0];
    const result2 = await ky('http://lyrics.kugou.com/download', {
      searchParams: {
        fmt: 'lrc',
        ver: 1,
        id,
        accesskey,
      },
    }).json<LyricsResult>();
    return decode(result2.content);
  }
}
