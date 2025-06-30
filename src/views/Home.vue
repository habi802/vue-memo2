<script setup>
  import { reactive, onMounted } from 'vue';
  import httpService from '@/services/HttpService';
  import MemoCard from '@/components/MemoCard.vue';

  const state = reactive({
    memos: []
  });

  onMounted(() => {
    getItems({});
  });

  const getItems = async param => {
    const data = await httpService.selectMemo(param);
    state.memos = data.resultData;
    console.log('state.memos:', state.memos);
  };
  
  const removeItem = async (id) => {
    console.log('removeItem:', id);

    if (confirm('삭제하시겠습니까?')) {
      console.log('그래, 삭제하겠네.');
      const params = { memo_id: id };
      const data = await httpService.deleteMemo(params);
      if (data.resultData === 1) {
        //getItems({});
        const deleteIdx = state.memos.findIndex(item => item.id === id);
        if (deleteIdx >= 0) {
          state.memos.splice(deleteIdx, 1);
        }
      }
    }
  }
</script>

<template>
  <h1>Home.vue</h1>
  <div class="memo-list">
    <router-link to="/add" class="add btn btn-light">
      + 추가하기
    </router-link>

    <MemoCard v-for="m in state.memos" :item="m" :key="m.id" @delete-item="removeItem" />
  </div>
</template>

<style lang="scss" scoped>
  // .memo-list {
  //   .item {
  //     background-color: #f8f9fa;
  //     border: 1px solid #eee;
  //     display: block;
  //     color: #000;
  //     text-decoration: none;
  //     padding: 20px 30px;
  //     margin: 15px 0;

  //     &:hover {
  //       border-color: #aaa;
  //     }
  //   }
  // }

  .add {
    display: block;
    padding: 25px;
    border: 1px solid #eee;
  }
</style>
