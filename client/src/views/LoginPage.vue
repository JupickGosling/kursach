<template>
  <v-container>
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

                  <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required
                  ></v-select>

                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                  ></v-checkbox>
              
                  <v-btn
                    class="mr-4"
                    @click="submit"
                  >
                    submit
                  </v-btn>
                  <v-btn @click="reset">
                    clear
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
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
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
      },
    },
  }
</script>