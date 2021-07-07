import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
  {
    title: 'Status',
    icon: <CgIcons.CgUser />,
    path : '/admin/status'
  },
  {
    title: 'To Do Task',
    icon: <CgIcons.CgUser />,
    path : '/admin/task'
  },
  {
    title: 'User Mgmt',
    icon: <CgIcons.CgUser />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'User List',
        path: '/admin/user/list',
        icon: <CgIcons.CgUserList />
      },
      {
        title: 'New User',
        path: '/admin/user/add',
        icon: <CgIcons.CgUserAdd />
      }
    ]
  },
  
];