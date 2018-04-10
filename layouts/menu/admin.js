export default [
  {
    icon: 'home',
    title: 'Beranda',
    active: true,
    route: '/'
  },
  {
    icon: 'people',
    title: 'User',
    items: [
      {
        title: 'Daftar User',
        route: '/admin/user/list'
      },
      {
        title: 'Buat User',
        route: '/admin/user/create'
      }
    ]
  },
  {
    icon: 'account_circle',
    title: 'Role',
    items: [
      {
        title: 'Daftar Role',
        route: '/admin/role/list'
      },
      {
        title: 'Buat Role',
        route: '/admin/role/create'
      }
    ]
  },
  {
    icon: 'find_in_page',
    title: 'Hewan',
    items: [
      {
        title: 'Daftar Hewan',
        route: '/admin/hewan/list'
      },
      {
        title: 'Buat Hewan',
        route: '/admin/hewan/create'
      }
    ]
  },
  {
    icon: 'help',
    title: 'Gender Hewan',
    items: [
      {
        title: 'Daftar Gender Hewan',
        route: '/admin/hewan/gender/list'
      },
      {
        title: 'Buat Gender Hewan',
        route: '/admin/hewan/gender/create'
      }
    ]
  },
  {
    icon: 'group_work',
    title: 'Group Hewan',
    items: [
      {
        title: 'Daftar Group Hewan',
        route: '/admin/hewan/group/list'
      },
      {
        title: 'Buat Group Hewan',
        route: '/admin/hewan/group/create'
      }
    ]
  },
  {
    icon: 'pets',
    title: 'Kepemilikan Hewan',
    items: [
      {
        title: 'Daftar Kepemilikan Hewan',
        route: '/admin/hewan/ownership/list'
      },
      {
        title: 'Buat Kepemilikan Hewan',
        route: '/admin/hewan/ownership/create'
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
      },
      {
        title: 'Buat Kesehatan Lingkungan',
        route: '/admin/hewan/environment/create'
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
