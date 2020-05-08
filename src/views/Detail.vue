<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ "Detail_History" | localize }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? consumption : income }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>{{ "Detail_The_Amount" | localize }}: {{ record.description }}</p>
              <p>{{ "Detail_Description" | localize }}: {{ record.amount | currency }}</p>
              <p>{{ "Detail_Category" | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{ "Record_With" | localize }} id={{ $route.params.id }} {{ "Not_Found" | localize }}</p>
  </div>
</template>

<script>
  import localizeFilter from "../filters/localize.filter";
export default {
  name: 'DetailRecord',
  metaInfo() {
    return {
      title: this.$title('Detail_Title')
    }
  },
  data: () => ({
    consumption: localizeFilter('History_Consumption'),
    income: localizeFilter('History_Income'),
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    // eslint-disable-next-line no-unused-vars
    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    )

    this.record = {
      ...record,
      categoryName: category.title,
    }

    this.loading = false
  },
}
</script>

<style scoped></style>
