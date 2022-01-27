import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('format', (value: string, template: string = 'MMM DD,YYYY') => dayjs(value).format(template))
