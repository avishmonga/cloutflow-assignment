import axios from './axios';
export class InfluencerApi {
  static async getInfluencers() {
    const response = await axios.get(
      'https://mocki.io/v1/a7df28fe-95fe-4998-8cea-722cf433aff8'
    );
    return response.data;
  }
}
