import { set, toggle } from '@/utils/vuex'

export default {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer'),
  setToastr: set('toastr'),
  setProgressBar: set('progressBar'),
  toggleProgressBar: toggle('progressBar')
}
