<template>
  <v-container>
    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
      {{this.$route.params.message}}
    </v-alert>
    <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
            <v-card class="pa-5">
                <v-card-title>Sign In</v-card-title>
                <v-divider></v-divider>
                <v-form ref="form" @submit.prevent="login" class="pa-5" enctype="multipart/form-data">
                    
                  <v-text-field
                      v-model="user.login"
                      :rules="nameRules"
                      label="Login"
                      required
                  ></v-text-field>

                  <v-text-field 
                      v-model="user.password" 
                      :counter="(min,max)"
                      :rules="rules"
                      label="Password"
                      required
                  ></v-text-field>

                  <a href="/register">Зарегистрироваться?</a>
                  <div>
                    <v-btn type="sumbit" class="mr-4" color="success">Login</v-btn>
                    <v-btn @click="reset">clear</v-btn>
                  </div>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
var FormData = require('form-data');
import AUTH from '../auth';
export default{
  data(){
    return{
      user:{
        login: "",
        password: "",
      },
      max: 100,
      min: 8,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Login must be less than 25 characters',
      ],
    }
  },
  methods: {
    login: function () {
      let login = this.user.login 
      let password = this.user.password
      this.$store.dispatch('login', { login, password })
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
    },
    async submitForm () {
      const fd = new FormData();
      fd.append('email', this.user.email);
      fd.append('password', this.user.password);
      if(this.$refs.form.validate()){
        const response = await AUTH.fetchUser(fd);
        this.$router.push({ name: 'home', params: {message: response.message} });
      }
    },
    reset () {
      this.$refs.form.reset()
    },
  },
  computed: {
    rules () {
      const rules = []

      if (this.max) {
        const rule =
          v => (v || '').length <= this.max ||
            `A maximum of ${this.max} characters is allowed`

        rules.push(rule)
      }

      if (this.min) {
        const rule =
          v => (v || '').length >= this.min ||
            `A minimum of ${this.min} characters is allowed`

        rules.push(rule)
      }

      return rules
    },
  },
}
</script>