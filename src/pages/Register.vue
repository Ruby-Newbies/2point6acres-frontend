<template>
    <div class="register">
        <div class="register-container">
            <div class="container">
                <el-card>
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item prop="username" label="Username">
                            <el-input v-model="form.username" placeholder="Input your user name"></el-input>
                        </el-form-item>
                         <el-form-item prop="email" label="Email">
                            <el-input v-model="form.email" placeholder="Input your education email"></el-input>
                        </el-form-item>
                        <el-form-item prop="pass" label="Password">
                            <el-input v-model="form.pass" type="password" placeholder="Input your password"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkPass" label="Check">
                            <el-input v-model="form.checkPass" type="password" placeholder="Input again for your password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div class="btns">
                                <el-button type="primary" @click="onSubmit('form')" style="flex: 2">Register</el-button>
                                <el-button @click="onCancel()" style="flex: 1">Already registered?</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
                <div class="desc">2Point6Acres User Registration</div>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: "Register",
        data: function () {
            var validatePass = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('Input password'));
                } else {
                    if(this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
		    };
            var validatePass2 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('Input password agian'));
                } else if (value !== this.form.pass) {
                    callback(new Error('Passwords are not same'));
                } else {
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
                const emailReg = /^[a-z0-9A-Z]+([-|_|\.]+[a-z0-9A-Z]+)*@([a-z0-9A-Z]+[-|\.])+edu$/
                if (value === '') {
                    callback(new Error('Input your educational email'));
                } else if (!emailReg.test(this.form.email)){
                    callback(new Error('Please input correct educational email'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    username: '',				
                    pass: '',
                    checkPass: '',
                    email: '',
                },

                rules: {
                    username: [
                        { required: true, message: 'Please input your username', trigger: 'blur' }
                    ],
                    pass: [
					{ required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
					{ required: true,validator: validatePass2, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, validator: validateEmail, trigger: 'blur' }
                    ],
                }
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
            },
            onCancel() {
			    this.$router.push({ name: 'Login' });
		    },
        }
    }
</script>

<style lang="scss" scoped>

    .register {
        height: calc(100vh - 60px);
        display: flex;
        flex-direction: column;
    }
    .register-container {
        background:lightcoral;
        flex: 1;
    }
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 700px;
        max-width: 1100px;
        margin: auto;
    }

	.el-card {
		width: 500px;
		padding-top: 40px;
	}
	.btns {
		display: flex;
		width: 60%;
	}
	.desc {
		font-size: 30px;
		letter-spacing: 1px;
		color: white;
	}
</style>
