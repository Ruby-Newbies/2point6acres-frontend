<template>
    <el-card style="margin: auto; width: 80%;">
        <div slot="header">
            <h2>{{ article.title }}</h2>
            <div style="float: left">
                <el-button type="text" @click="this.goToUserProfilePage">
                    {{ article.author_id }}
                </el-button>
            </div>
            <div style="text-align: right">
                <span>Created At: {{ getDateString(new Date(article.created_at)) }}</span>
            </div>
            <div style="text-align: left; margin-top: 20px;">
                <el-button type="success" plain :disabled="likeStatus !== 0" @click="setArticleLike(true)" style="margin-right: 5px;">Like</el-button>
                <span>{{ countLike }} likes</span>
            </div>
            <div style="text-align: left; margin-top: 5px;">
                <el-button type="danger" plain :disabled="likeStatus !== 0" @click="setArticleLike(false)" style="margin-right: 5px;">Dislike</el-button>
                <span>{{ countDislike }} dislikes</span>
            </div>
        </div>
        <div>
            <v-md-preview :text="article.content" style="text-align: left"></v-md-preview>
        </div>
        <el-divider></el-divider>
        <div class="section">
            <h3>Comments</h3>
            <div v-if="comments.length > 0" v-for="comment in comments">
                <el-row style="margin-bottom: 5px">
                    <el-col :span="20">
                        <h4 style="margin: 0;">{{comment.author_id}}</h4>
                    </el-col>
                    <el-col :span="4" style="text-align: right">
                        <span>{{getDateString(new Date(comment.created_at))}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    {{ comment.content }}
                </el-row>
                <el-divider></el-divider>
            </div>
        </div>
        <div v-if="this.$store.state.isLoggedIn">
            <div class="section">
                <h3>Add your comment</h3>
                <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="Leave your comment here"
                        v-model="newComment">

                </el-input>
            </div>
            <div style="text-align: right; margin-top: 10px">
                <el-button type="success" plain @click="submitComment">Submit</el-button>
            </div>
        </div>
        <div v-else>
            <div class="section">
                <h3>To leave your comment, you must login first</h3>
            </div>
        </div>
    </el-card>
</template>

<script>
    import axios from 'axios'
    import configJson from '../../config/config.json'
    export default {
        name: "ArticleDetail",
        data: function () {
            return {
                articleId: "",
                article: {
                    title: "",
                    author_id: 0,
                    section_id: 0,
                    content: "",
                    created_at: new Date()
                },
                comments: [{
                    author_id: 1,
                    article_id: this.articleId,
                    content: "test1",
                    created_at: new Date(),
                    updated_at: new Date()
                },{
                    author_id: 1,
                    article_id: this.articleId,
                    content: "test2",
                    created_at: new Date(),
                    updated_at: new Date()
                }],
                newComment: "",
                countLike: 0,
                countDislike: 0,
                likeStatus: 0
            }
        },
        methods: {
            getArticleDetail: function (id) {
                console.log('retrieving article id=' + id)
                axios.get(configJson.endpoint + '/api/v1/articles/' + id)
                    .then(this.getArticleDetailSuccess)
                    .catch(this.errorHandler)
            },
            getArticleDetailSuccess: function (res) {
                console.log(res.data)
                if (res.data) {
                    this.article = res.data.article
                    this.getCommentsOfArticle()
                }
            },
            getArticleLikeStatus(userId, articleId) {
                axios.get(configJson.endpoint + '/api/v1/likes/liked?user_id=' + userId + '&article_id=' + articleId)
                    .then(this.getArticleLikeStatusSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            getArticleLikeStatusSuccess(res) {
                this.likeStatus = res.data.kind
            },
            getArticleLikeCount(articleId) {
                axios.get(configJson.endpoint + '/api/v1/likes/count?article_id=' + articleId + '&kind=1')
                    .then(this.getArticleLikeCountSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            getArticleDislikeCount(articleId) {
                axios.get(configJson.endpoint + '/api/v1/likes/count?article_id=' + articleId + '&kind=2')
                    .then(this.getArticleDislikeCountSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            getArticleLikeCountSuccess(res) {
                this.countLike = res.data.count
            },
            getArticleDislikeCountSuccess(res) {
                this.countDislike = res.data.count
            },
            getCommentsOfArticle() {
                let url = configJson.endpoint + '/api/v1/comments?article_id=' + this.article.id
                axios.get(url)
                    .then(this.getCommentsOfArticleSuccess)
            },
            getCommentsOfArticleSuccess(res) {
                console.log(res.data)
                this.comments = res.data
            },
            submitComment() {
                let url = configJson.endpoint + '/api/v1/comments'
                axios({
                    method: 'post',
                    url: url,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        content: this.newComment,
                        article_id: this.articleId,
                        author_id: this.$store.state.userId
                    }
                }).then(this.submitCommentSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            submitCommentSuccess(res) {
                console.log(res.data)
                // reload comment list
                this.getCommentsOfArticle()
                // clear comment input
                this.newComment = ""
                // show notification
                this.$notify({
                    title: 'Success',
                    message: 'Successfully submitted comment',
                    type: 'success'
                });
            },
            getDateString(date) {
                if (!date) {
                    return ""
                }
                return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            },
            goToUserProfilePage() {
                this.$router.push('/profile/' + this.article.author_id)
            },
            setArticleLike(like) {
                let kind = like ? 1 : 2
                axios({
                    url: configJson.endpoint + '/api/v1/likes',
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        article_id: this.articleId,
                        user_id: this.$store.state.userId,
                        kind: kind
                    }
                }).then(this.setArticleLikeSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            setArticleLikeSuccess(res) {
                let userId = this.$store.state.userId
                this.getArticleLikeStatus(userId, this.articleId)
                this.getArticleLikeCount(this.articleId)
                this.getArticleDislikeCount(this.articleId)
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
        mounted() {
            this.articleId = this.$route.params.id
            this.getArticleDetail(this.articleId)
            let userId = this.$store.state.userId
            this.getArticleLikeStatus(userId, this.articleId)
            this.getArticleLikeCount(this.articleId)
            this.getArticleDislikeCount(this.articleId)
        }
    }
</script>

<style scoped>
    .section {
        text-align: left;
    }
</style>
