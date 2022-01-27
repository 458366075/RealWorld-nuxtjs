import Vue from 'vue'

Vue.directive('loading', function (this:any, el, {
  value,
}) {
  if (value) {
    el.classList.add('disabled')
    el.setAttribute('disabled', '')
  } else {
    el.classList.remove('disabled')
    el.removeAttribute('disabled')
  }
})
