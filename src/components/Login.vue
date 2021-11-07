<template>
    <div class="login">
        <div class="login-container">
            <div class="container">
                <div class="desc">Welcome to 2Pointer6Acres</div>
                <el-card>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px">
                        <el-form-item prop="email" label="Email">
                            <el-input v-model="loginForm.name" placeholder="Email" ></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="Password">
                            <el-input type="password" placeholder="password" v-model="loginForm.password" ></el-input>
                        </el-form-item>
                        <div class="btns">
                            <el-button type="primary" style="flex: 2" @click="login">Login</el-button>
                        </div>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>

    <!-- <el-card class="box-card" style="width: 60%; margin: auto">
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
    </el-card> -->
    
</template>

<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: "Login",
        data: function () {
            return {
                email: "",
                password: "",
                loginForm: {
                    email: null,
                    password: null,
                },
                rules: {
                    email: [
                        { required: true, message: 'Please input your email', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please input your password', trigger: 'blur' }
                    ]
                }
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
            }
        }
    }
</script>

<style>
    .validate-code .el-form-item__content {
        display: flex;
        align-items: center;
        line-height: 0;
    }
</style>

<style scoped>
    .login {
        height: calc(100vh - 60px);
        display: flex;
        flex-direction: column;
    }
    .login-container {
        background: lightyellow;
        flex: 1;
    }
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 600px;
        max-width: 800px;
        margin: auto;
    }
    .el-card {
        width: 320px;
    }
    .code {
        margin: 0 5px 0 10px;
    }
    .s-canvas {
        overflow: hidden;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
    }
    .btns {
        display: flex;
    }
    .desc {
        font-size: 30px;
        letter-spacing: 1px;
    }
</style>
