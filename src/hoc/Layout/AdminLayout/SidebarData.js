import React from 'react';
import * as GrIcons from 'react-icons/gr';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Status',
    icon: <GrIcons.GrStatusGoodSmall />,
    path : '/admin/status'
  },
  {
    title: 'To Do Task',
    icon: <FaIcons.FaTasks />,
    path : '/admin/task'
  },
  {
    title: 'Subject',
    icon: <IoIcons.IoIosPaper/>,
    path : '/admin/subject'
  },
  {
    title: 'Type of Assignment',
    icon: <MdIcons.MdAssignment />,
    path : '/admin/typeofassignment'
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