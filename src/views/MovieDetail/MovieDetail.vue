<template>
  <div class="movieDetail">
    <NormalTop title="电影详情"></NormalTop>

    <div class="subtitle">电影简介</div>

    <div class="card">
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;" raised>
        <mu-card-header :title="movie.launcher">
          <mu-avatar slot="avatar">
            <img src="../../assets/images/logo.png">
          </mu-avatar>
        </mu-card-header>
        <mu-card-media :title="movie.movieName" :sub-title="movie.movieInfo">
          <img src="../../assets/images/logo.png">
        </mu-card-media>
        <mu-card-title title="评分9.2"></mu-card-title>
        <mu-card-text>
          {{movie.movieDetail}}
        </mu-card-text>
        <mu-card-actions class="action">
          <mu-button flat class="button" @click="comment">发布评论</mu-button>
        </mu-card-actions>
      </mu-card>
    </div>

    <mu-list textline="three-line">
      
      <div class="subtitle">影迷评论</div>

      <MovieComment v-for="(list, index) in movieComment" :key="index" :list="list"></MovieComment>

    </mu-list>

  </div>
</template>

<script lang="ts">

import NormalTop from '../../components/NormalTop/NormalTop.vue';
import { Component, Vue } from 'vue-property-decorator';
import MovieComment from '../../components/MovieComment/MovieComment.vue';

@Component({
  components: {
    NormalTop,
    MovieComment
  }
})
export default class MovieDetail extends Vue {

  private messageContent: any = {

  }

  private movieComment: any = []

  private movieId: string = ''

  private movieLists: any = []

  private movie: any = {}


  async getComment(Id: number) {
    let movieID = {
      ID: Id
    }
    await this.$store.dispatch('movieComment/getMovieComment', movieID)
    this.movieComment = this.$store.state.movieComment.movieComment

    this.movieComment.forEach( (val: any) => {
      val.date = this.changeTime(val.date)
    })

    await this.$store.dispatch('movieInfo/getMovieList')
    this.movieLists = this.$store.state.movieInfo.movieList
    this.findMovie(Id);
  }

  findMovie(Id: number) {
    this.movieLists.forEach( (value: any) => {
      if(Id === value.movieID) {
        this.movie = value
      }
    })
  }

  mounted() {
    this.getComment(Number(this.$route.query.MovieId)) 
  }

  comment() {
    let CommentId = this.$route.query.MovieId
    this.$router.push(`/Comment?CommentId=${CommentId}`)
  }

  changeTime(data: any) {
    let date = new Date(data)

    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

    return Y + M + D + h + m + s
  }
}

</script>

<style lang="scss">

  .movieDetail {

    .subtitle {
      margin: 80px 0;
      font-size: 80px;
      &::before {
        content: '';
        border-left: 20px #673ab7 solid;
        padding-left: 30px;
      }
    }

    .card {
      width: 100%; 
      margin: 0 auto;

      .action {
        .button {
          margin-left: 1200px;
        }
      }
    }
  }
</style>