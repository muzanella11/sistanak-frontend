export default [
  {
    icon: 'home',
    title: 'Beranda',
    active: true,
    route: '/'
  },
  {
    icon: 'pets',
    title: 'Kepemilikan Hewan',
    items: [
      {
        title: 'Daftar Kepemilikan Hewan',
        route: '/admin/hewan/ownership/list'
      }
    ]
  },
  {
    icon: 'brightness_2',
    title: 'Kesehatan Lingkungan',
    items: [
      {
        title: 'Daftar Kesehatan Lingkungan',
        route: '/admin/hewan/environment/list'
      }
    ]
  },
  {
    icon: 'settings',
    title: 'Pengaturan',
    items: [
      {
        title: 'Keluar',
        route: '/auth/signout'
      }
    ]
  }
]
