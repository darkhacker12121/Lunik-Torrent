;(function () {
  function _SearchTorrent () {
    this.vue = new App.Vue({
      el: '.searchtorrent-pop',
      data: {
        results: {
          films: [],
          series: []
        }
      }
    })
  }

  _SearchTorrent.prototype.search = function (query) {
    console.log(query)
    var self = this
    $.post('/search-t', {
      query: query
    }, function (data) {
      data = JSON.parse(data)
      console.log(data)
      self.vue.$data.results.films = data.mv.items

      if(data.tv){
        self.vue.$data.results.series = data.tv.items
      } else {
        self.vue.$data.results.series = data.tven.items.concat(data.tven.items)
      }

      setTimeout(function(){self.show()}, 1000)
    })
  }

  _SearchTorrent.prototype.show = function(){
    var self = this
    $.popupjs.init({
      pos: {
        x: null,
        y: '5%'
      },
      width: '90%',
      height: '90%',
      title: 'Search',
      html: $('.popup .searchtorrent-pop'),
      closeBut: true
    })
    $.popupjs.draw()
  }
  App.SearchTorrent = new _SearchTorrent()
})()
