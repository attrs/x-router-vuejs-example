import Vue from 'vue';
import template from './main.html';

export default function(req, res, next) {
  res.render.html(template, function(err, target) {
    if( err ) return next(err);
    
    var scope = new Vue({
      el: target,
      data: {
        visible: false,
        message: 'prepare',
        total: 0,
        loaded: false
      },
      methods: {
        refresh: function () {
          this.message = 'loaded';
          this.total = 30;
          this.loaded = true;
        },
        toggleshow: function() {
          this.visible = !this.visible;
        }
      },
      mounted() {
        this.message = 'mounted';
        this.refresh();
      }
    });
    
  }).end();
};