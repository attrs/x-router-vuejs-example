import Vue from 'vue';
import template from './sub.html';

export default function(req, res, next) {
  res.render.html(template, (err, target) => {
    if( err ) return next(err);
    
    const scope = new Vue({
      el: target,
      data: {
        visible: false,
        message: 'prepare',
        total: 0,
        loaded: false
      },
      mounted() {
        this.message = 'mounted';
        this.refresh();
      },
      methods: {
        refresh () {
          this.message = 'loaded';
          this.total = 30;
          this.loaded = true;
        },
        toggleshow() {
          this.visible = !this.visible;
        }
      },
    });
    
    
  }).end();
}