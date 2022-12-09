<template>
    <v-container>
        <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
            {{this.$route.params.message}}
          </v-alert>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4 mx-auto"> 
                <v-card class="pa-2">
                    <v-img :src="`/${post.image}`"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="2">
                                <v-btn small outlined colors="primary">{{post.category}}</v-btn>
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <v-btn color="success" text :to="{name: 'edit-post',params:{id:post._id}}">Edit</v-btn>
                                <v-btn color="red" text @click="removePost(post._id)">Delete</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h3>{{post.title}}</h3>
                    </v-card-subtitle>
                    <v-card-text class="grey--text">
                        <p>{{post.content}}</p>
                        <p>{{post.created}}</p>
                    </v-card-text>
                    <v-divider/>
                    <v-card-subtitle class="headline">
                        <h3>Комментарии(№)</h3>
                    </v-card-subtitle>
                    <v-textarea v-model="com.content"
                        label="Комментарий"
                        auto-grow
                        outlined
                        rows="3"
                        row-height="25"
                        shaped
                    />
                    <div style="height: 40px; margin: 5px;">
                        <v-btn depresse
                        v-bind="attrs"
                        v-on="on" @click="addPost(post._id), snackbar = true">Отправить</v-btn>
                    </div>
                    <v-divider/>
                </v-card>
                <v-col sm="10" class="pa-4 mx-auto" v-for="comment in comments" :key="comment._id">
                    <v-card class="pa-2">
                      <v-card-title class="headline">
                        {{comment.name}}
                      </v-card-title>
                      <v-card-text class="py-0">
                        <p1>{{comment.content}}</p1>
                      </v-card-text>
                      <v-card-text class="py-0">
                        <p1>{{comment.created}}</p1>
                      </v-card-text>
                      </v-card> 
                </v-col>
            </v-col>
        </v-row>
        <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </v-container>
</template>

<script>
import API from "../api";
import COM from "../com";
    export default {
        data(){
            
            return{
                snackbar: false,
                text: `Hello, I'm a snackbar`,
                timeout: 2000,
                post: {},
                comments: [],
                com:{
                    name: "User",
                    page_id: "Null",
                    content: ""
                },
            }
        },
        async created(){
            const response = await API.getPostByID(this.$route.params.id);
            this.post = response;
            this.comments = await COM.getAllComment();
        },
        methods:{
            async removePost(id){
                const response = await API.delPost(id);
                this.$router.push({ name: 'home', params: {message: response.message} });
            },
            async addPost(id){
                const content = this.com.content;
                // const fs = new FormData();
                // fs.append('content', this.com.content);
                const response = await COM.addCom(id,content);
                this.$router.push({ name: 'home', params: {message: response.message} });
            },
        }
    }
</script>