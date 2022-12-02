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
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>

                  <div>
                    <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required>
                  </v-checkbox>

                  <a href="/register">Зарегистрироваться?</a>
                  </div>
                  
                  <v-btn
                    color="success"
                    class="mr-4"
                    @click="submit"
                  >Login
                  </v-btn>
                  <v-btn @click="reset">
                    Clear
                  </v-btn>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      checkbox: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),
    methods: {
      submit () {
        this.$v.$touch()
      },
      reset () {
        this.$refs.form.reset()
      }
    },
  }
</script>