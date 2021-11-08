<template>
    <el-card style="margin: auto; width: 80%;">
        <div slot="header">
            <el-row>
                <el-col :span="18">
                    <h2>{{ article.title }}</h2>
                </el-col>
                <el-col :span="6">
                    {{ `${article.created_at.getMonth()}/${article.created_at.getDate()}/${article.created_at.getFullYear()}` }}
                </el-col>
            </el-row>
        </div>
        <div>
            <v-md-preview :text="article.content" style="text-align: left"></v-md-preview>
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
                article: {
                    title: "",
                    section_id: 0,
                    content: "",
                    created_at: new Date()
                }
            }
        },
        methods: {
            getArticleDetail: function (id) {
                console.log('retrieving article id=' + id)
                axios.get(configJson.endpoint + '/api/v1/articles/' + id)
                    .then(this.getArticleDetailSuccess)
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            getArticleDetailSuccess: function (res) {
                console.log(res.data)
                if (res.data) {
                    this.article = res.data.article
                    this.article.created_at = new Date(res.data.article.created_at)
                }
            }
        },
        mounted() {
            let articleId = this.$route.params.id
            this.getArticleDetail(articleId)
        }
    }
</script>

<style scoped>

</style>
