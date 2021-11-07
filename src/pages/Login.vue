<template>
    <el-card class="box-card" style="width: 60%; margin: auto">
       <div slot="header" style="text-align: center;" class="clearfix">
           User Login
       </div>
        <div>
            <el-row>
                <el-col :span="8">Email</el-col>
                <el-col :span="16"><el-input placeholder="email" v-model="email"></el-input></el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="8">Password</el-col>
                <el-col :span="16"><el-input placeholder="password" type="password" v-model="password"></el-input></el-col>
            </el-row>
        </div>
        <div style="margin-top: 20px;">
            <el-button @click="this.submitUserRegister">Submit</el-button>
        </div>
    </el-card>
</template>

<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: "Login",
        data: function () {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            submitUserRegister() {
                let loginUrl = configJson.endpoint + '/api/v1/authentication/login?' + 'email=' + this.email + '&password=' + this.password
                axios({
                    method: 'post',
                    url: loginUrl,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        email: this.email,
                        password: this.password
                    }
                }).then(this.loginSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            loginSuccess(res) {
                console.log(res.data)
                this.$notify({
                    title: 'Login Success',
                    message: 'Hello, ' + res.data.username,
                    type: 'success'
                })
                // set state in vuex
                this.$store.commit('setIsLoggedIn', true)
                this.$store.commit('setUsername', res.data.username)
                this.$store.commit('setUserId', res.data.id)
            }
        }
    }
</script>

<style scoped>
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>
