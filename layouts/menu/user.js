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
        route: '/pendataan/hewan/ownership/list'
      },
      {
        title: 'Buat Kepemilikan Hewan',
        route: '/pendataan/hewan/ownership/create'
      }
    ]
  },
  {
    icon: 'brightness_2',
    title: 'Kesehatan Lingkungan',
    items: [
      {
        title: 'Daftar Kesehatan Lingkungan',
        route: '/pendataan/environment/list'
      },
      {
        title: 'Buat Kesehatan Lingkungan',
        route: '/pendataan/environment/create'
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
