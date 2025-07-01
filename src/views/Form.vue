<script setup>
  import { reactive, onMounted, useTemplateRef } from 'vue';
  import httpService from '@/services/HttpService';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter(); // 주소 이동(라우터 처리)
  const route = useRoute(); // PathVariable 데이터 가져오기 위한 용도

  const state = reactive({
    memo: {
      memoId: 0,
      title: '',
      ctnts: '',
      createdAt: ''
    }
  });

  onMounted(() => {
    if (route.params.memoId) {
      findById();
    }
  });

  const findById = async () => {
    const data = await httpService.selectMemoDetail(route.params.memoId);
    state.memo = data.resultData;
  }

  const refTitle = useTemplateRef('ref_title');
  const refCtnts = useTemplateRef('ref_ctnts');

  const submit = async () => {
    // 간단한 validation (유효성 검사)
    // 제목에 내용이 없다면 alert('제목을 작성해 주세요.')
    // 내용에 내용이 없다면 alert('내용을 작성해 주세요.');
    if (state.memo.title.trim().length === 0) {
      alert('제목을 작성해 주세요.');
      refTitle.value.focus();
      return;
    } else if (state.memo.title.trim().length > 20) {
      alert('제목은 20자 이내로 작성해 주세요.');
      refTitle.value.focus();
      return;
    } else if (state.memo.ctnts.trim().length === 0) {
      alert('내용을 작성해 주세요.');
      refCtnts.value.focus();
      return;
    } else if (state.memo.ctnts.trim().length > 200) {
      alert('내용은 200자 이내로 작성해 주세요.');
      refCtnts.value.focus();
      return;
    }

    let data = null;
    const bodyJson = {
      title: state.memo.title,
      ctnts: state.memo.ctnts
    };
    if (route.params.memoId) {
      // 수정 처리
      bodyJson.memoId = state.memo.memoId;
      data = await httpService.updateMemo(bodyJson);
    } else {
      // 등록 처리
      data = await httpService.insertMemo(bodyJson);
    }
    
    if (data.resultData === 1) {
      // 등록 및 수정 성공, 홈 화면으로 라우터 처리
      router.push({ path: '/' });
    } else {
      // 등록 및 수정 실패
      alert(data.resultMessage);
    }
  };
</script>

<template>
  <h1>Form.vue</h1>
  <form class="detail" @submit.prevent="submit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" id="title" ref="ref_title" class="form-control p-3" v-model="state.memo.title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea id="content" ref="ref_ctnts" class="form-control p-3" v-model="state.memo.ctnts"></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">저장</button>
  </form>
</template>

<style lang="scss" scoped>

</style>
