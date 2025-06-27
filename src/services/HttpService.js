import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService {
  constructor() {
    console.log('HttpService 객체 생성');
  }

  async insertMemo(item) {
    console.log('insertMemo - item:', item);
  }

  async selectMemo(params) {
    // get 메소드 호출 시, 2번째 인자는 객체를 보내고
    // 객체의 param 속성에 객체를 보내면 자동으로 쿼리스트링으로 변환해준다.
    console.log('selectMemo - params:', params);
    const res = await axios.get('/memo', { params });
    console.log('selectMemo - res.data:', res.data);
    return res.data;
  }

  async selectMemoDetail(id) {
    console.log('selectMemoDetail - id:', id);
  }

  async updateMemo(item) {
    console.log('updateMemo - item:', item);
  }

  async deleteMemo(params) {
    console.log('deleteMemo - params:', params);
    const res = await axios.delete('/memo', { params });
    return res.data;
  }
}

export default new HttpService();