<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ "Home_Accounting" | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">{{ "Email_Not_Empty" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="($v.email.$dirty && !$v.email.required)"
          >Поле Email не должно быть пустым</small
        >
        <small
          class="helper-text invalid"
          v-else-if="($v.email.$dirty && !$v.email.email)"
          >Введите коррентный Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">{{ "Password" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="($v.password.$dirty && !$v.password.required)"
        >
          {{ "Enter_Password" | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="($v.password.$dirty && !$v.password.minLength)"
        >
          {{ "Password_Must_Be" | localize }} {{ $v.password.$params.minLength.min }} символов.
          {{ "Password_Now_This" | localize }} {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">{{ "Name" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="($v.name.$dirty && !$v.name.required)"
        >
          {{ "Register_Enter_Your_Name" | localize }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{ "Register_Agree_Rules" | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ "Registration" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ "Register_Is_Account" | localize }}
        <router-link to="/login">{{ "Register_Enter" | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
