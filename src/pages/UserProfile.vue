<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>User Profile</span>
            </div>
            <el-divider></el-divider>
            <el-descriptions title="User Profile" class="el-desc">
                <el-descriptions-item label="Username"> {{ this.profile.username }} </el-descriptions-item>
                <el-descriptions-item label="Email"> {{ this.profile.email }} </el-descriptions-item>
            </el-descriptions>
            <el-divider></el-divider>
            <el-button
                    v-if="!isCurrentUser && !this.followed"
                    @click="followUser()"
                    type="primary">
                Follow
            </el-button>
            <el-button
                    v-if="!isCurrentUser && this.followed"
                    @click="unfollowUser()"
                    type="info">
                Unfollow
            </el-button>
            <el-button
                    @click="$router.push({name: 'Follower', params: {id: userId}})"
                    type="primary" plain>
                View Followers
            </el-button>
            <el-button
                    @click="$router.push({name: 'Following', params: {follower_id: userId}})"
                    type="primary" plain>
                View Followings
            </el-button>
            <el-button
                    v-if="!isCurrentUser"
                    type="primary"
                    @click="showDialog = true">
                Send Message
            </el-button>
            <el-divider></el-divider>
            <h3>My Articles</h3>
            <el-table :data="articles" style="width: 100%;">
                <el-table-column prop="title" min-width="250" label="Title"></el-table-column>
                <el-table-column prop="created_at" min-width="130" label="Create Time"></el-table-column>
                <el-table-column prop="updated_at" min-width="130" label="Update Time"></el-table-column>
                <el-table-column
                        fixed="right"
                        label="Operation"
                        width="150">
                    <template slot-scope="scope">
                        <el-button @click="clickView(scope.row.id)" type="text" size="small">View</el-button>
                        <el-button @click="clickEdit(scope.row.id)" type="text" size="small">Edit</el-button>
                        <el-button @click="clickDelete(scope.row.id)" type="text" size="small">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    layout="prev, pager, next"
                    :current-page="this.page"
                    @current-change="this.onPageChange"
                    :page-size="this.pageSize"
                    :total="this.total"
                    style="margin-top: 20px">
            </el-pagination>
            <el-button type="success" plain @click="this.clickNewArticle" style="margin-top: 18px">New Article</el-button>
        </el-card>
        <el-dialog
                title="Send Message"
                :visible.sync="this.showDialog"
                :before-close="this.closeDialog"
                width="30%">
            <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="Input your message to send here"
                    v-model="mail">
            </el-input>
            <span slot="footer">
            <el-button type="success" plain @click="this.sendMail">Send</el-button>
            <el-button type="danger" plain @click="this.closeDialog">Cancel</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: 'UserProfile',
        data: function () {
            return {
                userId: "",
                followed: false,
                profile: {
                    username: "username",
                    email: "email@columbia.edu",
                },
                articles: [{
                    id: 2,
                    title: "test-1",
                    created_at: 1,
                    updated_at: 2
                }],
                page: 1,
                pageSize: 5,
                total: 0,
                showDialog: false,
                mail: ""
            }
        },
        methods: {
            getUserProfile(userId) {
                axios.get(configJson.endpoint + '/api/v1/users/' + userId)
                    .then(this.getUserProfileSuccess)
                    .catch(this.errorHandler)
            },
            getUserProfileSuccess(res) {
                console.log(res)
                this.profile = res.data.user
                this.listArticlesOfUser()
            },
            listArticlesOfUser() {
                let userId = this.$store.state.userId
                let url = configJson.endpoint + '/api/v1/articles?page=' + (this.page - 1) + '&limit=' + this.pageSize
                    + '&author_id=' + userId
                axios.get(url)
                    .then(this.listArticlesOfUserSuccess)
                    .catch(this.errorHandler)
            },
            listArticlesOfUserSuccess(res) {
                console.log(res.data)
                this.articles = res.data.articles
                this.total = res.data.total
            },
            clickView(articleId) {
                this.$router.push('/articles/' + articleId)
            },
            clickEdit(articleId) {
                console.log('clicked on edit button for article ' + articleId)
                this.$router.push('/articles/edit/' + articleId)
            },
            clickDelete(articleId) {
                this.$confirm('Are you sure to delete this article?', 'Warning', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    axios.delete(configJson.endpoint + '/api/v1/articles/' + articleId)
                        .then(this.deleteArticleSuccess)
                        .catch(this.errorHandler)
                }).catch(() => {
                    this.$notify({
                        type: 'info',
                        message: 'Discarded'
                    });
                });

            },
            deleteArticleSuccess(res) {
                console.log(res)
                this.$notify({
                    type: 'success',
                    message: 'Successfully deleted'
                });
                // refresh the articles list
                this.listArticlesOfUser()
            },
            clickNewArticle() {
                this.$router.push('/articles/edit')
            },
            onPageChange(page) {
                this.page = page
                this.listArticlesOfSection(this.activeSectionId)
            },
            sendMail() {
                let sourceUserId = this.$store.state.userId
                let targetUserId = this.userId
                let url = configJson.endpoint + '/api/v1/usermails'
                axios({
                    method: 'post',
                    url: url,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        'from_user_id': sourceUserId,
                        'to_user_id': targetUserId,
                        'content': this.mail,
                    }
                }).then(this.sendMailSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            sendMailSuccess() {
                this.$notify({
                    title: 'Success',
                    type: 'success',
                    message: 'Successfully sent the mail!'
                });
            },
            closeDialog() {
                this.showDialog = false
                this.mail = ""
            },
            getIsFollowed() {
                let url = configJson.endpoint + '/api/v1/follows/isFollowed?user_id='+this.userId+'&follower_id='+this.$store.state.userId.toString()
                axios.get(url)
                    .then(this.getIsFollowedSuccess)
                    .catch(function (err) {
                        console.log(err)
                })
            },
            getIsFollowedSuccess(res){
                console.log('Successfully get followed status')
                this.followed = res.data.res
            },
            followUser(){
                let url = configJson.endpoint + '/api/v1/follows'
                axios({
                    method: 'post',
                    url: url,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        user_id: this.userId,
                        follower_id: this.$store.state.userId.toString()
                    }
                }).then(this.followSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            followSuccess(){
                this.followed = true
                this.$notify({
                    title: 'Follow Success',
                    type: 'success',
                    message: 'Successfully follow the user!'
                });
            },
            unfollowUser(){
                let url = configJson.endpoint + '/api/v1/follows/1'
                axios({
                    method: 'delete',
                    url: url,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        user_id: this.userId,
                        follower_id: this.$store.state.userId.toString()
                    }
                }).then(this.unfollowSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            unfollowSuccess(){
                this.followed = false
                this.$notify({
                    title: 'Unfollow Success',
                    type: 'success',
                    message: 'Successfully unfollow the user'
                });
            },
            errorHandler(err) {
                console.log(err)
                if (err.response.status === 401) {
                    this.$notify({
                        title: 'Failure',
                        message: 'Please login first',
                        type: 'error'
                    })
                }
            },
        },
        computed: {
            isCurrentUser () {
                return this.userId === this.$store.state.userId.toString()
            },
        },
        mounted: function () {
            this.userId = this.$route.params.id
            this.getUserProfile(this.userId)
            this.getIsFollowed()
        }
    }
</script>
<style scoped>
    .box-card {
        width: 80%;
        margin: auto;
    }

    .el-desc {
        margin-top: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>
