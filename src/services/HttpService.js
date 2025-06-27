import axios from 'axios';

class HttpService {
  async insertMemo(item) {
    console.log('insertMemo - item:', item);
  }

  async selectMemo(params) {
    console.log('selectMemo - params:', params);
  }

  async selectMemoDetail(id) {
    console.log('selectMemoDetail - id:', id);
  }

  async updateMemo(item) {
    console.log('updateMemo - item:', item);
  }

  async deleteMemo(params) {
    console.log('deleteMemo - params:', params);
  }
}

export default new HttpService();