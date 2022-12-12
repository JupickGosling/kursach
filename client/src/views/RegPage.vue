<template>
    <v-container>
      <v-row no-gutters>
          <v-col sm="10" class="mx-auto">
              <v-card class="pa-5">
                  <v-card-title>Sign Up</v-card-title>
                  <v-divider></v-divider>
                  <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                    <!-- v-snackbar -->
                    <v-text-field
                        v-model="user.login"
                        :counter="25"
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
 
                    <a href="/login">Уже есть аккаунт?</a>
                    <div>
                      <v-btn type="sumbit" class="mr-4" color="success">Register</v-btn>
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
      // register: function () {
      //   let data = {
      //     login: this.user.login,
      //     password: this.user.password
      //   }
      //   this.$store.dispatch('register', data)
      //  .then(() => this.$router.push('/'))
      //  .catch(err => console.log(err))
      // },
      async submitForm () {
        const fd = new FormData();
        fd.append('email', this.user.email);
        fd.append('password', this.user.password);
        if(this.$refs.form.validate()){
          const response = await AUTH.createUser(fd);
          this.$router.push({ name: 'login', params: {message: response.message} });
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