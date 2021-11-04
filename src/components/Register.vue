<template>
    <el-card class="box-card" style="width: 60%; margin: auto">
        <div slot="header" style="text-align: center;" class="clearfix">
            Register
        </div>
        <div>
            <el-row>
                <el-col :span="8">Username</el-col>
                <el-col :span="16"><el-input placeholder="username" v-model="username"></el-input></el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="8">Email</el-col>
                <el-col :span="16"><el-input placeholder="email" v-model="email" type="email"></el-input></el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="8">Password</el-col>
                <el-col :span="16"><el-input placeholder="password" type="password" v-model="password"></el-input></el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="8">Repeat Password</el-col>
                <el-col :span="16"><el-input placeholder="repeat password" type="password" v-model="repeatPassword"></el-input></el-col>
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
        name: "Register",
        data: function () {
            return {
                username: "",
                email: "",
                password: "",
                repeatPassword: ""
            }
        },
        methods: {
            submitUserRegister() {
                // TODO: implement this function
                // let loginUrl = configJson.endpoint + '/api/v1/authentication/login?' + 'username=' + this.username + '&password=' + this.password
                let registerUrl = ""
                axios({
                    method: 'post',
                    url: registerUrl
                }).then(this.registerSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            registerSuccess(res) {
                console.log(res)
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
