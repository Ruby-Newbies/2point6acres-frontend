<template>
    <el-card style="margin: auto; width: 80%;">
        <div slot="header">
            <el-row>
                <el-col :span="16">
                    <span>{{ article.title }}</span>
                </el-col>
                <el-col :span="8">
                    {{ `${article.created_at.getMonth()}/${article.created_at.getDate()}/${article.created_at.getFullYear()}` }}
                </el-col>
            </el-row>
        </div>
        <div>
            {{article.content}}
        </div>
    </el-card>
</template>

<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: "ArticleDetail",
        data: function () {
            return {
                article: null
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
