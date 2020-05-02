<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "Category_Editing" | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id"
              >{{ c.title }}
            </option>
          </select>
          <label>{{ "Select_Category" | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{ "Category_Name" | localize }}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            {{ "Category_Enter_Name" | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">{{ "Category_limit" | localize }}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            {{ "Category_Minimum_Value" | localize }} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ "Category_Update" | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators'
import localizeFilter from "../filters/localize.filter";

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  name: 'CategoryEdit',
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId)
      this.title = title
      this.limit = limit
    },
  },
  created() {
    // eslint-disable-next-line no-empty-pattern
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const caregoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        }
        await this.$store.dispatch('updateCategory', caregoryData)
        this.$message(localizeFilter('Category_Updated_Successfully'))
        this.$emit('updated', caregoryData)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) this.select.destroy()
  },
}
</script>

<style scoped></style>
